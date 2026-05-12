export const uploadDocs = {
  "/api/upload/patient": {
    post: {
      summary:  "Upload photo d'un patient",
      tags:     ["Upload"],
      requestBody: { required: true, content: { "multipart/form-data": {
        schema: { type: "object", required: ["file", "patientId"],
          properties: {
            file:      { type: "string", format: "binary", description: "Image (max 5 Mo)" },
            patientId: { type: "string", example: "REMPLACE_PAR_ID" },
          },
        },
      }}},
      responses: {
        200: { description: "Photo uploadée et patient mis à jour",
          content: { "application/json": { schema: { type: "object",
            properties: {
              success:  { type: "boolean", example: true },
              data: { type: "object", properties: {
                photoUrl: { type: "string", example: "https://res.cloudinary.com/..." },
              }},
            },
          }}}},
        400: { description: "Fichier manquant ou trop lourd" },
      },
    },
  },
}