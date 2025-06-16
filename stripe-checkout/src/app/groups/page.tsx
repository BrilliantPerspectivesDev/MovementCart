'use client'

import { useEffect } from 'react'

export default function GroupsRedirect() {
  useEffect(() => {
    // Redirect to the Brilliant Church registration page
    window.location.href = 'https://www.brilliant.church/register1710967836097'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Brilliant Church registration...</p>
      </div>
    </div>
  )
} 