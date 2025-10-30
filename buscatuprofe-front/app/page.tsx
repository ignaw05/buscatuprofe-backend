import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search, GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">BuscaTuProfe</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Logo/Title Section */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-balance">BuscaTuProfe</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Encuentra clases particulares en línea con los mejores profesores
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto min-w-[200px] text-lg h-14">
              <Link href="/buscar" className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Buscar clase
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[200px] text-lg h-14 bg-transparent"
            >
              <Link href="/profesor" className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Soy profe
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Búsqueda fácil</h3>
              <p className="text-sm text-muted-foreground">Encuentra profesores por materia, modalidad y ubicación</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Profesores verificados</h3>
              <p className="text-sm text-muted-foreground">Todos los profesores están verificados y calificados</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Precios transparentes</h3>
              <p className="text-sm text-muted-foreground">Compara precios y elige la mejor opción para ti</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 BuscaTuProfe. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
