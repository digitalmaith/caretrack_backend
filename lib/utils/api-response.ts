import { NextResponse } from "next/server"

export const ok = (data: unknown, status = 200) =>
  NextResponse.json({ success: true, data }, { status })

export const created = (data: unknown) =>
  NextResponse.json({ success: true, data }, { status: 201 })

export const notFound = (message = "Introuvable") =>
  NextResponse.json({ success: false, message }, { status: 404 })

export const badRequest = (message: unknown) =>
  NextResponse.json({ success: false, message }, { status: 400 })

export const serverError = (error: unknown) =>
  NextResponse.json(
    { success: false, message: "Erreur serveur", error: String(error) },
    { status: 500 }
  )

  export const serverErrorBis = (error: unknown) => {
  console.error("SERVER ERROR:", error)

  return NextResponse.json(
    {
      success: false,
      message: "Erreur serveur",
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack:
                process.env.NODE_ENV === "development"
                  ? error.stack
                  : undefined,
            }
          : error,
    },
    { status: 500 }
  )
}