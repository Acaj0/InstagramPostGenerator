import { NextResponse } from "next/server"
import { generateImage } from "@/lib/canva"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { text } = await req.json()

  try {
    const imageUrl = await generateImage('template_id_here', text)
    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}

