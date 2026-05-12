import swaggerJsdoc from "swagger-jsdoc"
import { commonSchemas }      from "./schemas/common.schema"
import { patientSchemas }     from "./schemas/patient.schema"
import { consultationSchemas } from "./schemas/consultation.schema"
import { patientDocs }        from "./docs/patient.docs"
import { consultationDocs }   from "./docs/consultation.docs"
import { uploadDocs }      from "./docs/upload.docs"

const spec = {
  openapi: "3.0.0",
  info: {
    title:       "CareTrack API",
    version:     "1.0.0",
    description: "API de gestion de patients et consultations médicales",
  },
  servers: [{ url: "http://localhost:3000" }],
  tags: [
    { name: "Patients",      description: "Gestion des patients" },
    { name: "Consultations", description: "Consultations + alertes auto" },
    { name: "Upload",        description: "Upload de photos de patients" },
  ],
   components: {
    schemas: {
      ...commonSchemas,
      ...patientSchemas,
      ...consultationSchemas,
      ...uploadDocs,
    },
  },
  paths: {
    ...patientDocs,
    ...consultationDocs,
    ...uploadDocs,
  },
}

export const swaggerSpec = spec