import { z } from "zod"

export const createPatientSchema = z.object({
  firstName:   z.string().min(2, "Prénom trop court"),
  lastName:    z.string().min(2, "Nom trop court"),
  dateOfBirth: z.string().datetime({ message: "Date invalide (ISO 8601)" }),
  gender:      z.enum(["MALE", "FEMALE", "OTHER"]),
  phone:       z.string().optional(),
  email:       z.string().email().optional(),
  photoUrl:    z.string().url().optional(),
  photoPublicId: z.string().optional(),
})

export const updatePatientSchema = createPatientSchema.partial()

export type CreatePatientInput = z.infer<typeof createPatientSchema>
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>