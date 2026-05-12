import { prisma } from "@/lib/prisma"
import { CreateConsultationDTO } from "@/lib/types/consultation.types"

export class ConsultationRepository {

  async findAll() {
    return prisma.consultation.findMany({
      orderBy: { date: "desc" },
      include: { patient: true, doctor: true }
    })
  }

  async findById(id: string) {
    return prisma.consultation.findUnique({
      where: { id },
      include: {
        patient:     true,
        doctor:      true,
        attachments: true,
        alerts:      true,
      }
    })
  }

  async findByPatient(patientId: string) {
    return prisma.consultation.findMany({
      where: { patientId },
      orderBy: { date: "desc" },
      include: { doctor: true, alerts: true }
    })
  }

  async create(data: CreateConsultationDTO) {
    return prisma.consultation.create({ data })
  }
 async update(id: string, data: Partial<CreateConsultationDTO>) {
    return prisma.consultation.update({ where: { id }, data })
  }

  async delete(id: string) {
    return prisma.consultation.delete({ where: { id } })
  }
}