import { NextRequest } from "next/server"
import { CloudinaryService } from "@/lib/services/cloudinary.service"
import { PatientService }    from "@/lib/services/patient.service"
import { ok, badRequest, serverErrorBis } from "@/lib/utils/api-response"

const cloudinarySvc = new CloudinaryService()
const patientSvc    = new PatientService()

export async function POST(req: NextRequest) {
  try {
    const formData  = await req.formData()
    const file      = formData.get("file") as File | null
    const patientId = formData.get("patientId") as string | null

    if (!file || !patientId)
      return badRequest("Champs requis : file, patientId")

    if (!file.type.startsWith("image/"))
        return badRequest("Seules les images sont acceptées")

    if (file.size > 5 * 1024 * 1024)
      return badRequest("Fichier trop lourd (max 5 Mo)")

    // Convertir le File en Buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Récupérer l'ancien publicId pour supprimer l'ancienne photo
    const patient = await patientSvc.getPatientById(patientId)
    if (patient.photoPublicId) {
      await cloudinarySvc.delete(patient.photoPublicId)
    }

    // Upload la nouvelle photo
    const { url, publicId } = await cloudinarySvc.upload(buffer, {
      folder: "caretrack/patients",
    })
// Sauvegarder url + publicId en base
    const updated = await patientSvc.updatePatient(patientId, {
      photoUrl:      url,
      photoPublicId: publicId,
    })

    return ok({ photoUrl: url, patient: updated })

  } catch (e) { return serverErrorBis(e) }
}