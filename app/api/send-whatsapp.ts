import { NextResponse } from "next/server"
import twilio from "twilio"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { message, phoneNumber } = await req.json()

  try {
    await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${phoneNumber}`
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
    return NextResponse.json({ error: "Failed to send WhatsApp message" }, { status: 500 })
  }
}

