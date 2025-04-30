"use client"

import { Sidebar, useSidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"
import { Loader2 } from "lucide-react"

export function MainLayout({ children }) {
  const { isOpen, isMobileOpen } = useSidebar()
  const { isAuthenticated, isLoading } = useAuth()

  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
        <span className="ml-2 text-gray-600">Cargando...</span>
      </div>
    )
  }

  // Si no está autenticado, no renderizar el contenido
  // (la redirección se maneja en el AuthContext)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main
        className={cn(
          "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
          // Ajuste para escritorio
          isOpen ? "md:ml-64" : "md:ml-20",
          // Ajuste para móvil
          isMobileOpen ? "ml-64" : "ml-0",
        )}
      >
        {children}
      </main>
    </div>
  )
}
