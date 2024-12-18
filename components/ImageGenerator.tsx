import { useState } from 'react'
import Image from 'next/image'

export default function ImageGenerator({ postContent }: { postContent: string }) {
  const [imageUrl, setImageUrl] = useState('')

  const generateImage = async () => {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: postContent }),
    })

    const data = await response.json()
    setImageUrl(data.imageUrl)
  }

  return (
    <div className="space-y-4">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={generateImage}
      >
        Generate Image
      </button>
      {imageUrl && (
        <div className="mt-4">
          <Image src={imageUrl} alt="Generated post image" width={500} height={500} />
        </div>
      )}
    </div>
  )
}

