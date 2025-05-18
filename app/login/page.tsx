"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Utensils } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [configError, setConfigError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const isMissingEnvVars =
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "undefined" ||
    typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "undefined"

  const supabase = createClientComponentClient()

  useEffect(() => {
    if (isMissingEnvVars) {
      setConfigError(
        "Faltan variables de entorno de Supabase. Por favor configura NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
      )
    }
  }, [isMissingEnvVars])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")
  setIsLoading(true)

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.session) {
      throw error || new Error("No se pudo iniciar sesión")
    }

    //Forzar recarga completa para que la sesión sea detectada por el AuthContext
    window.location.href = "/data-upload"

  } catch (err: any) {
    setError(err.message || "Ocurrió un error al iniciar sesión.")
  } finally {
    setIsLoading(false)
  }
}

  if (configError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow">
          <div className="flex items-start gap-3 text-red-600 mb-4">
            <AlertCircle className="h-6 w-6 mt-1" />
            <div>
              <h3 className="font-bold">Error de Configuración</h3>
              <p>{configError}</p>
            </div>
          </div>
          <div className="mt-4 text-sm">
            Asegúrate de definir:
            <pre className="mt-2 p-2 bg-gray-100 text-gray-800 rounded">
              NEXT_PUBLIC_SUPABASE_URL=<br />
              NEXT_PUBLIC_SUPABASE_ANON_KEY=
            </pre>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-3 rounded-full">
            <Utensils className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Predicción Gastronómica</h1>
        <p className="text-center text-gray-500 mb-6">Inicie sesión para acceder al sistema</p>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>Ingrese sus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <a href="#" className="text-sm text-orange-600 hover:text-orange-800">
                    ¿Olvidó su contraseña?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">{error}</div>}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Recordarme
                </Label>
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">¿Problemas para acceder? Contacte al administrador del sistema</p>
          </CardFooter>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-8">
          © 2025 Predicción Gastronómica. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}
