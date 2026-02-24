'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useVehicles } from '@/hooks/useVehicles'
import Navbar from '@/components/shared/Navbar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { Shield, Car, CheckCircle } from 'lucide-react'
import { formatPlate, isValidPlate } from '@/lib/utils'
import toast from 'react-hot-toast'

function RegisterContent() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [plate, setPlate] = useState('')
  const [vehicleType, setVehicleType] = useState<'auto' | 'moto' | 'camioneta' | 'taxi' | 'otro'>('auto')
  const [loading, setLoading] = useState(false)
  
  const { user, signUp } = useAuth()
  const { addVehicle } = useVehicles()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const plateParam = searchParams.get('plate')
    if (plateParam) {
      setPlate(plateParam)
    }
    
    if (user) {
      setStep(2)
    }
  }, [user, searchParams])

  const handleUserRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signUp(email, password, displayName)
      setStep(2)
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVehicleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValidPlate(plate)) {
      toast.error('Formato de placa inválido. Use formato ABC-1234')
      return
    }

    setLoading(true)

    try {
      await addVehicle({
        plate: formatPlate(plate),
        type: vehicleType,
      })
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Vehicle registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
        <div className="w-full max-w-2xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                step >= 1 ? 'bg-vyntra-blue border-vyntra-blue' : 'border-white/20'
              }`}>
                {step > 1 ? <CheckCircle className="w-6 h-6" /> : <span>1</span>}
              </div>
              <div className={`w-20 h-0.5 transition-colors ${
                step >= 2 ? 'bg-vyntra-blue' : 'bg-white/20'
              }`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                step >= 2 ? 'bg-vyntra-blue border-vyntra-blue' : 'border-white/20'
              }`}>
                <span>2</span>
              </div>
            </div>
          </div>

          {step === 1 ? (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-vyntra-blue to-vyntra-blue-dark rounded-2xl mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Crea tu cuenta</h1>
                <p className="text-gray-400">
                  Primero, ingresa tus datos personales
                </p>
              </div>

              <Card className="p-8">
                <form onSubmit={handleUserRegistration} className="space-y-6">
                  <Input
                    label="Nombre completo"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Juan Pérez"
                    required
                  />

                  <Input
                    label="Correo electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="juan@email.com"
                    required
                  />

                  <Input
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    helperText="Mínimo 6 caracteres"
                  />

                  <Button type="submit" fullWidth loading={loading}>
                    Continuar
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-sm text-gray-400">
                    ¿Ya tienes cuenta?{' '}
                    <a
                      href="/auth"
                      className="text-vyntra-blue hover:text-vyntra-blue-light font-semibold"
                    >
                      Inicia sesión
                    </a>
                  </p>
                </div>
              </Card>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-vyntra-blue to-vyntra-blue-dark rounded-2xl mb-4">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Registra tu vehículo</h1>
                <p className="text-gray-400">
                  Ingresa los datos de tu vehículo para activar las alertas
                </p>
              </div>

              <Card className="p-8">
                <form onSubmit={handleVehicleRegistration} className="space-y-6">
                  <Input
                    label="Número de placa"
                    type="text"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value.toUpperCase())}
                    placeholder="ABC-1234"
                    maxLength={8}
                    required
                    helperText="Formato: ABC-1234"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Tipo de vehículo <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {vehicleTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setVehicleType(type.value)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            vehicleType === type.value
                              ? 'border-vyntra-blue bg-vyntra-blue/10'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <div className="text-sm font-medium">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-vyntra-blue/10 border border-vyntra-blue/20 rounded-xl p-4">
                    <h4 className="font-semibold mb-2 text-vyntra-blue">¿Qué recibirás?</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-vyntra-blue mr-2 flex-shrink-0" />
                        Alertas de vencimiento de matrícula
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-vyntra-blue mr-2 flex-shrink-0" />
                        Notificaciones de pico y placa
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-vyntra-blue mr-2 flex-shrink-0" />
                        Recordatorios de revisión técnica
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-vyntra-blue mr-2 flex-shrink-0" />
                        Actualizaciones de normativa
                      </li>
                    </ul>
                  </div>

                  <Button type="submit" fullWidth loading={loading}>
                    Completar registro
                  </Button>
                </form>
              </Card>
            </div>
          )}

          <p className="text-center text-sm text-gray-400 mt-6">
            Al registrarte, aceptas nuestros{' '}
            <a href="/terminos" className="text-vyntra-blue hover:underline">
              Términos de servicio
            </a>{' '}
            y{' '}
            <a href="/privacidad" className="text-vyntra-blue hover:underline">
              Política de privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

const vehicleTypes = [
  { value: 'auto' as const, label: 'Auto', icon: '🚗' },
  { value: 'moto' as const, label: 'Moto', icon: '🏍️' },
  { value: 'camioneta' as const, label: 'Camioneta', icon: '🚙' },
  { value: 'taxi' as const, label: 'Taxi', icon: '🚕' },
  { value: 'otro' as const, label: 'Otro', icon: '🚐' },
]

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-vyntra-bg-main flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-vyntra-brand rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Cargando...</span>
          </div>
          <p className="text-ink-muted mt-4">Cargando...</p>
        </div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  )
}
