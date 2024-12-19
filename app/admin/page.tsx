'use client'
import { useSession } from 'next-auth/react'
import AdminPanel from '@/components/AdminPanel'

export default function AdminPage() {
  const { data: session } = useSession()

  if (!session || session.user.role !== 'admin') {
    return <div>Access denied. You must be an admin to view this page.</div>
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <AdminPanel />
    </div>
  )
}

