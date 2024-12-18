import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
import Navbar from '../components/Navbar'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Instagram Post Generator',
  description: 'Generate engaging Instagram posts with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}

