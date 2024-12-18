import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function PostGenerator() {
  const { data: session } = useSession()
  const [prompt, setPrompt] = useState('')
  const [generatedPost, setGeneratedPost] = useState('')

  const generatePost = async () => {
    const response = await fetch('/api/generate-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })

    const data = await response.json()
    setGeneratedPost(data.post.content)
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full p-2 border rounded"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your post prompt..."
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={generatePost}
      >
        Generate Post
      </button>
      {generatedPost && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-bold">Generated Post:</h3>
          <p>{generatedPost}</p>
        </div>
      )}
    </div>
  )
}

