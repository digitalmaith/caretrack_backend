export interface CreatePatientDTO {
  firstName:   string
  lastName:    string
  dateOfBirth: string  // ISO string
  gender:      "MALE" | "FEMALE" | "OTHER"
  phone?:      string
  email?:      string
  photoUrl?:   string
  photoPublicId?: string
}

export interface UpdatePatientDTO extends Partial<CreatePatientDTO> {}