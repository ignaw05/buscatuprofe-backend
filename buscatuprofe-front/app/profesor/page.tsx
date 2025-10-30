"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Plus, MapPin, DollarSign, Clock, Users, User } from "lucide-react"
import Link from "next/link"
import { AddClassModal } from "@/components/add-class-modal"
import { EditClassModal } from "@/components/edit-class-modal"
import { Badge } from "@/components/ui/badge"

const mockClasses = [
  {
    id: 1,
    title: "Matemáticas Avanzadas",
    shortDescription: "Clases de cálculo y álgebra para nivel universitario",
    longDescription:
      "Clases personalizadas enfocadas en cálculo diferencial e integral, álgebra lineal y ecuaciones diferenciales para estudiantes universitarios.",
    modality: "Virtual",
    province: "Buenos Aires",
    price: 2500,
    duration: 60,
    students: 12,
    topics: ["Cálculo Diferencial", "Cálculo Integral", "Álgebra Lineal"],
  },
  {
    id: 2,
    title: "Inglés Conversacional",
    shortDescription: "Mejora tu fluidez en inglés con conversaciones prácticas",
    longDescription:
      "Clases de inglés conversacional para mejorar tu fluidez y confianza al hablar. Enfoque en pronunciación y vocabulario cotidiano.",
    modality: "Presencial",
    province: "Córdoba",
    price: 2000,
    duration: 90,
    students: 8,
    topics: ["Conversación", "Pronunciación", "Vocabulario"],
  },
  {
    id: 3,
    title: "Programación Python",
    shortDescription: "Aprende Python desde cero hasta nivel intermedio",
    longDescription:
      "Curso completo de Python desde los fundamentos hasta conceptos intermedios. Incluye sintaxis básica, POO y librerías populares.",
    modality: "Virtual",
    province: "Santa Fe",
    price: 3000,
    duration: 120,
    students: 15,
    topics: ["Fundamentos", "POO", "NumPy y Pandas"],
  },
]

export default function ProfesorDashboard() {
  const [classes, setClasses] = useState(mockClasses)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<any>(null)

  const handleAddClass = (newClass: any) => {
    setClasses([...classes, { ...newClass, id: classes.length + 1, students: 0 }])
  }

  const handleEditClass = (updatedClass: any) => {
    setClasses(classes.map((c) => (c.id === updatedClass.id ? updatedClass : c)))
  }

  const openEditModal = (clase: any) => {
    setEditingClass(clase)
    setIsEditModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            BuscaTuProfe
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/profesor/perfil">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Mi Perfil
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground hidden sm:inline">Panel de Profesor</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mis Clases</h1>
            <p className="text-muted-foreground">Gestiona tus clases y estudiantes</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} size="lg" className="w-full sm:w-auto">
            <Plus className="h-5 w-5 mr-2" />
            Agregar clase
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total de clases</CardDescription>
              <CardTitle className="text-3xl">{classes.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total de estudiantes</CardDescription>
              <CardTitle className="text-3xl">{classes.reduce((acc, c) => acc + c.students, 0)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Ingreso mensual estimado</CardDescription>
              <CardTitle className="text-3xl">
                ${classes.reduce((acc, c) => acc + c.price * c.students, 0).toLocaleString()}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((clase) => (
            <Card key={clase.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl">{clase.title}</CardTitle>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      clase.modality === "Virtual"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {clase.modality}
                  </span>
                </div>
                <CardDescription className="line-clamp-2">{clase.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                {clase.topics && clase.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {clase.topics.slice(0, 3).map((topic: string) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {clase.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{clase.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{clase.province}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{clase.duration} minutos</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>${clase.price.toLocaleString()} / clase</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{clase.students} estudiantes</span>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => openEditModal(clase)}>
                  Editar
                </Button>
                <Link href={`/clase/${clase.id}`} className="flex-1">
                  <Button variant="ghost" className="w-full">
                    Ver detalles
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {classes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No tienes clases aún</h3>
            <p className="text-muted-foreground mb-4">Comienza agregando tu primera clase</p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar clase
            </Button>
          </div>
        )}
      </main>

      {/* Add Class Modal */}
      <AddClassModal open={isModalOpen} onOpenChange={setIsModalOpen} onAddClass={handleAddClass} />

      {editingClass && (
        <EditClassModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onEditClass={handleEditClass}
          classData={editingClass}
        />
      )}
    </div>
  )
}
