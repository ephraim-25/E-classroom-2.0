"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  userType: "student" | "instructor" | "admin"
  avatar?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface LoginCredentials {
  identifier: string // email or phone
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
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      if (token) {
        // Validate token and get user data
        const userData = await validateToken(token)
        setUser(userData)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("auth_token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      // Mock API call - replace with actual API
      const response = await mockLogin(credentials)

      localStorage.setItem("auth_token", response.token)
      setUser(response.user)

      // Redirect based on user type
      const redirectPath = getRedirectPath(response.user.userType)
      router.push(redirectPath)
    } catch (error) {
      throw new Error("Échec de la connexion. Vérifiez vos identifiants.")
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      // Mock API call - replace with actual API
      const response = await mockRegister(userData)

      localStorage.setItem("auth_token", response.token)
      setUser(response.user)

      // Redirect to onboarding or dashboard
      const redirectPath = getRedirectPath(response.user.userType)
      router.push(redirectPath)
    } catch (error) {
      throw new Error("Échec de l'inscription. Veuillez réessayer.")
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
    router.push("/")
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      // Mock API call - replace with actual API
      const updatedUser = await mockUpdateProfile(user!.id, data)
      setUser(updatedUser)
    } catch (error) {
      throw new Error("Échec de la mise à jour du profil.")
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

// Mock API functions - replace with actual API calls
async function mockLogin(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock successful login
  return {
    token: "mock_jwt_token_" + Date.now(),
    user: {
      id: "1",
      firstName: "Jean",
      lastName: "Dupont",
      email: credentials.identifier.includes("@") ? credentials.identifier : "jean.dupont@email.com",
      phone: credentials.identifier.includes("@") ? "+243123456789" : credentials.identifier,
      userType: "student",
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }
}

async function mockRegister(userData: RegisterData): Promise<{ token: string; user: User }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock successful registration
  return {
    token: "mock_jwt_token_" + Date.now(),
    user: {
      id: Date.now().toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      userType: userData.userType,
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }
}

async function validateToken(token: string): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock token validation
  return {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+243123456789",
    userType: "student",
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

async function mockUpdateProfile(userId: string, data: Partial<User>): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock profile update
  return {
    id: userId,
    firstName: data.firstName || "Jean",
    lastName: data.lastName || "Dupont",
    email: data.email || "jean.dupont@email.com",
    phone: data.phone || "+243123456789",
    userType: data.userType || "student",
    avatar: data.avatar,
    isVerified: data.isVerified || true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: new Date().toISOString(),
  }
}
