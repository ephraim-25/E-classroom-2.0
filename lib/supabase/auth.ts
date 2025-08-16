import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  userType: "student" | "instructor" | "admin"
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export async function signUpWithEmail(userData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  userType: string
}) {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        user_type: userData.userType,
      },
    },
  })

  if (error) throw error

  // Insert user profile in custom table
  if (data.user) {
    const { error: profileError } = await supabase.from("user_profiles").insert({
      id: data.user.id,
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      user_type: userData.userType,
      is_verified: false,
    })

    if (profileError) throw profileError
  }

  return data
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signInWithPhone(phone: string, password: string) {
  const { data: userProfile, error } = await supabase.from("user_profiles").select("*").eq("phone", phone).single()

  if (error || !userProfile) {
    throw new Error("Utilisateur non trouvé")
  }

  // Sign in with email (Supabase requirement)
  return signInWithEmail(userProfile.email, password)
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  if (!profile) return null

  return {
    id: profile.id,
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: profile.email,
    phone: profile.phone,
    userType: profile.user_type,
    isVerified: profile.is_verified,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
  }
}
