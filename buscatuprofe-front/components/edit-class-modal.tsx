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

interface EditClassModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onEditClass: (classData: any) => void
  classData: any
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

export function EditClassModal({ open, onOpenChange, onEditClass, classData }: EditClassModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    modality: "",
    province: "",
    price: "",
    duration: "",
  })
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")

  useEffect(() => {
    if (classData) {
      setFormData({
        title: classData.title || "",
        shortDescription: classData.shortDescription || classData.description || "",
        longDescription: classData.longDescription || classData.fullDescription || "",
        modality: classData.modality || "",
        province: classData.province || "",
        price: classData.price?.toString() || "",
        duration: classData.duration?.toString() || "",
      })
      setTags(classData.topics || [])
    }
  }, [classData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEditClass({
      ...classData,
      ...formData,
      price: Number(formData.price),
      duration: Number(formData.duration),
      topics: tags,
    })
    onOpenChange(false)
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar clase</DialogTitle>
          <DialogDescription>Actualiza los datos de tu clase</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título de la clase</Label>
              <Input
                id="title"
                placeholder="Ej: Matemáticas Avanzadas"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Descripción corta ({formData.shortDescription.length}/75)</Label>
              <Input
                id="shortDescription"
                placeholder="Breve descripción de la clase"
                value={formData.shortDescription}
                onChange={(e) => {
                  if (e.target.value.length <= 75) {
                    setFormData({ ...formData, shortDescription: e.target.value })
                  }
                }}
                required
                maxLength={75}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longDescription">Descripción detallada ({formData.longDescription.length}/150)</Label>
              <Textarea
                id="longDescription"
                placeholder="Describe en detalle lo que aprenderán los estudiantes"
                value={formData.longDescription}
                onChange={(e) => {
                  if (e.target.value.length <= 150) {
                    setFormData({ ...formData, longDescription: e.target.value })
                  }
                }}
                required
                rows={3}
                maxLength={150}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topics">Temas que se cubren</Label>
              <div className="flex gap-2">
                <Input
                  id="topics"
                  placeholder="Ej: Cálculo, Álgebra..."
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  Agregar
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="modality">Modalidad</Label>
              <Select
                value={formData.modality}
                onValueChange={(value) => setFormData({ ...formData, modality: value })}
              >
                <SelectTrigger id="modality">
                  <SelectValue placeholder="Selecciona la modalidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Virtual">Virtual</SelectItem>
                  <SelectItem value="Presencial">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">Provincia</Label>
              <Select
                value={formData.province}
                onValueChange={(value) => setFormData({ ...formData, province: value })}
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (ARS)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="2500"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duración (min)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="60"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                  min="15"
                  step="15"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
