export const authDocs = {
  "/api/auth/register": {
    post: {
      summary: "Créer un compte médecin", tags: ["Auth"],
      requestBody: { required: true, content: { "application/json": {
        schema: { type: "object", required: ["name","email","password"],
          properties: {
            name:     { type: "string",  example: "Dr. Moussa Diop" },
            email:    { type: "string",  example: "moussa@caretrack.sn" },
            password: { type: "string",  example: "motdepasse123" },
            role:     { type: "string",  enum: ["DOCTOR", "ADMIN"] },
          },
        },
      }}},
      responses: { 201: { description: "Compte créé + token JWT" }, 400: { description: "Email déjà utilisé" } },
    },
  },
  "/api/auth/login": {
    post: {
      summary: "Se connecter", tags: ["Auth"],
      requestBody: { required: true, content: { "application/json": {
        schema: { type: "object", required: ["email","password"],
          properties: {
            email:    { type: "string", example: "moussa@caretrack.sn" },
            password: { type: "string", example: "motdepasse123" },
          },
        },
      }}},
      responses: { 200: { description: "Token JWT retourné" }, 400: { description: "Identifiants invalides" } },
    },
  },
}