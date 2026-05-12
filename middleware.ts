import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const PUBLIC_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/swagger",
  "/docs",
]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Laisse passer les routes publiques et non-API
  if (
    !pathname.startsWith("/api") ||
    PUBLIC_ROUTES.some(r => pathname.startsWith(r))
  ) {
    return NextResponse.next()
  }

  // Extrait le token
  const authHeader = req.headers.get("authorization")
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token manquant" },
      { status: 401 }
    )
  }try {
    // jose utilise un Uint8Array pour le secret
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)

    // Injecte les infos user dans les headers
    const headers = new Headers(req.headers)
    headers.set("x-user-id",    payload.userId as string)
    headers.set("x-user-role",  payload.role   as string)
    headers.set("x-user-email", payload.email  as string)

    return NextResponse.next({ request: { headers } })
  } catch {
    return NextResponse.json(
      { success: false, message: "Token invalide ou expiré" },
      { status: 401 }
    )
  }
}
export const config = {
  matcher: ["/api/:path*"],
}