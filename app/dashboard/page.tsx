"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import PostGenerator from "@/components/PostGenerator"
import ImageGenerator from "@/components/ImageGenerator"
import AnalyticsChart from "@/components/AnalyticsChart"
import PostCalendar from "@/components/Calendar"

export default function Dashboard() {
  const { data: session } = useSession()
  const [generatedPost, setGeneratedPost] = useState("")

  if (!session) {
    return <div>Please log in to access the dashboard.</div>
  }

  return (
    <div className="container mx-auto mt-8 space-y-8">
      <h1 className="text-3xl font-bold">Welcome to your dashboard, {session.user.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Generate Post</h2>
          <PostGenerator onGenerate={setGeneratedPost} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Generate Image</h2>
          <ImageGenerator postContent={generatedPost} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Post Calendar</h2>
        <PostCalendar />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Analytics</h2>
        <AnalyticsChart />
      </div>
    </div>
  )
}

