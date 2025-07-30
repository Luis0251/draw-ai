import { generateAIImage } from "@/app/actions/ai/image"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    const base64 = await generateAIImage(prompt)
    return NextResponse.json({ base64 })
  } catch (error) {
    console.error("Error en API Route:", error)
    return NextResponse.json(
      { error: "No se pudo generar la imagen." },
      { status: 500 }
    )
  }
}