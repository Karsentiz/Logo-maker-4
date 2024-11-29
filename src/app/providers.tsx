'use client'

import React, { Suspense } from 'react'
import { AuthProvider } from '@/lib/firebase/auth-context'

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Suspense>
  )
} 