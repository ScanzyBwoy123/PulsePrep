// ============================================================
// PULSEPREP — DRUG BANK
// ============================================================

(function () {

  const supabase =
    window.pulseprepSupabase;


  // ----------------------------------------------------------
  // LOAD DRUGS
  // ----------------------------------------------------------

  async function loadDrugBank(searchTerm = "") {

    const grid =
      document.getElementById("drugBankGrid");

    const loading =
      document.getElementById("drugBankLoading");

    const empty =
      document.getElementById("drugBankEmpty");

    if (!grid) return;


    if (loading) {
      loading.classList.remove("hidden");
    }

    if (empty) {
      empty.classList.add("hidden");
    }


    try {

      if (!window.pulseprepSupabase) {
        throw new Error(
          "Supabase is not ready yet."
        );
      }


      let query =
        window.pulseprepSupabase
          .from("drug_bank")
          .select("*")
          .eq("is_published", true)
          .order("generic_name", {
            ascending: true
          });


      if (searchTerm.trim()) {

        const search =
          searchTerm
            .trim()
            .replace(/[%_]/g, "");

        query =
          query.or(
            `generic_name.ilike.%${search}%,` +
            `drug_class.ilike.%${search}%,` +
            `therapeutic_class.ilike.%${search}%,` +
            `body_system.ilike.%${search}%`
          );
      }


      const {
        data,
        error
      } = await query;


      if (error) {
        throw error;
      }


      grid.innerHTML = "";


      if (!data || data.length === 0) {

        if (empty) {
          empty.classList.remove("hidden");
        }

        return;
      }


      data.forEach(drug => {

        grid.appendChild(
          createDrugCard(drug)
        );

      });


    } catch (error) {

      console.error(
        "PulsePrep Drug Bank error:",
        error
      );


      grid.innerHTML = `
        <div class="col-span-full
                    bg-red-50
                    border border-red-200
                    text-red-700
                    rounded-2xl
                    p-5">

          <strong>
            Drug Bank Error
          </strong>

          <p class="text-sm mt-1">
            ${escapeHTML(
              error.message ||
              "Unable to load the Drug Bank."
            )}
          </p>

        </div>
      `;

    } finally {

      if (loading) {
        loading.classList.add("hidden");
      }

    }

  }


  // ----------------------------------------------------------
  // DRUG CARD
  // ----------------------------------------------------------

  function createDrugCard(drug) {

    const card =
      document.createElement("div");


    card.className =
      "bg-white border border-slate-200 " +
      "rounded-2xl p-5 shadow-sm " +
      "hover:shadow-md transition";


    card.innerHTML = `

      <div class="flex items-start justify-between gap-3">

        <div>

          <div class="text-xs font-extrabold
                      uppercase tracking-wide
                      text-blue-600">

            ${escapeHTML(
              drug.therapeutic_class ||
              "Medication"
            )}

          </div>


          <h3 class="text-xl font-black
                     text-slate-900 mt-1">

            ${escapeHTML(
              drug.generic_name
            )}

          </h3>


          <p class="text-sm text-slate-500 mt-1">

            ${escapeHTML(
              drug.drug_class ||
              "Drug class not listed"
            )}

          </p>

        </div>


        <div class="w-11 h-11 rounded-xl
                    bg-blue-50
                    flex items-center
                    justify-center
                    text-xl">

          💊

        </div>

      </div>


      ${
        drug.body_system
          ? `
            <div class="mt-4
                        inline-flex
                        px-3 py-1
                        rounded-full
                        bg-slate-100
                        text-slate-600
                        text-xs
                        font-semibold">

              ${escapeHTML(
                drug.body_system
              )}

            </div>
          `
          : ""
      }


      <button
        type="button"
        class="mt-5 w-full
               bg-blue-600
               hover:bg-blue-700
               text-white
               rounded-xl
               py-3
               font-extrabold"
        onclick='window.openPulsePrepDrug(${JSON.stringify(
          drug
        )})'
      >

        View Medication

      </button>

    `;


    return card;

  }


  // ----------------------------------------------------------
  // DRUG DETAILS
  // ----------------------------------------------------------

  function openPulsePrepDrug(drug) {

    const modal =
      document.getElementById(
        "drugBankModal"
      );

    const content =
      document.getElementById(
        "drugBankModalContent"
      );


    if (!modal || !content) {
      return;
    }


    content.innerHTML = `

      <div class="flex items-start
                  justify-between gap-4 mb-6">

        <div>

          <div class="text-xs
                      font-extrabold
                      uppercase
                      text-blue-600">

            ${escapeHTML(
              drug.therapeutic_class ||
              "Medication"
            )}

          </div>

          <h2 class="text-3xl
                     font-black
                     text-slate-900 mt-1">

            ${escapeHTML(
              drug.generic_name
            )}

          </h2>

          <p class="text-slate-500 mt-1">

            ${escapeHTML(
              drug.drug_class || ""
            )}

          </p>

        </div>

      </div>


      ${section(
        "💊 Brand Names",
        list(drug.brand_names)
      )}


      ${section(
        "🧬 Mechanism of Action",
        paragraph(
          drug.mechanism_of_action
        )
      )}


      ${section(
        "🎯 Indications / Uses",
        list(drug.indications)
      )}


      ${section(
        "🚫 Contraindications",
        list(drug.contraindications)
      )}


      ${section(
        "⚠️ Precautions",
        list(drug.precautions)
      )}


      ${section(
        "💥 Common Side Effects",
        list(drug.common_side_effects)
      )}


      ${section(
        "🚨 Serious Adverse Effects",
        list(drug.serious_adverse_effects)
      )}


      ${section(
        "💉 Routes of Administration",
        list(drug.routes)
      )}


      ${section(
        "💊 Dosage Information",
        paragraph(
          drug.dosage_information
        )
      )}


      ${section(
        "🔄 Drug Interactions",
        list(drug.drug_interactions)
      )}


      ${section(
        "👩‍⚕️ Nursing Assessment",
        list(drug.nursing_assessment)
      )}


      ${section(
        "🩺 Nursing Interventions",
        list(drug.nursing_interventions)
      )}


      ${section(
        "📊 Monitoring",
        list(drug.monitoring)
      )}


      ${section(
        "🧪 Laboratory Monitoring",
        list(drug.laboratory_monitoring)
      )}


      ${section(
        "👨‍⚕️ Patient Education",
        list(drug.patient_education)
      )}


      ${section(
        "🤰 Pregnancy",
        paragraph(
          drug.pregnancy_information
        )
      )}


      ${section(
        "🍼 Breastfeeding",
        paragraph(
          drug.breastfeeding_information
        )
      )}


      ${section(
        "👶 Pediatric Information",
        paragraph(
          drug.pediatric_information
        )
      )}


      ${section(
        "👴 Geriatric Information",
        paragraph(
          drug.geriatric_information
        )
      )}


      ${section(
        "🧠 Renal Impairment",
        paragraph(
          drug.renal_impairment_information
        )
      )}


      ${section(
        "🫀 Hepatic Impairment",
        paragraph(
          drug.hepatic_impairment_information
        )
      )}


      ${section(
        "⚠️ Important Warnings",
        list(drug.warnings)
      )}


      ${section(
        "☠️ Black Box / Major Warning",
        paragraph(
          drug.black_box_warning
        )
      )}


      ${section(
        "💊 Medication Errors",
        list(drug.medication_errors)
      )}


      ${section(
        "🔄 Look-Alike / Sound-Alike",
        list(drug.look_alike_sound_alike)
      )}


      ${section(
        "🆘 Antidote / Reversal Agent",
        paragraph(
          drug.antidote
        )
      )}


      ${section(
        "📚 Why This Drug Is Important",
        paragraph(
          drug.importance
        )
      )}


      ${section(
        "🎯 Exam Points",
        list(drug.exam_points)
      )}


      ${
        drug.references?.length
          ? section(
              "📖 References",
              list(
                drug.references
              )
            )
          : ""
      }


      <div class="mt-8
                  p-4
                  rounded-xl
                  bg-amber-50
                  border border-amber-200
                  text-amber-800
                  text-sm">

        <strong>
          Educational Notice:
        </strong>

        This Drug Bank is for nursing
        education and examination revision.
        Medication decisions for real patients
        must use current professional prescribing,
        dispensing and clinical guidance.

      </div>

    `;


    modal.classList.remove("hidden");

    document.body.classList.add(
      "overflow-hidden"
    );

  }


  // ----------------------------------------------------------
  // CLOSE MODAL
  // ----------------------------------------------------------

  function closePulsePrepDrug() {

    const modal =
      document.getElementById(
        "drugBankModal"
      );

    if (modal) {
      modal.classList.add("hidden");
    }

    document.body.classList.remove(
      "overflow-hidden"
    );

  }


  // ----------------------------------------------------------
  // HELPERS
  // ----------------------------------------------------------

  function section(title, content) {

    if (!content) {
      return "";
    }

    return `

      <div class="mb-7">

        <h3 class="text-lg
                   font-black
                   text-slate-900
                   mb-2">

          ${title}

        </h3>

        <div class="text-slate-700
                    leading-7">

          ${content}

        </div>

      </div>

    `;

  }


  function list(items) {

    if (!items || !items.length) {
      return "";
    }

    return `

      <ul class="space-y-2">

        ${items.map(item => `
          <li class="flex gap-2">

            <span class="text-blue-600">
              •
            </span>

            <span>
              ${escapeHTML(item)}
            </span>

          </li>
        `).join("")}

      </ul>

    `;

  }


  function paragraph(value) {

    if (!value) {
      return "";
    }

    return `
      <p>
        ${escapeHTML(value)}
      </p>
    `;

  }


  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  // ----------------------------------------------------------
  // SEARCH
  // ----------------------------------------------------------

  function setupDrugSearch() {

    const search =
      document.getElementById(
        "drugBankSearch"
      );

    if (!search) return;


    let timeout;


    search.addEventListener(
      "input",
      () => {

        clearTimeout(timeout);

        timeout =
          setTimeout(() => {

            loadDrugBank(
              search.value
            );

          }, 300);

      }
    );

  }


  // ----------------------------------------------------------
  // EXPOSE
  // ----------------------------------------------------------

  window.loadPulsePrepDrugBank =
    loadDrugBank;

  window.openPulsePrepDrug =
    openPulsePrepDrug;

  window.closePulsePrepDrug =
    closePulsePrepDrug;


  document.addEventListener(
  "DOMContentLoaded",
  () => {

    setupDrugSearch();

    loadDrugBank();

  }
);


})();
