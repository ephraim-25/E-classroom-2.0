"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Phone, Chrome } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login({
        identifier: loginMethod === "email" ? formData.email : formData.phone,
        password: formData.password,
        method: loginMethod,
      })
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: "google" | "facebook") => {
    // Implement social login
    console.log(`Login with ${provider}`)
  }

  return (
    <div className="space-y-6">
      {/* Login Method Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          type="button"
          onClick={() => setLoginMethod("email")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            loginMethod === "email" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Email</span>
        </button>
        <button
          type="button"
          onClick={() => setLoginMethod("phone")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            loginMethod === "phone" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Téléphone</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email or Phone Input */}
        <div className="space-y-2">
          <Label htmlFor={loginMethod}>{loginMethod === "email" ? "Adresse email" : "Numéro de téléphone"}</Label>
          <Input
            id={loginMethod}
            type={loginMethod === "email" ? "email" : "tel"}
            placeholder={loginMethod === "email" ? "votre@email.com" : "+243 123 456 789"}
            value={loginMethod === "email" ? formData.email : formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [loginMethod]: e.target.value,
              }))
            }
            required
            className="border-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              required
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

        {/* Forgot Password */}
        <div className="text-right">
          <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
            Mot de passe oublié ?
          </button>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      {/* Social Login */}
      <div className="space-y-4">
        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-2 text-sm text-gray-500">Ou continuer avec</span>
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
