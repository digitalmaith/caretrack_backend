import { prisma } from "../prisma"
import { CreatePatientDTO, UpdatePatientDTO } from "@/lib/types/patient.types"

export class PatientRepository {

  async findAll() {
    return prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { consultations: true, alerts: true } } }
    })
  }

  async findById(id: string) {
    return prisma.patient.findUnique({
      where: { id },
      include: {
        consultations: { include: { doctor: true, attachments: true } },
        alerts: { where: { resolved: false } }
      }
    })
  }

  async create(data: CreatePatientDTO) {
    return prisma.patient.create({
      data: { ...data, dateOfBirth: new Date(data.dateOfBirth) }
    })
}
async update(id: string, data: UpdatePatientDTO) {
    return prisma.patient.update({
      where: { id },
      data: {
        ...data,
        ...(data.dateOfBirth && { dateOfBirth: new Date(data.dateOfBirth) })
      }
    })
  }

  async delete(id: string) {
    return prisma.patient.delete({ where: { id } })
  }
}