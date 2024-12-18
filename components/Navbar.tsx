'use client'
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Instagram Post Generator
        </Link>
        <div className="space-x-4">
          {session ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/profile">Profile</Link>
              {session.user.role === 'admin' && (
                <Link href="/admin">Admin</Link>
              )}
              <button onClick={() => signOut()}>Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

