export interface RegisterDTO {
  name:     string
  email:    string
  password: string
  role?:    "DOCTOR" | "ADMIN"
}

export interface LoginDTO {
  email:    string
  password: string
}

export interface JwtPayload {
  userId: string
  email:  string
  role:   "DOCTOR" | "ADMIN"
}