"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // Simulate Google OAuth flow
    // In production, this would redirect to Google OAuth
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard after successful login
      router.push("/profesor")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            BuscaTuProfe
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
            <CardDescription>Accede a tu cuenta para continuar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Login Button */}
            <Button
              variant="outline"
              className="w-full h-12 text-base bg-transparent"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                  <span>Conectando...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continuar con Google</span>
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">O</span>
              </div>
            </div>

            {/* Alternative Options */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-transparent" disabled>
                Continuar con email
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Al continuar, aceptas nuestros{" "}
                <Link href="#" className="underline hover:text-foreground">
                  Términos de Servicio
                </Link>{" "}
                y{" "}
                <Link href="#" className="underline hover:text-foreground">
                  Política de Privacidad
                </Link>
              </p>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link href="/registro" className="text-primary font-medium hover:underline">
                  Regístrate
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
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
