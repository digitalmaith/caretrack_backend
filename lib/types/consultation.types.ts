export interface CreateConsultationDTO {
  patientId:     string
  doctorId:      string
  diagnosis:     string
  notes?:        string
  heartRate?:    number
  bloodPressure?: string  // "120/80"
  temperature?:  number
}

export interface UpdateConsultationDTO extends Partial<CreateConsultationDTO> {}