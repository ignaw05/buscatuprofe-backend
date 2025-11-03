"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, MapPin, Clock, DollarSign, Calendar, Users, Award, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ClaseID } from "@/lib/interfaces"


export default function ClaseDetallesPage() {
  const [clase, setClase] = useState<ClaseID>() 
  const params = useParams()
  // const clase = classesData[params.id as string]

  useEffect(() => {
  async function fetchClase() {
    try {
      const res = await fetch(`http://localhost:8080/clases/id=${params.id}`)
      if (!res.ok) throw new Error("Error al obtener la clase")
      const data = await res.json()
      setClase(data)
    } catch (err) {
      console.error("❌ Error:", err)
    }  
  }
  fetchClase()
  }, [])

  if (!clase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Clase no encontrada</h1>
          <Link href="/buscar">
            <Button>Volver a buscar</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hola ${clase.profesor.nombre}, estoy interesado en tus clases de ${clase.nombre}. ¿Podrías darme más información?`,
    )
    window.open(`https://wa.me/${clase.profesor.telefono}?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            BuscaTuProfe
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/buscar">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a resultados
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Teacher */}
            <div>
              <div className="flex items-start gap-3 mb-4">
                <h1 className="text-3xl font-bold flex-1">{clase.nombre}</h1>
                <Badge variant={clase.modalidad === "Virtual" ? "default" : "secondary"} className="text-sm px-3 py-1">
                  {clase.modalidad}
                </Badge>

                  <Badge className="text-sm px-3 py-1">
                  Nivel: {clase.nivel}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground mb-2">
                <span className="text-lg font-medium text-foreground">{clase.profesor.nombre}</span>
                <div className="flex items-center gap-1">
                  {/* <span className="text-yellow-500 text-lg">★</span> */}
                  {/* <span className="font-medium text-foreground">{clase.rating}</span> */}
                  {/* <span className="text-sm">({clase.totalStudents} estudiantes)</span> */}
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{clase.descripcion}</p>
              </CardContent>
            </Card>

            {/* Topics */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Materias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {clase.materias.map((topic: string) => (
                    <Badge key={topic} variant="outline" className="text-sm px-3 py-1">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Details Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la clase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {/* Columna 1: Duración y Experiencia */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Duración</p>
                        <p className="text-sm text-muted-foreground">{clase.duracion} por clase</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Experiencia</p>
                        {clase.profesor.titulos.map((tema: string) => (
                          <p key={tema} className="text-sm text-muted-foreground">
                            - {tema}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Columna 2: Ubicación y Disponibilidad */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Ubicación</p>
                        <p className="text-sm text-muted-foreground">{clase.provincia}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Disponibilidad</p>
                        {clase.profesor.disponibilidad.map((tema: string) => (
                          <p key={tema} className="text-sm text-muted-foreground">
                            - {tema}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">Precio por clase</CardTitle>
                <CardDescription className="flex items-center gap-2 text-3xl font-bold text-foreground">
                  <DollarSign className="h-8 w-8" />
                  {clase.precio.toLocaleString('es-AR')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleWhatsAppContact} size="lg" className="w-full">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contactar por WhatsApp
                </Button>

                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Modalidad</span>
                    <span className="font-medium">{clase.modalidad}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duración</span>
                    <span className="font-medium">{clase.duracion} </span>
                  </div>
                  {/* <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Calificación</span>
                    <span className="font-medium flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {clase.rating}
                    </span>
                  </div> */}
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Al contactar al profesor, podrás coordinar horarios y modalidad de pago directamente
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
