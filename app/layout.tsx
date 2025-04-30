import { AuthProvider } from "@/context/auth-context"
import "./globals.css"

export const metadata = {
  title: "Sistema de Predicción Gastronómica",
  description: "Sistema inteligente para la predicción de demanda en negocios gastronómicos",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
