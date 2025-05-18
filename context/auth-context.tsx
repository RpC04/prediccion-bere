"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Definir el tipo para el contexto de autenticación
type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>
  logout: () => void
}

// Definir el tipo para el usuario
type User = {
  id: string
  name: string
  email: string
  role: string
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)
 
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  // Cargar la sesión al montar
  useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      const sessionUser = data?.session?.user

      if (sessionUser) {
        setUser({
          id: sessionUser.id,
          name: sessionUser.user_metadata?.full_name || "", // opcional, si usas metadata
          email: sessionUser.email || "",
          role: sessionUser.user_metadata?.role || "user",
        })
      } else {
        setUser(null)
      }

      setIsLoading(false)
    }

    loadSession()
  }, [])

  // Redirecciones automáticas
  useEffect(() => {
    if (!isLoading) {
      if (!user && pathname !== "/login") {
        router.push("/login")
      } else if (user && pathname === "/login") {
        router.push("/data-upload") // redirección principal después del login
      }
    }
  }, [user, isLoading, pathname, router])

  // Login real con Supabase
  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error || !data.session) return false

    const sessionUser = data.session.user

    const newUser = {
      id: sessionUser.id,
      name: sessionUser.user_metadata?.full_name || "",
      email: sessionUser.email || "",
      role: sessionUser.user_metadata?.role || "user",
    }

    setUser(newUser)

    // Si quieres recordar usuario manualmente (opcional)
    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(newUser))
    }

    return true
  }

  // Logout usando Supabase
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook personalizado
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
