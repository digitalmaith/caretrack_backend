export const commonSchemas = {
  ApiSuccess: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data:    { },
    },
  },
  ApiError: {
    type: "object",
    properties: {
      success: { type: "boolean", example: false },
      message: { type: "string",  example: "Erreur serveur" },
    },
  },
}