import Link from 'next/link'
import { ArrowRight, Zap, Calendar, BarChart2 } from 'lucide-react'
import { Button } from './components/ui/button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-800">InstaPost Gen</h1>
          <div className="space-x-4">
            <Link href="/login" className="text-purple-800 hover:text-purple-600">Login</Link>
            <Link href="/register" className="text-purple-800 hover:text-purple-600">Register</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
            Create Engaging Instagram Posts in Seconds
          </h2>
          <p className="text-xl text-purple-700 mb-8">
            Boost your social media presence with AI-powered content generation
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={<Zap className="w-12 h-12 text-yellow-500" />}
            title="AI-Powered Generation"
            description="Create unique and engaging posts with advanced AI technology"
          />
          <FeatureCard 
            icon={<Calendar className="w-12 h-12 text-green-500" />}
            title="Smart Scheduling"
            description="Plan and schedule your posts for optimal engagement times"
          />
          <FeatureCard 
            icon={<BarChart2 className="w-12 h-12 text-blue-500" />}
            title="In-depth Analytics"
            description="Track your post performance and grow your audience"
          />
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">
            Ready to transform your Instagram game?
          </h3>
          <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
            Sign Up Now <ArrowRight className="ml-2" />
          </Button>
        </section>
      </main>

      <footer className="bg-purple-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 InstaPost Gen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
      <p className="text-purple-700">{description}</p>
    </div>
  )
}

