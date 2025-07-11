import Link from 'next/link'
import { Button } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center space-y-6 p-8">
        {/* 404 Animation */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text">
            404
          </h1>
          <div className="absolute inset-0 text-9xl font-bold text-emerald-500/10">
            404
          </div>
        </div>
        
        {/* Error message */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              Go to Homepage
            </Button>
          </Link>
          
          <Link href="/#projects">
            <Button variant="secondary">
              View Projects
            </Button>
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="mt-12 opacity-20">
          <div className="flex justify-center space-x-4">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
