"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type UserRole = "student" | "teacher" | "admin"

export function useRoleRedirect() {
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<UserRole | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkUserAndRedirect() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          setLoading(false)
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single()

        if (profileError || !profile) {
          console.error("Profile fetch error:", profileError)
          setLoading(false)
          return
        }

        const userRole = profile.role as UserRole
        setRole(userRole)

        switch (userRole) {
          case "student":
            router.push("/dashboard/student")
            break
          case "teacher":
            router.push("/dashboard/teacher")
            break
          case "admin":
            router.push("/admin")
            break
          default:
            router.push("/dashboard/student") // Default fallback
        }
      } catch (error) {
        console.error("Role redirect error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkUserAndRedirect()
  }, [router, supabase])

  return { loading, role }
}
