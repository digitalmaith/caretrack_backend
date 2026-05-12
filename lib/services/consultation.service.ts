import { ConsultationRepository } from "@/lib/repositories/consultation.repository"
import { AlertService } from "@/lib/services/alert.service"
import { CreateConsultationDTO, UpdateConsultationDTO } from "@/lib/types/consultation.types"

export class ConsultationService {
  private repo         = new ConsultationRepository()
  private alertService = new AlertService()

  async getAllConsultations() {
    return this.repo.findAll()
  }

  async getConsultationById(id: string) {
    const c = await this.repo.findById(id)
    if (!c) throw new Error("Consultation introuvable")
    return c
  }
  async getByPatient(patientId: string) {
    return this.repo.findByPatient(patientId)
  }

  async createConsultation(data: CreateConsultationDTO) {
    // 1. Créer la consultation
    const consultation = await this.repo.create(data)

    // 2. Analyser les vitaux → générer alertes automatiquement
    await this.alertService.processConsultationAlerts(
      {
        heartRate:     data.heartRate,
        temperature:   data.temperature,
        bloodPressure: data.bloodPressure,
      },
      data.patientId,
      consultation.id
    )
    // 3. Retourner la consultation avec ses alertes
    return this.repo.findById(consultation.id)
  }

  async updateConsultation(id: string, data: UpdateConsultationDTO) {
    await this.getConsultationById(id)
    return this.repo.update(id, data)
  }

  async deleteConsultation(id: string) {
    await this.getConsultationById(id)
    return this.repo.delete(id)
  }
}