'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function ProfileForm() {
  const { data: session, update } = useSession()
  const [name, setName] = useState(session?.user?.name || '')
  const [company, setCompany] = useState(session?.user?.company || '')
  const [niche, setNiche] = useState(session?.user?.niche || '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, company, niche }),
    })

    if (response.ok) {
      await update({ name, company, niche })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="company" className="block">Company</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="niche" className="block">Niche</label>
        <input
          type="text"
          id="niche"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Update Profile
      </button>
    </form>
  )
}

