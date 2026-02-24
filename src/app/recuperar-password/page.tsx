'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { Shield, ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function PasswordResetPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await resetPassword(email)
      setSent(true)
    } catch (error) {
      console.error('Password reset error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
        <div className="w-full max-w-md">
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <Link href="/auth" className="inline-flex items-center justify-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-vyntra-blue to-vyntra-blue-dark rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                </Link>
                <h1 className="text-3xl font-bold mb-2">Recuperar contraseña</h1>
                <p className="text-gray-400">
                  Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña
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

                  <Button type="submit" fullWidth loading={loading}>
                    <Mail className="w-5 h-5 mr-2" />
                    Enviar instrucciones
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <Link
                    href="/auth"
                    className="inline-flex items-center text-sm text-vyntra-blue hover:text-vyntra-blue-light"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al inicio de sesión
                  </Link>
                </div>
              </Card>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 border-2 border-green-500/20 rounded-2xl mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h1 className="text-3xl font-bold mb-2">¡Correo enviado!</h1>
                <p className="text-gray-400 mb-8">
                  Hemos enviado un correo con instrucciones a <strong className="text-white">{email}</strong>
                </p>
              </div>

              <Card className="p-8">
                <div className="space-y-4 text-sm text-gray-400">
                  <p>📧 Revisa tu bandeja de entrada</p>
                  <p>⏱️ El correo puede tardar algunos minutos en llegar</p>
                  <p>📂 Si no lo ves, revisa tu carpeta de spam</p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <Link href="/auth">
                    <Button variant="secondary" fullWidth>
                      Volver al inicio de sesión
                    </Button>
                  </Link>
                  
                  <button
                    onClick={() => setSent(false)}
                    className="w-full text-center text-sm text-gray-400 hover:text-white transition"
                  >
                    ¿No recibiste el correo? Reenviar
                  </button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
