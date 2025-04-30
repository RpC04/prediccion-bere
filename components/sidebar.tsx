"use client"

import { useState, createContext, useContext } from "react"
import Link from "next/link"
import { Home, History, Upload, Settings, HelpCircle, Menu, X, ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Crear un contexto para compartir el estado de la barra lateral
const SidebarContext = createContext({
  isOpen: true,
  isMobileOpen: false,
})

export function useSidebar() {
  return useContext(SidebarContext)
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user, logout } = useAuth()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  // Obtener las iniciales del nombre del usuario para el avatar
  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <SidebarContext.Provider value={{ isOpen, isMobileOpen }}>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-orange-500 text-white md:hidden"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-orange-500 text-white hidden md:flex"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-white shadow-lg transform transition-all duration-300 ease-in-out flex flex-col",
          // Mobile sidebar
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
          // Desktop sidebar
          "md:translate-x-0",
          isOpen ? "md:w-64" : "md:w-20",
        )}
      >
        <div className="flex items-center justify-center h-20 border-b">
          {isOpen ? (
            <h1 className="text-xl font-bold text-orange-600">Predicción Gastronómica</h1>
          ) : (
            <div className="p-2 rounded-full bg-orange-100">
              <Home className="h-6 w-6 text-orange-600" />
            </div>
          )}
        </div>

        {/* User info */}
        {user && (
          <div className={cn("px-4 py-3 border-b flex items-center", !isOpen && "justify-center")}>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt={user.name} />
              <AvatarFallback className="bg-orange-100 text-orange-600">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            {isOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {user.role === "admin" ? "Administrador" : "Asistente"}
                </p>
              </div>
            )}
          </div>
        )}

        <nav className="mt-6 flex-1">
          <SidebarItem icon={<Home />} text="Inicio" href="/" active isCollapsed={!isOpen} />
          <SidebarItem icon={<History />} text="Historial" href="/history" isCollapsed={!isOpen} />
          <SidebarItem icon={<Upload />} text="Cargar Datos" href="/data-upload" isCollapsed={!isOpen} />
          <SidebarItem icon={<Settings />} text="Configuración" href="/settings" isCollapsed={!isOpen} />
          <SidebarItem icon={<HelpCircle />} text="Ayuda" href="/help" isCollapsed={!isOpen} />
        </nav>

        {/* Logout button */}
        <div className="border-t py-2 px-3">
          <button
            onClick={logout}
            className={cn(
              "flex items-center w-full px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors",
              !isOpen && "justify-center px-0",
            )}
          >
            <LogOut className={cn("h-5 w-5", isOpen && "mr-3")} />
            {isOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
          </button>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}

function SidebarItem({ icon, text, href = "#", active = false, isCollapsed = false }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors",
        active && "bg-orange-50 text-orange-600 border-r-4 border-orange-500",
        isCollapsed && "justify-center px-0",
      )}
    >
      <span className={cn("mr-3", isCollapsed && "mr-0")}>{icon}</span>
      {!isCollapsed && <span className="text-sm font-medium">{text}</span>}
    </Link>
  )
}
