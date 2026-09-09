const { createClient } = require("@supabase/supabase-js");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Method not allowed"
      })
    };
  }

  try {
    const {
      school,
      programme,
      level,
      subject,
      question_type,
      academic_year,
      semester,
      exam_type,
      file_name,
      file_type,
      file_data,
      additional_information
    } = JSON.parse(event.body || "{}");

    if (
      !school ||
      !programme ||
      !level ||
      !subject ||
      !question_type ||
      !academic_year ||
      !semester ||
      !exam_type ||
      !file_name ||
      !file_data
    ) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Please complete all required fields and upload a file."
        })
      };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase environment variables are missing.");

      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Server configuration is incomplete."
        })
      };
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    // Convert Base64 file data into a Buffer
    const base64Data = file_data.includes(",")
      ? file_data.split(",")[1]
      : file_data;

    const fileBuffer = Buffer.from(base64Data, "base64");

    // Create a unique file path
    const safeFileName = file_name
      .replace(/[^a-zA-Z0-9._-]/g, "_");

    const timestamp = Date.now();

    const filePath =
      `${timestamp}-${safeFileName}`;

    // Upload to private Supabase Storage bucket
    const { error: uploadError } =
      await supabase.storage
        .from("past-questions")
        .upload(filePath, fileBuffer, {
          contentType: file_type || "application/octet-stream",
          upsert: false
        });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);

      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Could not upload the file."
        })
      };
    }

    // Save submission information
    const { data, error: databaseError } =
      await supabase
        .from("past_question_submissions")
        .insert([
          {
            school,
            programme,
            level,
            subject,
            question_type,
            academic_year,
            semester,
            exam_type,
            file_name: safeFileName,
            file_path: filePath,
            additional_information:
              additional_information || null,
            submitted_by: null,
            status: "pending"
          }
        ])
        .select()
        .single();

    if (databaseError) {
      console.error(
        "Database insert error:",
        databaseError
      );

      // Remove uploaded file if database insert fails
      await supabase.storage
        .from("past-questions")
        .remove([filePath]);

      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "Could not save the submission."
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: true,
        message: "Past questions submitted successfully.",
        submission: {
          id: data.id,
          status: data.status
        }
      })
    };

  } catch (error) {
    console.error(
      "Submission error:",
      error
    );

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Something went wrong while submitting the questions."
      })
    };
  }
};
