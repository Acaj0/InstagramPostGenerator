import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const posts = await prisma.post.findMany({
      where: { userId: session.user.id },
      include: { analytics: true },
      orderBy: { createdAt: 'asc' },
    })

    const dates = posts.map(post => post.createdAt.toISOString().split('T')[0])
    const likes = posts.map(post => post.analytics?.likes || 0)
    const comments = posts.map(post => post.analytics?.comments || 0)

    return NextResponse.json({ dates, likes, comments })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

