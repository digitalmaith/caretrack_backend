export const consultationDocs = {
  "/api/consultations": {
    get: {
      summary: "Lister toutes les consultations",
      tags: ["Consultations"],
      responses: { 200: { description: "Liste des consultations" } },
    },
    post: {
      summary: "Créer une consultation (alertes auto)",
      tags: ["Consultations"],
      requestBody: { required: true, content: { "application/json": {
        schema: { "$ref": "#/components/schemas/CreateConsultation" },
        examples: {
          normale:  { summary: "✅ Valeurs normales (0 alerte)",
            value: { patientId: "ID_PATIENT", doctorId: "ID_DOCTOR",
              diagnosis: "Bilan annuel", heartRate: 72, temperature: 37.1, bloodPressure: "120/80" } },
          critique: { summary: "🚨 Valeurs critiques (3 alertes)",
            value: { patientId: "ID_PATIENT", doctorId: "ID_DOCTOR",
              diagnosis: "Syndrome sévère", notes: "Patient en détresse",
              heartRate: 135, temperature: 40.2, bloodPressure: "185/110" } },
        },
      }}},
      responses: {
        201: { description: "Consultation créée avec alertes générées",
          content: { "application/json": { schema: {
            allOf: [{ "$ref": "#/components/schemas/ApiSuccess" },
              { type: "object", properties: { data: { "$ref": "#/components/schemas/Consultation" } } }]
          }}}},
        400: { description: "Données invalides" },
      },
    },
  },
  "/api/consultations/{id}": {
    get: {
      summary: "Récupérer une consultation",
      tags: ["Consultations"],
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
       responses: { 200: { description: "Consultation trouvée" }, 404: { description: "Introuvable" } },
    },
    put: {
      summary: "Modifier une consultation",
      tags: ["Consultations"],
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
      requestBody: { required: true, content: { "application/json": {
        schema: { "$ref": "#/components/schemas/CreateConsultation" } } } },
      responses: { 200: { description: "Consultation modifiée" } },
    },
    delete: {
      summary: "Supprimer une consultation",
      tags: ["Consultations"],
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
      responses: { 200: { description: "Consultation supprimée" } },
    },
  },
}