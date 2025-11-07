"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfesorPage() {
  const router = useRouter()

  useEffect(() => {
    // TODO: Reactivar login cuando sea necesario
    // Por ahora, usamos un ID de profesor por defecto para desarrollo
    const profesorId = localStorage.getItem("profesorId") || "1"
    
    // Si no estaba en localStorage, lo guardamos
    if (!localStorage.getItem("profesorId")) {
      localStorage.setItem("profesorId", profesorId)
    }
    
    // Ir al panel de clases
    router.push(`/profesor/${profesorId}`)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground mt-4">Cargando...</p>
      </div>
    </div>
  )
}
