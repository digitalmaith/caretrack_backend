import { NextRequest } from "next/server"
import { PatientService } from "@/lib/services/patient.service"
import { updatePatientSchema } from "@/lib/validators/patient.validator"
import { ok, created, badRequest, notFound, serverError } from "@/lib/utils/api-response"

const service = new PatientService()

type Ctx = { params: Promise<{ id: string }> }

/** GET /api/patients/:id */
export async function GET(_: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    const patient = await service.getPatientById(id)
    return ok(patient)
  } catch (e: any) {
    if (e.message === "Patient introuvable") return notFound(e.message)
    return serverError(e)
  }

  }

/** PUT /api/patients/:id */
export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = updatePatientSchema.safeParse(body)

    if (!parsed.success)
      return badRequest(parsed.error.flatten().fieldErrors)

    const patient = await service.updatePatient(id, parsed.data)
    return ok(patient)
  } catch (e: any) {
    if (e.message === "Patient introuvable") return notFound(e.message)
    return serverError(e)
  }
}

/** DELETE /api/patients/:id */
export async function DELETE(_: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params
    await service.deletePatient(id)
    return ok({ message: "Patient supprimé" })
  } catch (e: any) {
    if (e.message === "Patient introuvable") return notFound(e.message)
    return serverError(e)
  }
}