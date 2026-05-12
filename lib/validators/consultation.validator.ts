import { z } from "zod"

export const createConsultationSchema = z.object({
  patientId:     z.string().min(1),
  doctorId:      z.string().min(1),
  diagnosis:     z.string().min(3),
  notes:         z.string().optional(),
  heartRate:     z.number().int().min(1).max(300).optional(),
  bloodPressure: z.string()
    .regex(/^\d{2,3}\/\d{2,3}$/, "Format: 120/80")
    .optional(),
  temperature:   z.number().min(30).max(45).optional(),
})

export const updateConsultationSchema = createConsultationSchema.partial()

export type CreateConsultationInput = z.infer<typeof createConsultationSchema>
export type UpdateConsultationInput = z.infer<typeof updateConsultationSchema>