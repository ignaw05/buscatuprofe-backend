"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function ProfesorPerfilPage() {
  const [formData, setFormData] = useState({
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "+54 9 11 2345-6789",
    experience: "8 años de experiencia en enseñanza de matemáticas",
    availability: "Lunes a Viernes, 14:00 - 20:00",
  })

  const [titles, setTitles] = useState<string[]>([
    "Licenciado en Matemáticas",
    "Profesor de Matemáticas",
    "Especialización en Cálculo",
  ])
  const [currentTitle, setCurrentTitle] = useState("")

  const addTitle = () => {
    if (currentTitle.trim() && !titles.includes(currentTitle.trim())) {
      setTitles([...titles, currentTitle.trim()])
      setCurrentTitle("")
    }
  }

  const removeTitle = (titleToRemove: string) => {
    setTitles(titles.filter((title) => title !== titleToRemove))
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTitle()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would save the data to your backend
    alert("Perfil actualizado correctamente")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
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
        <Link href="/profesor">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al dashboard
          </Button>
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
            <p className="text-muted-foreground">Configura tu información profesional</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Datos básicos de contacto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información Profesional</CardTitle>
                <CardDescription>Experiencia y credenciales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Experiencia</Label>
                  <Textarea
                    id="experience"
                    placeholder="Describe tu experiencia profesional"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    rows={3}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Ej: 8 años de experiencia en enseñanza de matemáticas a nivel universitario
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titles">Títulos y Certificaciones</Label>
                  <div className="flex gap-2">
                    <Input
                      id="titles"
                      placeholder="Ej: Licenciado en Matemáticas"
                      value={currentTitle}
                      onChange={(e) => setCurrentTitle(e.target.value)}
                      onKeyDown={handleTitleKeyDown}
                    />
                    <Button type="button" variant="outline" onClick={addTitle}>
                      Agregar
                    </Button>
                  </div>
                  {titles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {titles.map((title) => (
                        <Badge key={title} variant="secondary" className="gap-1">
                          {title}
                          <button
                            type="button"
                            onClick={() => removeTitle(title)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Disponibilidad</CardTitle>
                <CardDescription>Horarios en los que puedes dar clases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="availability">Horarios disponibles</Label>
                  <Textarea
                    id="availability"
                    placeholder="Ej: Lunes a Viernes, 14:00 - 20:00"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    rows={3}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Describe tus horarios disponibles para que los estudiantes sepan cuándo pueden contactarte
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Link href="/profesor">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Guardar cambios
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
