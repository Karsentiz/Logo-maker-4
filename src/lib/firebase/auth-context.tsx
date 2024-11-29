'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  User,
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  Auth
} from 'firebase/auth'
import { auth } from './config'

interface AuthContextType {
  user: User | null
  loading: boolean
  logoGenerationCount: number
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  incrementLogoCount: () => void
  canGenerateLogo: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [logoGenerationCount, setLogoGenerationCount] = useState(0)

  useEffect(() => {
    // Only set up the listener if auth is available
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user)
        setLoading(false)
      })

      return () => unsubscribe()
    } else {
      // If no auth, just set loading to false
      setLoading(false)
    }
  }, [])

  // Load logo generation count from localStorage
  useEffect(() => {
    if (user) {
      // For logged-in users, reset count
      setLogoGenerationCount(0)
    } else {
      // For non-logged-in users, get count from localStorage
      const count = parseInt(localStorage.getItem('logoGenerationCount') || '0')
      setLogoGenerationCount(count)
    }
  }, [user])

  const signInWithGoogle = async () => {
    if (!auth) throw new Error('Auth is not initialized')
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      setLogoGenerationCount(0)
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    if (!auth) throw new Error('Auth is not initialized')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setLogoGenerationCount(0)
    } catch (error) {
      console.error('Error signing in with email:', error)
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    if (!auth) throw new Error('Auth is not initialized')
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setLogoGenerationCount(0)
    } catch (error) {
      console.error('Error signing up with email:', error)
      throw error
    }
  }

  const logout = async () => {
    if (!auth) throw new Error('Auth is not initialized')
    try {
      await signOut(auth)
      localStorage.setItem('logoGenerationCount', '0')
      setLogoGenerationCount(0)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const incrementLogoCount = () => {
    if (!user) {
      const newCount = logoGenerationCount + 1
      setLogoGenerationCount(newCount)
      localStorage.setItem('logoGenerationCount', newCount.toString())
    }
  }

  const canGenerateLogo = user ? true : logoGenerationCount < 1

  const value = {
    user,
    loading,
    logoGenerationCount,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
    incrementLogoCount,
    canGenerateLogo
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 