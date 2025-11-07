"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Plus, MapPin, DollarSign, Clock, User, LogOut } from "lucide-react"
import Link from "next/link"
import { AddClassModal } from "@/components/add-class-modal"
import { EditClassModal } from "@/components/edit-class-modal"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter } from "next/navigation"
import { ClaseProfID } from "@/lib/interfaces"



export default function ProfesorDashboard() {
  const [classes, setClases] = useState<ClaseProfID[]>([])
  const params = useParams()
  const router = useRouter()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Reactivar verificación de seguridad cuando se reactive el login
    // const storedId = localStorage.getItem("profesorId")
    // if (storedId !== params.id) {
    //   router.push("/login")
    //   return
    // }

    async function fetchClases() {
      try {
        const res = await fetch(`http://localhost:8080/profesor/clases/id=${params.id}`)
        if (!res.ok) throw new Error("Error al obtener las clases")
        const data = await res.json()
        setClases(data)
      } catch (err) {
        console.error("❌ Error:", err)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchClases()
  }, [params.id, router])

  const handleLogout = () => {
    localStorage.removeItem("profesorId")
    router.push("/login")
  }

  const handleAddClass = (newClass: any) => {
    setClases([...classes, { ...newClass, id: classes.length + 1 }])
  }

  const handleEditClass = (updatedClass: any) => {
    setClases(classes.map((c) => (c.id === updatedClass.id ? updatedClass : c)))
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
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
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
              <CardTitle className="text-3xl">0</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Ingreso mensual estimado</CardDescription>
              <CardTitle className="text-3xl">
                ${classes.reduce((acc, c) => acc + c.precio, 0).toLocaleString()}
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
                  <CardTitle className="text-xl">{clase.nombre}</CardTitle>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      clase.modalidad === "Virtual"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {clase.modalidad}
                  </span>
                </div>
                <CardDescription className="line-clamp-2">{clase.descripcion}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                {clase.materias && clase.materias.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {clase.materias.slice(0, 3).map((materia: string) => (
                      <Badge key={materia} variant="outline" className="text-xs">
                        {materia}
                      </Badge>
                    ))}
                    {clase.materias.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{clase.materias.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{clase.provincia}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{clase.duracion}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>${clase.precio.toLocaleString()} / clase</span>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => openEditModal(clase)}>
                  Editar
                </Button>
                <Link href={`/clase/${clase.id}?from=profesor&profesorId=${params.id}`} className="flex-1">
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
