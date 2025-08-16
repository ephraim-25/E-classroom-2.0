"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  supabase,
  type AuthUser,
  signUpWithEmail,
  signInWithEmail,
  signInWithPhone,
  getCurrentUser,
} from "@/lib/supabase/auth"

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<AuthUser>) => Promise<void>
}

interface LoginCredentials {
  identifier: string
  password: string
  method: "email" | "phone"
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  userType: "student" | "instructor" | "admin"
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userData = await getCurrentUser()
        setUser(userData)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)

      let authData
      if (credentials.method === "email") {
        authData = await signInWithEmail(credentials.identifier, credentials.password)
      } else {
        authData = await signInWithPhone(credentials.identifier, credentials.password)
      }

      if (authData.user) {
        const userData = await getCurrentUser()
        setUser(userData)

        if (userData) {
          const redirectPath = getRedirectPath(userData.userType)
          router.push(redirectPath)
        }
      }
    } catch (error: any) {
      throw new Error(error.message || "Échec de la connexion. Vérifiez vos identifiants.")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true)

      const authData = await signUpWithEmail(userData)

      if (authData.user) {
        // User needs to verify email before full access
        router.push("/auth/verify-email")
      }
    } catch (error: any) {
      throw new Error(error.message || "Échec de l'inscription. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateProfile = async (data: Partial<AuthUser>) => {
    try {
      if (!user) throw new Error("Utilisateur non connecté")

      const { error } = await supabase
        .from("user_profiles")
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      const updatedUser = await getCurrentUser()
      setUser(updatedUser)
    } catch (error: any) {
      throw new Error(error.message || "Échec de la mise à jour du profil.")
    }
  }

  const getRedirectPath = (userType: string) => {
    switch (userType) {
      case "student":
        return "/dashboard/student"
      case "instructor":
        return "/dashboard/instructor"
      case "admin":
        return "/dashboard/admin"
      default:
        return "/dashboard"
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
