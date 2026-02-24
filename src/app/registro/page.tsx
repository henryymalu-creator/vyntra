'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useVehicles } from '@/hooks/useVehicles'
import Navbar from '@/components/shared/Navbar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { Shield, CheckCircle } from 'lucide-react'
import { formatPlate, isValidPlate } from '@/lib/utils'
import toast from 'react-hot-toast'

function RegisterContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [plate, setPlate] = useState('')
  const [city, setCity] = useState('Quito')
  const [vehicleType, setVehicleType] = useState<'auto' | 'moto' | 'camioneta' | 'taxi' | 'otro'>('auto')
  const [loading, setLoading] = useState(false)
  
  const { signUp } = useAuth()
  const { addVehicle } = useVehicles()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const plateParam = searchParams.get('plate')
    if (plateParam) {
      setPlate(plateParam)
    }
  }, [searchParams])

  const isStrongPassword = (value: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(value)
  }

  const passwordError =
    password && !isStrongPassword(password)
      ? 'Minimo 8 caracteres, mayuscula, minuscula, numero y simbolo'
      : undefined

  const confirmError =
    confirmPassword && password !== confirmPassword
      ? 'Las contrasenas no coinciden'
      : undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isStrongPassword(password)) {
      toast.error('La contrasena no cumple los requisitos')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Las contrasenas no coinciden')
      return
    }

    if (!isValidPlate(plate)) {
      toast.error('Formato de placa invalido. Use formato ABC-1234')
      return
    }

    setLoading(true)

    try {
      const firebaseUser = await signUp(email, password, displayName)
      await addVehicle(
        {
          plate: formatPlate(plate),
          type: vehicleType,
          city,
        },
        { userId: firebaseUser.uid }
      )

      router.push('/dashboard')
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
        <div className="w-full max-w-2xl">
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-vyntra-blue to-vyntra-blue-dark rounded-2xl mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Crea tu cuenta y registra tu vehiculo</h1>
              <p className="text-gray-400">
                Un solo formulario para activar tus alertas
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Nombre completo"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Juan Perez"
                  required
                />

                <Input
                  label="Correo electronico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juan@email.com"
                  required
                />

                <div>
                  <Input
                    label="Contrasena"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    helperText="Minimo 8 caracteres, mayuscula, minuscula, numero y simbolo"
                    error={passwordError}
                  />
                  <label className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      checked={showPassword}
                      onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    Mostrar contrasena
                  </label>
                </div>

                <div>
                  <Input
                    label="Confirmar contrasena"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    error={confirmError}
                  />
                  <label className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      checked={showConfirmPassword}
                      onChange={(e) => setShowConfirmPassword(e.target.checked)}
                    />
                    Mostrar confirmacion
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Ciudad <span className="text-red-400">*</span>
                  </label>
                  <select
                    className="w-full border border-white/10 rounded-xl p-3 bg-white/5 text-white"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  >
                    {cities.map((cityOption) => (
                      <option key={cityOption} value={cityOption}>
                        {cityOption}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Numero de placa"
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
                    Tipo de vehiculo <span className="text-red-400">*</span>
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
                  <h4 className="font-semibold mb-2 text-vyntra-blue">¿Que recibiras?</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-vyntra-blue mr-2 flex-shrink-0" />
                      Alertas de vencimiento de matricula
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-vyntra-blue mr-2 flex-shrink-0" />
                      Notificaciones de pico y placa
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-vyntra-blue mr-2 flex-shrink-0" />
                      Recordatorios de revision tecnica
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

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400">
                  ¿Ya tienes cuenta?{' '}
                  <a
                    href="/auth"
                    className="text-vyntra-blue hover:text-vyntra-blue-light font-semibold"
                  >
                    Inicia sesion
                  </a>
                </p>
              </div>
            </Card>
          </div>

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

const cities = ['Quito', 'Guayaquil', 'Cuenca']

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
