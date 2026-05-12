import { NextRequest } from "next/server"
import { AuthService }    from "@/lib/services/auth.service"
import { registerSchema } from "@/lib/validators/auth.validator"
import { created, badRequest, serverError } from "@/lib/utils/api-response"

const service = new AuthService()

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) return badRequest(parsed.error.flatten().fieldErrors)

    const result = await service.register(parsed.data)
    return created(result)
  } catch (e: any) {
    if (e.message === "Email déjà utilisé") return badRequest(e.message)
    return serverError(e)
  }
}