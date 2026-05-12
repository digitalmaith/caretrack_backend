import { NextRequest } from "next/server"
import { AuthService } from "@/lib/services/auth.service"
import { loginSchema } from "@/lib/validators/auth.validator"
import { ok, badRequest, serverError } from "@/lib/utils/api-response"

const service = new AuthService()

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.flatten().fieldErrors)

    const result = await service.login(parsed.data)
    return ok(result)
  } catch (e: any) {
    if (e.message === "Identifiants invalides") return badRequest(e.message)
    return serverError(e)
  }
}