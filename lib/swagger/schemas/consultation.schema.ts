export const consultationSchemas = {
  Alert: {
    type: "object",
    properties: {
      id:       { type: "string" },
      type:     { type: "string", enum: ["HIGH_HEART_RATE", "LOW_HEART_RATE", "HIGH_TEMPERATURE", "HIGH_BLOOD_PRESSURE"] },
      message:  { type: "string", example: "Tachycardie : 115 bpm" },
      severity: { type: "string", enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
      resolved: { type: "boolean", example: false },
    },
  },
  Consultation: {
    type: "object",
    properties: {
      id:            { type: "string" },
      date:          { type: "string", format: "date-time" },
      diagnosis:     { type: "string" },
      notes:         { type: "string" },
      heartRate:     { type: "integer" },
      temperature:   { type: "number" },
      bloodPressure: { type: "string" },
      alerts:        { type: "array", items: { "$ref": "#/components/schemas/Alert" } },
    },
  },
  CreateConsultation: {
    type: "object",
    required: ["patientId", "doctorId", "diagnosis"],
    properties: {
      patientId:     { type: "string",  example: "REMPLACE_PAR_ID" },
      doctorId:      { type: "string",  example: "REMPLACE_PAR_ID" },
      diagnosis:     { type: "string",  example: "Syndrome grippal" },
      notes:         { type: "string",  example: "Patient fatigué depuis 3 jours" },
      heartRate:     { type: "integer", example: 115, description: "bpm — alerte si >100 ou <60" },
      temperature:   { type: "number",  example: 39.2, description: "°C — alerte si ≥38.5" },
      bloodPressure: { type: "string",  example: "145/90", description: "Format: sys/dia" },
    },
  },
  }