"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search, MapPin, DollarSign, Clock, Filter, X } from "lucide-react"
import Link from "next/link"
import { Slider } from "@/components/ui/slider"

// Mock data for available classes
const allClasses = [
  {
    id: 1,
    title: "Matemáticas Avanzadas",
    teacher: "Prof. Juan Pérez",
    description: "Clases de cálculo y álgebra para nivel universitario",
    modality: "Virtual",
    province: "Buenos Aires",
    price: 2500,
    duration: 60,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Inglés Conversacional",
    teacher: "Prof. María González",
    description: "Mejora tu fluidez en inglés con conversaciones prácticas",
    modality: "Presencial",
    province: "Córdoba",
    price: 2000,
    duration: 90,
    rating: 4.9,
  },
  {
    id: 3,
    title: "Programación Python",
    teacher: "Prof. Carlos Rodríguez",
    description: "Aprende Python desde cero hasta nivel intermedio",
    modality: "Virtual",
    province: "Santa Fe",
    price: 3000,
    duration: 120,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Física Universitaria",
    teacher: "Prof. Ana Martínez",
    description: "Física I y II para carreras de ingeniería",
    modality: "Virtual",
    province: "Buenos Aires",
    price: 2800,
    duration: 90,
    rating: 4.6,
  },
  {
    id: 5,
    title: "Química Orgánica",
    teacher: "Prof. Luis Fernández",
    description: "Química orgánica para estudiantes de medicina y biología",
    modality: "Presencial",
    province: "Mendoza",
    price: 3200,
    duration: 120,
    rating: 4.9,
  },
  {
    id: 6,
    title: "Guitarra para Principiantes",
    teacher: "Prof. Diego López",
    description: "Aprende a tocar guitarra desde cero",
    modality: "Virtual",
    province: "Córdoba",
    price: 1500,
    duration: 60,
    rating: 4.5,
  },
]

const provincias = [
  "Todas",
  "Buenos Aires",
  "Córdoba",
  "Santa Fe",
  "Mendoza",
  "Tucumán",
  "Entre Ríos",
  "Salta",
  "Misiones",
]

export default function BuscarPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [modality, setModality] = useState("Todas")
  const [province, setProvince] = useState("Todas")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [showFilters, setShowFilters] = useState(false)

  const filteredClasses = allClasses.filter((clase) => {
    const matchesSearch =
      clase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clase.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesModality = modality === "Todas" || clase.modality === modality
    const matchesProvince = province === "Todas" || clase.province === province
    const matchesPrice = clase.price >= priceRange[0] && clase.price <= priceRange[1]

    return matchesSearch && matchesModality && matchesProvince && matchesPrice
  })

  const clearFilters = () => {
    setModality("Todas")
    setProvince("Todas")
    setPriceRange([0, 5000])
  }

  const hasActiveFilters = modality !== "Todas" || province !== "Todas" || priceRange[0] !== 0 || priceRange[1] !== 5000

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
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Buscar Clases</h1>
          <p className="text-muted-foreground">Encuentra el profesor perfecto para ti</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por materia, profesor o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Filters Toggle Button (Mobile) */}
        <div className="mb-6 lg:hidden">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filtros</CardTitle>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
                      <X className="h-4 w-4 mr-1" />
                      Limpiar
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Modality Filter */}
                <div className="space-y-2">
                  <Label htmlFor="modality">Modalidad</Label>
                  <Select value={modality} onValueChange={setModality}>
                    <SelectTrigger id="modality">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todas">Todas</SelectItem>
                      <SelectItem value="Virtual">Virtual</SelectItem>
                      <SelectItem value="Presencial">Presencial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Province Filter */}
                <div className="space-y-2">
                  <Label htmlFor="province">Provincia</Label>
                  <Select value={province} onValueChange={setProvince}>
                    <SelectTrigger id="province">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {provincias.map((prov) => (
                        <SelectItem key={prov} value={prov}>
                          {prov}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-4">
                  <Label>Rango de precio</Label>
                  <div className="space-y-2">
                    <Slider
                      min={0}
                      max={5000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredClasses.length} {filteredClasses.length === 1 ? "clase encontrada" : "clases encontradas"}
              </p>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredClasses.map((clase) => (
                <Card key={clase.id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl">{clase.title}</CardTitle>
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          clase.modality === "Virtual"
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {clase.modality}
                      </span>
                    </div>
                    <CardDescription className="text-sm font-medium text-foreground/80">
                      {clase.teacher}
                    </CardDescription>
                    <CardDescription className="line-clamp-2">{clase.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{clase.province}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{clase.duration} minutos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <DollarSign className="h-5 w-5" />
                        <span>${clase.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{clase.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/clase/${clase.id}`} className="w-full">
                      <Button className="w-full">Ver detalles</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredClasses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No se encontraron clases</h3>
                <p className="text-muted-foreground mb-4">Intenta ajustar tus filtros de búsqueda</p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
