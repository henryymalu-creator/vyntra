'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { User } from '@/types'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userRef = doc(db, 'users', firebaseUser.uid)
        const userDoc = await getDoc(userRef)
        let userData = userDoc.data()

        if (!userDoc.exists()) {
          const fallbackName = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario'
          userData = {
            email: firebaseUser.email,
            displayName: fallbackName,
            createdAt: new Date(),
            updatedAt: new Date(),
          }

          await setDoc(userRef, userData)
        }

        const displayName =
          userData?.displayName ||
          firebaseUser.displayName ||
          firebaseUser.email?.split('@')[0] ||
          'Usuario'

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName,
          photoURL: firebaseUser.photoURL,
          createdAt: userData?.createdAt?.toDate() || new Date(),
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // Update profile with display name
      await updateProfile(firebaseUser, { displayName })

      // Create user document in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        email,
        displayName,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      toast.success('¡Cuenta creada exitosamente!')
    } catch (error: any) {
      console.error('Error signing up:', error)
      toast.error(error.message || 'Error al crear la cuenta')
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('¡Bienvenido de vuelta!')
    } catch (error: any) {
      console.error('Error signing in:', error)
      toast.error('Credenciales incorrectas')
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      toast.success('Sesión cerrada')
    } catch (error: any) {
      console.error('Error logging out:', error)
      toast.error('Error al cerrar sesión')
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Correo de recuperación enviado')
    } catch (error: any) {
      console.error('Error resetting password:', error)
      toast.error('Error al enviar correo de recuperación')
      throw error
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    logout,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
