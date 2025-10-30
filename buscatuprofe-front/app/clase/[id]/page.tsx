"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, MapPin, Clock, DollarSign, Calendar, Users, Award, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const classesData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Matemáticas Avanzadas",
    teacher: "Prof. Juan Pérez",
    shortDescription: "Clases de cálculo y álgebra para nivel universitario",
    longDescription:
      "Clases personalizadas de matemáticas avanzadas enfocadas en cálculo diferencial e integral, álgebra lineal y ecuaciones diferenciales.",
    modality: "Virtual",
    province: "Buenos Aires",
    price: 2500,
    duration: 60,
    rating: 4.8,
    totalStudents: 45,
    experience: "8 años de experiencia",
    availability: "Lunes a Viernes, 14:00 - 20:00",
    whatsapp: "5491123456789",
    topics: ["Cálculo Diferencial", "Cálculo Integral", "Álgebra Lineal", "Ecuaciones Diferenciales"],
  },
  "2": {
    id: 2,
    title: "Inglés Conversacional",
    teacher: "Prof. María González",
    shortDescription: "Mejora tu fluidez en inglés con conversaciones prácticas",
    longDescription:
      "Clases de inglés conversacional para mejorar tu fluidez y confianza al hablar. Enfoque en pronunciación y vocabulario cotidiano.",
    modality: "Presencial",
    province: "Córdoba",
    price: 2000,
    duration: 90,
    rating: 4.9,
    totalStudents: 67,
    experience: "12 años de experiencia",
    availability: "Martes y Jueves, 16:00 - 21:00",
    whatsapp: "5493512345678",
    topics: ["Conversación", "Pronunciación", "Vocabulario", "Expresiones Idiomáticas"],
  },
  "3": {
    id: 3,
    title: "Programación Python",
    teacher: "Prof. Carlos Rodríguez",
    shortDescription: "Aprende Python desde cero hasta nivel intermedio",
    longDescription:
      "Curso completo de Python desde los fundamentos hasta conceptos intermedios. Incluye sintaxis básica, POO y librerías populares.",
    modality: "Virtual",
    province: "Santa Fe",
    price: 3000,
    duration: 120,
    rating: 4.7,
    totalStudents: 89,
    experience: "10 años de experiencia",
    availability: "Lunes, Miércoles y Viernes, 18:00 - 22:00",
    whatsapp: "5493424567890",
    topics: ["Fundamentos de Python", "POO", "Estructuras de Datos", "NumPy y Pandas"],
  },
}

export default function ClaseDetallesPage() {
  const params = useParams()
  const clase = classesData[params.id as string]

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
      `Hola ${clase.teacher}, estoy interesado en tus clases de ${clase.title}. ¿Podrías darme más información?`,
    )
    window.open(`https://wa.me/${clase.whatsapp}?text=${message}`, "_blank")
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
                <h1 className="text-3xl font-bold flex-1">{clase.title}</h1>
                <Badge variant={clase.modality === "Virtual" ? "default" : "secondary"} className="text-sm px-3 py-1">
                  {clase.modality}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground mb-2">
                <span className="text-lg font-medium text-foreground">{clase.teacher}</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="font-medium text-foreground">{clase.rating}</span>
                  <span className="text-sm">({clase.totalStudents} estudiantes)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{clase.longDescription}</p>
              </CardContent>
            </Card>

            {/* Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Temas que se cubren</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {clase.topics.map((topic: string) => (
                    <Badge key={topic} variant="outline" className="text-sm px-3 py-1">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Details Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la clase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Duración</p>
                      <p className="text-sm text-muted-foreground">{clase.duration} minutos por clase</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-sm text-muted-foreground">{clase.province}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Experiencia</p>
                      <p className="text-sm text-muted-foreground">{clase.experience}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Estudiantes</p>
                      <p className="text-sm text-muted-foreground">{clase.totalStudents} estudiantes activos</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:col-span-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Disponibilidad</p>
                      <p className="text-sm text-muted-foreground">{clase.availability}</p>
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
                  {clase.price.toLocaleString()}
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
                    <span className="font-medium">{clase.modality}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duración</span>
                    <span className="font-medium">{clase.duration} min</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Calificación</span>
                    <span className="font-medium flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {clase.rating}
                    </span>
                  </div>
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
