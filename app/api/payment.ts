import { NextResponse } from "next/server"
import Stripe from "stripe"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]/route"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { plan } = await req.json()

  try {
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan === "basic" ? process.env.STRIPE_BASIC_PRICE_ID : process.env.STRIPE_PREMIUM_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/plans`,
    })

    // Update user's plan in the database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { plan: plan },
    })

    return NextResponse.json({ sessionId: stripeSession.id })
  } catch (error) {
    console.error("Error creating Stripe session:", error)
    return NextResponse.json({ error: "Failed to create payment session" }, { status: 500 })
  }
}

