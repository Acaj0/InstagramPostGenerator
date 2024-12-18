import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const subscriptions = await prisma.subscription.findMany({
      select: {
        id: true,
        userId: true,
        plan: true,
        status: true,
      },
    })

    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error("Error fetching subscriptions:", error)
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
  }
}

