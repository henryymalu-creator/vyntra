'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/shared/Navbar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { Shield, Mail, Lock } from 'lucide-react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        await signIn(email, password)
        router.push('/dashboard')
      } else {
        await signUp(email, password, displayName)
        router.push('/dashboard')
      }
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
              {isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
            </h1>
            <p className="text-gray-400">
              {isLogin
                ? 'Ingresa tus credenciales para continuar'
                : 'Regístrate para acceder a todas las funciones'}
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <Input
                  label="Nombre completo"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Tu nombre"
                  required
                />
              )}

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
                helperText={
                  !isLogin ? 'Mínimo 6 caracteres' : undefined
                }
              />

              {isLogin && (
                <div className="flex items-center justify-end">
                  <Link
                    href="/recuperar-password"
                    className="text-sm text-vyntra-blue hover:text-vyntra-blue-light"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              )}

              <Button type="submit" fullWidth loading={loading}>
                {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">
                {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-vyntra-blue hover:text-vyntra-blue-light font-semibold"
                >
                  {isLogin ? 'Regístrate' : 'Inicia sesión'}
                </button>
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
