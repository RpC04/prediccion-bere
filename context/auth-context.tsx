"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

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

// Datos de usuario de prueba
const TEST_USERS = [
  {
    id: "1",
    name: "Doña Bere",
    email: "bere@ejemplo.com",
    password: "password123",
    role: "admin",
  },
  {
    id: "2",
    name: "Carlos",
    email: "carlos@ejemplo.com",
    password: "password123",
    role: "assistant",
  },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Verificar si hay un usuario almacenado en localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Redirigir según el estado de autenticación
  useEffect(() => {
    if (!isLoading) {
      // Si no está autenticado y no está en la página de login, redirigir a login
      if (!user && pathname !== "/login") {
        router.push("/login")
      }
      // Si está autenticado y está en la página de login, redirigir a la página principal
      else if (user && pathname === "/login") {
        router.push("/")
      }
    }
  }, [user, isLoading, pathname, router])

  // Función de inicio de sesión
  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    // En una aplicación real, aquí se haría la llamada a la API
    const foundUser = TEST_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      // Crear objeto de usuario sin la contraseña
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)

      // Si rememberMe está activado, guardar en localStorage
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      }

      return true
    }

    return false
  }

  // Función de cierre de sesión
  const logout = () => {
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

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
