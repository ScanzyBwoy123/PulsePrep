import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const model = "gemini-3.1-flash-lite";

const systemInstruction =
  "You are Junior Dangote Pro AI, the nursing study tutor for PulsePrep. " +
  "Help nursing students understand pharmacology, anatomy, physiology, " +
  "microbiology, midwifery, first aid, nursing procedures, and related " +
  "healthcare subjects. Give clear, accurate and educational explanations. " +
  "Use simple language when helpful. " +
  "When appropriate, structure answers with headings, bullet points, " +
  "examples, important points, and exam tips. " +
  "For nursing students, explain difficult concepts in a simple but " +
  "academically useful way. " +
  "Do not diagnose patients, prescribe medication, or replace professional medical care.";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("", {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Method not allowed. Use POST.",
      }),
      {
        status: 405,
        headers: corsHeaders,
      },
    );
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "GEMINI_API_KEY is not configured",
        }),
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }

    let body: Record<string, unknown>;

    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({
          error: "Invalid JSON request",
        }),
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    const question = String(
      body.message ?? body.question ?? "",
    ).trim();

    if (!question) {
      return new Response(
        JSON.stringify({
          error: "Question is required",
        }),
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const requestBody = {
      systemInstruction: {
        parts: [
          {
            text: systemInstruction,
          },
        ],
      },

      contents: [
        {
          role: "user",
          parts: [
            {
              text: question,
            },
          ],
        },
      ],
    };

    const maxAttempts = 3;

    let response: Response | null = null;

    let data: Record<string, unknown> = {};

    let lastError = "";

    for (
      let attempt = 1;
      attempt <= maxAttempts;
      attempt++
    ) {
      try {
        response = await fetch(url, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },

          body: JSON.stringify(requestBody),
        });

        const raw = await response.text();

        try {
          data = JSON.parse(raw);
        } catch {
          data = {};
        }

        if (response.ok) {
          break;
        }

        const errorMessage =
          (
            data.error as
              | {
                  message?: string;
                }
              | undefined
          )?.message ||
          `Gemini API returned HTTP ${response.status}`;

        lastError = errorMessage;

        const retryable =
          response.status === 408 ||
          response.status === 429 ||
          response.status === 500 ||
          response.status === 502 ||
          response.status === 503 ||
          response.status === 504;

        if (
          !retryable ||
          attempt === maxAttempts
        ) {
          break;
        }
      } catch (error) {
        lastError =
          error instanceof Error
            ? error.message
            : String(error);

        if (attempt === maxAttempts) {
          break;
        }
      }

      const delay = Math.min(
        1000 * Math.pow(2, attempt - 1),
        4000,
      );

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );
    }

    if (!response || !response.ok) {
      return new Response(
        JSON.stringify({
          error:
            "Junior Dangote Pro AI is temporarily unavailable. Please try again in a moment.",

          details:
            lastError ||
            "Gemini AI service is temporarily unavailable.",
        }),

        {
          status:
            response?.status &&
            response.status >= 400
              ? response.status
              : 503,

          headers: corsHeaders,
        },
      );
    }

    const candidates = data.candidates as
      | Array<{
          content?: {
            parts?: Array<{
              text?: string;
            }>;
          };
        }>
      | undefined;

    const answer =
      candidates?.[0]?.content?.parts
        ?.map(
          (part) => part.text || "",
        )
        .join("")
        .trim();

    if (!answer) {
      return new Response(
        JSON.stringify({
          error:
            "Junior Dangote Pro AI received an empty response. Please try again.",
        }),
        {
          status: 502,
          headers: corsHeaders,
        },
      );
    }

    return new Response(
      JSON.stringify({
        answer,
      }),
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          "Junior Dangote Pro AI encountered a temporary problem. Please try again.",

        details:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      }),
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
});
