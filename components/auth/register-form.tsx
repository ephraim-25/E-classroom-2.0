"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Chrome, Mail, Phone } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { OTPVerification } from "./otp-verification"

export function RegisterForm() {
  const [step, setStep] = useState<"form" | "otp" | "complete">("form")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState<"email" | "sms">("email")
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
  const [verificationToken, setVerificationToken] = useState("")

  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }

    if (!formData.acceptTerms) {
      alert("Veuillez accepter les conditions d'utilisation")
      return
    }

    setIsLoading(true)

    try {
      const identifier = verificationMethod === "email" ? formData.email : formData.phone

      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          type: "register",
          method: verificationMethod,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStep("otp")
      } else {
        alert(data.error || "Erreur lors de l'envoi du code de vérification")
      }
    } catch (error) {
      console.error("Registration error:", error)
      alert("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPVerified = async (token: string) => {
    setVerificationToken(token)

    try {
      const response = await fetch("/api/auth/register-with-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          verificationToken: token,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Store auth token and redirect
        localStorage.setItem("auth_token", data.token)
        setStep("complete")

        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = `/dashboard/${data.user.userType}`
        }, 2000)
      } else {
        alert(data.error || "Erreur lors de la création du compte")
        setStep("form")
      }
    } catch (error) {
      console.error("Registration completion error:", error)
      alert("Erreur lors de la finalisation de l'inscription")
      setStep("form")
    }
  }

  const handleSocialLogin = (provider: "google" | "facebook") => {
    console.log(`Register with ${provider}`)
  }

  if (step === "otp") {
    const identifier = verificationMethod === "email" ? formData.email : formData.phone
    return (
      <OTPVerification
        identifier={identifier}
        method={verificationMethod}
        type="register"
        onVerified={handleOTPVerified}
        onBack={() => setStep("form")}
      />
    )
  }

  if (step === "complete") {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-green-600">Compte créé avec succès !</h3>
        <p className="text-gray-600">Redirection vers votre tableau de bord...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => setVerificationMethod("email")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            verificationMethod === "email" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Vérifier par Email</span>
        </button>
        <button
          type="button"
          onClick={() => setVerificationMethod("sms")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            verificationMethod === "sms" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Vérifier par SMS</span>
        </button>
      </div>

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
              placeholder="Minimum 8 caractères"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              required
              minLength={8}
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
            J'accepte les{" "}
            <button type="button" className="text-blue-600 hover:text-blue-700">
              conditions d'utilisation
            </button>{" "}
            et la{" "}
            <button type="button" className="text-blue-600 hover:text-blue-700">
              politique de confidentialité
            </button>
          </Label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? "Envoi du code..." : `Continuer avec ${verificationMethod === "email" ? "Email" : "SMS"}`}
        </Button>
      </form>

      {/* Social Login */}
      <div className="space-y-4">
        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-2 text-sm text-gray-500">Ou s'inscrire avec</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("google")}
            className="border-blue-200 hover:bg-blue-50"
          >
            <Chrome className="w-4 h-4 mr-2" />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("facebook")}
            className="border-blue-200 hover:bg-blue-50"
          >
            <div className="w-4 h-4 mr-2 bg-blue-600 rounded-sm"></div>
            Facebook
          </Button>
        </div>
      </div>
    </div>
  )
}
