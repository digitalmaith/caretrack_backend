export const patientDocs = {
  "/api/patients": {
    get: {
      summary: "Lister tous les patients",
      tags: ["Patients"],
      responses: {
        200: { description: "Liste des patients",
          content: { "application/json": { schema: {
            allOf: [{ "$ref": "#/components/schemas/ApiSuccess" },
              { type: "object", properties: { data: { type: "array",
                items: { "$ref": "#/components/schemas/Patient" } } } }]
          }}}},
      },
    },
    post: {
      summary: "Créer un patient",
      tags: ["Patients"],
      requestBody: { required: true, content: { "application/json": {
        schema: { "$ref": "#/components/schemas/CreatePatient" },
        }}},
      responses: {
        201: { description: "Patient créé" },
        400: { description: "Données invalides",
          content: { "application/json": { schema: { "$ref": "#/components/schemas/ApiError" } } } },
      },
    },
  },
  "/api/patients/{id}": {
    get: {
      summary: "Récupérer un patient",
      tags: ["Patients"],
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
      responses: {
        200: { description: "Patient trouvé" },
        404: { description: "Patient introuvable" },
      },
    },
    put: {
      summary: "Modifier un patient",
      tags: ["Patients"],
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
      requestBody: { required: true, content: { "application/json": {
        schema: { "$ref": "#/components/schemas/CreatePatient" },
      }}},
      responses: {
        200: { description: "Patient modifié" },
        404: { description: "Patient introuvable" },
      },
    },
    delete: {
      summary: "Supprimer un patient",
      tags: ["Patients"],
      parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
      responses: {
        200: { description: "Patient supprimé" },
        404: { description: "Patient introuvable" },
        },
    },
  },
}