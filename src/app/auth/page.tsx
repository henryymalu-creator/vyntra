'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/shared/Navbar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { Shield } from 'lucide-react'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-vyntra-blue to-vyntra-blue-dark rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
            </Link>
            <h1 className="text-3xl font-bold mb-2">
              Bienvenido de vuelta
            </h1>
            <p className="text-gray-400">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Correo electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />

              <Input
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              <div className="flex items-center justify-end">
                <Link
                  href="/recuperar-password"
                  className="text-sm text-vyntra-blue hover:text-vyntra-blue-light"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button type="submit" fullWidth loading={loading}>
                Iniciar sesión
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">
                ¿No tienes cuenta?{' '}
                <Link
                  href="/registro"
                  className="text-vyntra-blue hover:text-vyntra-blue-light font-semibold"
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </Card>

          <p className="text-center text-sm text-gray-400 mt-6">
            Al continuar, aceptas nuestros{' '}
            <Link href="/terminos" className="text-vyntra-blue hover:underline">
              Términos de servicio
            </Link>{' '}
            y{' '}
            <Link href="/privacidad" className="text-vyntra-blue hover:underline">
              Política de privacidad
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
