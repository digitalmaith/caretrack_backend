import { NextRequest } from "next/server"
import { ConsultationService } from "@/lib/services/consultation.service"
import { createConsultationSchema } from "@/lib/validators/consultation.validator"
import { ok, created, badRequest, serverError } from "@/lib/utils/api-response"

const service = new ConsultationService()

/**
 * @swagger
 * /api/consultations:
 *   get:
 *     summary: Liste toutes les consultations
 *     tags: [Consultations]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 * allOf:
 *                 - $ref: '#/components/schemas/ApiSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Consultation'
 */
export async function GET() {
  try {
    return ok(await service.getAllConsultations())
  } catch (e) { return serverError(e) }
}

/**
 * @swagger
 * /api/consultations:
 *   post:
 *     summary: Créer une consultation (alertes médicales générées automatiquement)
 *     tags: [Consultations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateConsultation'
 *           examples:
 *             valeurs_normales:
 *               summary: Valeurs normales (aucune alerte)
 *               value:
 *                 patientId: "REMPLACE_PAR_UN_ID"
 *                 doctorId: "REMPLACE_PAR_UN_ID"
 *                 diagnosis: "Bilan de santé annuel"
 *                 heartRate: 72
 * temperature: 37.1
 *                 bloodPressure: "120/80"
 *             valeurs_critiques:
 *               summary: Valeurs critiques (3 alertes générées)
 *               value:
 *                 patientId: "REMPLACE_PAR_UN_ID"
 *                 doctorId: "REMPLACE_PAR_UN_ID"
 *                 diagnosis: "Syndrome grippal sévère"
 *                 notes: "Patient en détresse"
 *                 heartRate: 135
 *                 temperature: 40.2
 *                 bloodPressure: "185/110"
 *     responses:
 *       201:
 *         description: Consultation créée avec alertes
 *         content:
 *           application/json:
 *             schema:
 * allOf:
 *                 - $ref: '#/components/schemas/ApiSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Consultation'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = createConsultationSchema.safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.flatten().fieldErrors)
    return created(await service.createConsultation(parsed.data))
  } catch (e) { return serverError(e) }
}