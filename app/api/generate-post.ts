import { NextResponse } from "next/server"
import openai from "@/lib/openai"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { prompt } = await req.json()

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a social media expert specializing in creating engaging Instagram posts." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150
    })

    const generatedText = response.data.choices[0].message.content

    // Save the generated post to the database
    const post = await prisma.post.create({
      data: {
        title: "Generated Post",
        content: generatedText,
        userId: session.user.id
      }
    })

    return NextResponse.json({ post })
  } catch (error) {
    console.error("Error generating post:", error)
    return NextResponse.json({ error: "Failed to generate post" }, { status: 500 })
  }
}

