"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface AddClassModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddClass: (classData: any) => void
}

const provincias = [
  "Buenos Aires",
  "Córdoba",
  "Santa Fe",
  "Mendoza",
  "Tucumán",
  "Entre Ríos",
  "Salta",
  "Misiones",
  "Chaco",
  "Corrientes",
  "Santiago del Estero",
  "San Juan",
  "Jujuy",
  "Río Negro",
  "Neuquén",
  "Formosa",
  "Chubut",
  "San Luis",
  "Catamarca",
  "La Rioja",
  "La Pampa",
  "Santa Cruz",
  "Tierra del Fuego",
]

const duraciones = [
  "30 minutos",
  "45 minutos",
  "1 hora",
  "1 hora 15 minutos",
  "1 hora 30 minutos",
  "1 hora 45 minutos",
  "2 horas",
  "2 horas 15 minutos",
  "2 horas 30 minutos",
  "2 horas 45 minutos",
  "3 horas",
]

const modalidades = [
  "Virtual",
  "Presencial",
  "Presencial y Virtual",
]

const niveles = [
  "Primaria",
  "Secundaria",
  "Preuniversitario",
  "Universitario",
  "Idioma Inicial",
  "Idioma Avanzado",
  "Extracurricular",
]

export function AddClassModal({ open, onOpenChange, onAddClass }: AddClassModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    modalidad: "",
    provincia: "",
    precio: "",
    duracion: "",
    nivel: "",
    materias: [] as string[],
  })
  const [materias, setMaterias] = useState<string[]>([])
  const [currentMateria, setCurrentMateria] = useState("")
  const [isLoadingMaterias, setIsLoadingMaterias] = useState(false)

  useEffect(() => {
    // Cargar materias disponibles
    const fetchMaterias = async () => {
      setIsLoadingMaterias(true)
      try {
        const res = await fetch("http://localhost:8080/materias")
        if (res.ok) {
          const data = await res.json()
          setMaterias(data.materias || [])
        }
      } catch (err) {
        console.error("Error al cargar materias:", err)
      } finally {
        setIsLoadingMaterias(false)
      }
    }

    if (open) {
      fetchMaterias()
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch("http://localhost:8080/clases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          precio: Number(formData.precio),
          profesorId: parseInt(localStorage.getItem("profesorId") || "1"),
        }),
      })

      if (res.ok) {
        const newClass = await res.json()
        onAddClass(newClass)
        setFormData({
          nombre: "",
          descripcion: "",
          modalidad: "",
          provincia: "",
          precio: "",
          duracion: "",
          nivel: "",
          materias: [],
        })
        setCurrentMateria("")
        onOpenChange(false)
      }
    } catch (err) {
      console.error("Error al crear clase:", err)
    }
  }

  const addMateria = () => {
    if (currentMateria.trim() && !formData.materias.includes(currentMateria.trim())) {
      setFormData({
        ...formData,
        materias: [...formData.materias, currentMateria.trim()],
      })
      setCurrentMateria("")
    }
  }

  const removeMateria = (materiaToRemove: string) => {
    setFormData({
      ...formData,
      materias: formData.materias.filter((m) => m !== materiaToRemove),
    })
  }

  const handleMateriaKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addMateria()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar nueva clase</DialogTitle>
          <DialogDescription>Completa los datos de tu clase para publicarla</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre de la clase</Label>
              <Input
                id="nombre"
                placeholder="Ej: Matemáticas Avanzadas"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción ({formData.descripcion.length}/500)</Label>
              <Textarea
                id="descripcion"
                placeholder="Describe en detalle lo que aprenderán los estudiantes"
                value={formData.descripcion}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                }}
                required
                rows={3}
                maxLength={500}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="materias">Materias</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Select value={currentMateria} onValueChange={setCurrentMateria}>
                    <SelectTrigger id="materias" className="flex-1">
                      <SelectValue placeholder="Selecciona o escribe una materia" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingMaterias ? (
                        <SelectItem value="loading" disabled>
                          Cargando...
                        </SelectItem>
                      ) : (
                        materias.map((materia, index) => (
                          <SelectItem key={`${materia}-${index}`} value={materia}>
                            {materia}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" onClick={addMateria}>
                    Agregar
                  </Button>
                </div>
                <Input
                  placeholder="O escribe una nueva materia..."
                  value={currentMateria}
                  onChange={(e) => setCurrentMateria(e.target.value)}
                  onKeyDown={handleMateriaKeyDown}
                />
              </div>
              {formData.materias.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.materias.map((materia) => (
                    <Badge key={materia} variant="secondary" className="gap-1">
                      {materia}
                      <button
                        type="button"
                        onClick={() => removeMateria(materia)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="modalidad">Modalidad</Label>
              <Select
                value={formData.modalidad}
                onValueChange={(value) => setFormData({ ...formData, modalidad: value })}
              >
                <SelectTrigger id="modalidad">
                  <SelectValue placeholder="Selecciona la modalidad" />
                </SelectTrigger>
                <SelectContent>
                  {modalidades.map((mod) => (
                    <SelectItem key={mod} value={mod}>
                      {mod}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nivel">Nivel</Label>
              <Select
                value={formData.nivel}
                onValueChange={(value) => setFormData({ ...formData, nivel: value })}
              >
                <SelectTrigger id="nivel">
                  <SelectValue placeholder="Selecciona el nivel" />
                </SelectTrigger>
                <SelectContent>
                  {niveles.map((nivel) => (
                    <SelectItem key={nivel} value={nivel}>
                      {nivel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracion">Duración</Label>
              <Select
                value={formData.duracion}
                onValueChange={(value) => setFormData({ ...formData, duracion: value })}
              >
                <SelectTrigger id="duracion">
                  <SelectValue placeholder="Selecciona la duración" />
                </SelectTrigger>
                <SelectContent>
                  {duraciones.map((dur) => (
                    <SelectItem key={dur} value={dur}>
                      {dur}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">Provincia</Label>
              <Select
                value={formData.provincia}
                onValueChange={(value) => setFormData({ ...formData, provincia: value })}
              >
                <SelectTrigger id="province">
                  <SelectValue placeholder="Selecciona la provincia" />
                </SelectTrigger>
                <SelectContent>
                  {provincias.map((provincia) => (
                    <SelectItem key={provincia} value={provincia}>
                      {provincia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio (ARS)</Label>
              <Input
                id="price"
                type="number"
                placeholder="2500"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                required
                min="0"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Agregar clase</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
