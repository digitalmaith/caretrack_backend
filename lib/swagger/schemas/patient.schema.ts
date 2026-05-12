export const patientSchemas = {
  Patient: {
    type: "object",
    properties: {
      id:          { type: "string" },
      firstName:   { type: "string" },
      lastName:    { type: "string" },
      dateOfBirth: { type: "string", format: "date-time" },
      gender:      { type: "string", enum: ["MALE", "FEMALE", "OTHER"] },
      phone:       { type: "string" },
      email:       { type: "string" },
      photoUrl:    { type: "string" },
      createdAt:   { type: "string", format: "date-time" },
    },
  },
  CreatePatient: {
    type: "object",
    required: ["firstName", "lastName", "dateOfBirth", "gender"],
     properties: {
      firstName:   { type: "string",  example: "Fatou" },
      lastName:    { type: "string",  example: "Diallo" },
      dateOfBirth: { type: "string",  example: "1990-05-15T00:00:00.000Z" },
      gender:      { type: "string",  enum: ["MALE", "FEMALE", "OTHER"] },
      phone:       { type: "string",  example: "+221771234567" },
      email:       { type: "string",  example: "fatou@example.com" },
      photoUrl:    { type: "string",  example: "https://res.cloudinary.com/..." },
    },
  },
}