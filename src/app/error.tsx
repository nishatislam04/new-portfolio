'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Portfolio Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Something went wrong!</h1>
          <p className="text-gray-400 max-w-md mx-auto">
            We apologize for the inconvenience. Please try refreshing the page or contact us if the problem persists.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            Try again
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/'}
          >
            Go to Homepage
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left bg-gray-800 p-4 rounded-lg">
            <summary className="cursor-pointer text-gray-300 mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-red-400 text-sm overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
