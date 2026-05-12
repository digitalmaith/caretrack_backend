import bcrypt  from "bcryptjs"
import jwt     from "jsonwebtoken"
import { prisma } from "@/lib/prisma"
import { RegisterDTO, LoginDTO, JwtPayload } from "@/lib/types/auth.types"

const SECRET     = process.env.JWT_SECRET!
const EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d"

export class AuthService {

  async register(data: RegisterDTO) {
    // Vérifie si l'email existe déjà
    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) throw new Error("Email déjà utilisé")

    // Hash du mot de passe (coût 12)
    const hashedPassword = await bcrypt.hash(data.password, 12)
    // Création en base
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: { id: true, email: true, name: true, role: true },
      // ↑ on n'expose JAMAIS le password dans la réponse
    })

    const token = this.generateToken(user)
    return { user, token }
  }

  async login(data: LoginDTO) {
    // Cherche l'utilisateur
    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (!user) throw new Error("Identifiants invalides")
// Vérifie le mot de passe
    const valid = await bcrypt.compare(data.password, user.password)
    if (!valid) throw new Error("Identifiants invalides")

    const token = this.generateToken(user)
    const { password: _, ...userWithoutPassword } = user
    return { user: userWithoutPassword, token }
  }

  private generateToken(user: { id: string; email: string; role: any }) {
    const payload: JwtPayload = { userId: user.id, email: user.email, role: user.role }
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN } as any)
  }

  /** Vérifie et décode un token — utilisé dans le middleware */
  static verifyToken(token: string): JwtPayload {
    return jwt.verify(token, SECRET) as JwtPayload
  }
}