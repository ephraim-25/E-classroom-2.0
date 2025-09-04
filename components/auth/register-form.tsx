"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle } from "@/components/icons"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
    acceptTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }

    if (!formData.acceptTerms) {
      setError("Veuillez accepter les conditions d'utilisation")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          userType: formData.userType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Erreur lors de la création du compte")
        return
      }

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem("auth_token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        // Redirect to appropriate dashboard based on user role
        if (data.user.role === "admin") {
          router.push("/dashboard/admin")
        } else if (data.user.role === "instructor") {
          router.push("/dashboard/instructor")
        } else {
          router.push("/dashboard/student")
        }
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      setError("Erreur lors de la création du compte")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              placeholder="Jean"
              value={formData.firstName}
              onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
              required
              className="border-blue-200 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              placeholder="Dupont"
              value={formData.lastName}
              onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
              required
              className="border-blue-200 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Adresse email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
            className="border-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Numéro de téléphone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+243 123 456 789"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            required
            className="border-blue-200 focus:border-blue-500"
          />
        </div>

        {/* User Type */}
        <div className="space-y-2">
          <Label htmlFor="userType">Type de compte</Label>
          <Select
            value={formData.userType}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, userType: value }))}
          >
            <SelectTrigger className="border-blue-200 focus:border-blue-500">
              <SelectValue placeholder="Choisissez votre profil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Étudiant</SelectItem>
              <SelectItem value="instructor">Formateur</SelectItem>
              <SelectItem value="admin">Administrateur</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 6 caractères"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              required
              minLength={6}
              className="border-blue-200 focus:border-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Répétez votre mot de passe"
              value={formData.confirmPassword}
              onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              required
              className="border-blue-200 focus:border-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptTerms: checked as boolean }))}
          />
          <Label htmlFor="terms" className="text-sm text-gray-600">
            J'accepte les conditions d'utilisation et la politique de confidentialité
          </Label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? "Création du compte..." : "Créer mon compte"}
        </Button>
      </form>
    </div>
  )
}
