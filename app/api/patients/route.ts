import { NextRequest } from "next/server"
import { PatientService } from "@/lib/services/patient.service"
import { createPatientSchema } from "@/lib/validators/patient.validator"
import { ok, created, badRequest, serverError } from "@/lib/utils/api-response"

const service = new PatientService()

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Liste tous les patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Liste des patients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Patient' }
 */

/** GET /api/patients — liste tous les patients */
export async function GET() {
  try {
    const patients = await service.getAllPatients()
    return ok(patients)
  } catch (e) {
    return serverError(e)
  }
}

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Créer un nouveau patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePatient'
 *     responses:
 *       201:
 *         description: Patient créé
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'

/** POST /api/patients — crée un patient */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = createPatientSchema.safeParse(body)

    if (!parsed.success)
      return badRequest(parsed.error.flatten().fieldErrors)

    const patient = await service.createPatient(parsed.data)
    return created(patient)
  } catch (e) {
    return serverError(e)
  }
}