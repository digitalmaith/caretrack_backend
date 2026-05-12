import { PatientRepository } from "@/lib/repositories/patient.repository"
import { CreatePatientDTO, UpdatePatientDTO } from "@/lib/types/patient.types"

export class PatientService {
  private repository = new PatientRepository()
  
  async getAllPatients() {
    return this.repository.findAll()
  }

    async getPatientById(id: string) { 
        const patient = await this.repository.findById(id)
        if (!patient) {
            throw new Error("Patient not found")
        }
        return patient
    }
    
  async createPatient(data: CreatePatientDTO) {
    return this.repository.create(data)
  }

  async updatePatient(id: string, data: UpdatePatientDTO) {
    await this.getPatientById(id) // vérifie l'existence
    return this.repository.update(id, data)
  }

    async deletePatient(id: string) {
        await this.getPatientById(id) // vérifie l'existence
        return this.repository.delete(id)
    }
}