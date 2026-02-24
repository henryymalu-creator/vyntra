'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useVehicles } from '@/hooks/useVehicles'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { 
  Car, 
  AlertCircle, 
  Calendar, 
  CheckCircle, 
  Plus,
  Bell,
  MapPin,
  TrendingUp
} from 'lucide-react'
import { getPicoPlacaToday, getDaysUntilMatricula, formatDate } from '@/lib/utils'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const { vehicles, loading: vehiclesLoading } = useVehicles()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
    }
  }, [user, authLoading, router])

  if (authLoading || vehiclesLoading) {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-vyntra-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-ink-muted">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const featuredVehicle = vehicles[0]

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-ink">
            ¡Hola, {user.displayName}! 👋
          </h1>
          <p className="text-ink-muted">
            Aquí está el resumen de tu protección vehicular
          </p>
        </div>

        {vehicles.length === 0 ? (
          /* No vehicles state */
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-vyntra-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Car className="w-10 h-10 text-vyntra-brand" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No tienes vehículos registrados</h2>
            <p className="text-ink-muted mb-8 max-w-md mx-auto">
              Registra tu primer vehículo para comenzar a recibir alertas y proteger tu bolsillo
            </p>
            <Link href="/registro?step=2">
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Registrar mi primer vehículo
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-ink-muted mb-1">Vehículos</p>
                      <p className="text-3xl font-bold text-ink">{vehicles.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-vyntra-brand/10 rounded-xl flex items-center justify-center border border-vyntra-brand/20">
                      <Car className="w-6 h-6 text-vyntra-brand" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-ink-muted mb-1">Alertas activas</p>
                      <p className="text-3xl font-bold text-ink">3</p>
                      <p className="text-xs text-ink-muted mt-1">de 5 máximo</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center border border-yellow-500/20">
                      <Bell className="w-6 h-6 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-ink-muted mb-1">Trámites al día</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-vyntra-success">✓</p>
                        <span className="text-xs text-vyntra-success/80">Todo en orden</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-vyntra-success/10 rounded-xl flex items-center justify-center border border-vyntra-success/20">
                      <CheckCircle className="w-6 h-6 text-vyntra-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-ink-muted mb-1">Ahorrado este año</p>
                      <p className="text-3xl font-bold text-vyntra-success">$1,250</p>
                      <p className="text-xs text-vyntra-success/80 mt-1">en multas evitadas</p>
                    </div>
                    <div className="w-12 h-12 bg-vyntra-success/10 rounded-xl flex items-center justify-center border border-vyntra-success/20">
                      <TrendingUp className="w-6 h-6 text-vyntra-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Featured Vehicle Status */}
            {featuredVehicle && (
              <Card className="bg-white border border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.06)] p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-ink">{featuredVehicle.plate}</h2>
                    <p className="text-ink-muted capitalize">{featuredVehicle.type} • Registrado</p>
                  </div>
                  <div className="px-4 py-2 bg-vyntra-success/10 border border-vyntra-success/20 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 bg-vyntra-success rounded-full" />
                    <span className="text-sm font-medium text-vyntra-success">Al día</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  {/* Pico y Placa */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-vyntra-warning" />
                      <h3 className="font-semibold text-ink">Pico y Placa Hoy</h3>
                    </div>
                    {getPicoPlacaToday(featuredVehicle.lastDigit).restricted ? (
                      <div className="bg-red-500/10 border border-red-500/25 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                          <p className="text-red-600 font-bold">Restringido</p>
                        </div>
                        <p className="text-sm text-red-600/80">
                          {getPicoPlacaToday(featuredVehicle.lastDigit).hours}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-vyntra-success/10 border border-vyntra-success/25 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 bg-vyntra-success rounded-full" />
                          <p className="text-vyntra-success font-bold">Puede circular</p>
                        </div>
                        <p className="text-sm text-vyntra-success/80">Sin restricciones hoy</p>
                      </div>
                    )}
                  </div>

                  {/* Matrícula */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-vyntra-brand" />
                      <h3 className="font-semibold text-ink">Matrícula</h3>
                    </div>
                    <div className="bg-vyntra-brand/10 border border-vyntra-brand/25 rounded-lg p-4">
                      <p className="font-bold text-vyntra-brand mb-1">
                        {getDaysUntilMatricula(featuredVehicle.lastDigit)} días
                      </p>
                      <p className="text-sm text-vyntra-brand/80">Hasta vencimiento</p>
                    </div>
                  </div>

                  {/* RTV */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-vyntra-success" />
                      <h3 className="font-semibold text-ink">Revisión Técnica</h3>
                    </div>
                    <div className="bg-vyntra-success/10 border border-vyntra-success/25 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 bg-vyntra-success rounded-full" />
                        <p className="text-vyntra-success font-bold">Al día</p>
                      </div>
                      <p className="text-sm text-vyntra-success/80">Válido hasta 2026</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Alerts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
                <CardHeader>
                  <CardTitle className="text-ink">Alertas recientes</CardTitle>
                  <CardDescription className="text-ink-muted">Mantente al día con tus vehículos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/25 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-yellow-600 mb-1">Matrícula próximo mes</p>
                        <p className="text-sm text-yellow-700/80">
                          Recuerda renovar tu matrícula en {getDaysUntilMatricula(featuredVehicle?.lastDigit || 0)} días
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-vyntra-brand/10 border border-vyntra-brand/25 rounded-lg">
                      <Bell className="w-5 h-5 text-vyntra-brand flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-ink mb-1">Nueva normativa</p>
                        <p className="text-sm text-ink-muted">
                          Cambios en pico y placa para próximo mes
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/alertas">
                    <Button variant="ghost" className="w-full mt-4">
                      Ver todas las alertas →
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white border border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
                <CardHeader>
                  <CardTitle className="text-ink">Accesos rápidos</CardTitle>
                  <CardDescription className="text-ink-muted">Navega a las secciones más importantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <Link href="/calendario">
                      <button className="w-full flex items-center gap-3 p-4 bg-white hover:bg-slate-50 border border-vyntra-border rounded-lg transition text-left group">
                        <div className="w-10 h-10 bg-vyntra-brand/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-vyntra-brand" />
                        </div>
                        <div>
                          <p className="font-semibold text-ink">Calendario</p>
                          <p className="text-sm text-ink-muted">Ver fechas importantes</p>
                        </div>
                      </button>
                    </Link>

                    <Link href="/mapas">
                      <button className="w-full flex items-center gap-3 p-4 bg-white hover:bg-slate-50 border border-vyntra-border rounded-lg transition text-left group">
                        <div className="w-10 h-10 bg-vyntra-success/10 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-vyntra-success" />
                        </div>
                        <div>
                          <p className="font-semibold text-ink">Mapas</p>
                          <p className="text-sm text-ink-muted">Centros AMT y zonas</p>
                        </div>
                      </button>
                    </Link>

                    <Link href="/tramites">
                      <button className="w-full flex items-center gap-3 p-4 bg-white hover:bg-slate-50 border border-vyntra-border rounded-lg transition text-left group">
                        <div className="w-10 h-10 bg-vyntra-brand/10 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-vyntra-brand" />
                        </div>
                        <div>
                          <p className="font-semibold text-ink">Normativa</p>
                          <p className="text-sm text-ink-muted">Guías y explicadas</p>
                        </div>
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
