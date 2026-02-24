'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/shared/Navbar'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { 
  Shield, 
  Bell, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  Map,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Scale
} from 'lucide-react'

export default function LandingPage() {
  const [plate, setPlate] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (plate.length >= 6) {
      window.location.href = `/registro?plate=${plate.toUpperCase()}`
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#111827]">
      <Navbar />

      {/* Hero Section */}
      <section className="hero relative min-h-[70vh] flex items-center overflow-hidden pt-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-1.5 bg-white/20 border border-white/30 rounded-full text-sm font-medium text-white mb-8">
              <span className="w-2 h-2 bg-white rounded-full mr-2" />
              Quito, Ecuador
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-tight mb-6 text-white">
              Tu vehículo tiene un estado legal.
              <br />
              Nosotros lo monitoreamos por ti.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              Monitoreo legal automático, alertas críticas y asesoría especializada para mantener tu vehículo al día.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/registro">
                <Button size="lg" className="group">
                  Registrar mi vehículo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/tramites">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white">
                  Consultar trámites
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="funciona" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Cómo funciona?</h2>
            <p className="text-ink-muted max-w-2xl mx-auto">
              Protección vehicular inteligente en 3 pasos simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center animate-slide-up">
              <div className="w-16 h-16 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-vyntra-brand" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Registra tu placa</h3>
              <p className="text-ink-muted leading-relaxed">
                Ingresa la placa de tu vehículo de forma segura y privada
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-2xl flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-vyntra-brand" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Recibe alertas automáticas</h3>
              <p className="text-ink-muted leading-relaxed">
                Te notificamos sobre vencimientos, restricciones y normativa relevante
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-vyntra-brand" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Actúa antes de pagar multas</h3>
              <p className="text-ink-muted leading-relaxed">
                Evita sanciones con información anticipada y acciones preventivas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Centro de Información */}
      <section id="informacion" className="py-24 section-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Centro de Información</h2>
            <p className="text-ink-muted max-w-2xl mx-auto">
              Todo lo que necesitas saber sobre tránsito en Quito
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoCards.map((card, index) => (
              <Link href={card.href} key={index}>
                <Card hover className="h-full">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-vyntra-brand/10 rounded-xl flex items-center justify-center">
                      <card.icon className="w-6 h-6 text-vyntra-brand" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-ink-muted mb-4">{card.description}</p>
                  <div className="inline-flex items-center text-sm font-medium text-vyntra-brand">
                    {card.cta}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mapas */}
      <section id="mapas" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Todo Quito vial en un solo mapa
            </h2>
            <p className="text-ink-muted max-w-2xl mx-auto">
              Visualiza restricciones, zonas y centros de atención geo-referenciados
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="aspect-video bg-white flex items-center justify-center border border-vyntra-border">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-vyntra-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Map className="w-10 h-10 text-vyntra-brand" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Mapa interactivo de Quito</h3>
                <p className="text-ink-muted mb-6 max-w-md mx-auto">
                  Visualiza pico y placa, administraciones zonales, centros AMT y más con 700K+ visualizaciones
                </p>
                <Link href="/mapas">
                  <Button>
                    <MapPin className="w-5 h-5 mr-2" />
                    Explorar mapas
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Defensa Legal */}
      <section id="defensa" className="py-24 section-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 lg:p-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 bg-vyntra-brand/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Scale className="w-8 h-8 text-vyntra-brand" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    ¿Tienes un problema legal de tránsito?
                  </h2>
                  <p className="text-lg text-ink-muted leading-relaxed">
                    Conectamos con abogados especializados en derecho de tránsito. Asesoría profesional para impugnaciones, recursos legales y defensa en procesos judiciales.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {legalServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-vyntra-brand flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">{service.title}</h4>
                      <p className="text-sm text-ink-muted">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/defensa-legal">
                <Button size="lg" className="group">
                  Solicitar asesoría especializada
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium */}
      <section id="premium" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-full text-sm font-medium text-vyntra-brand mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Próximamente en App
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Beneficios Premium</h2>
            <p className="text-ink-muted max-w-2xl mx-auto">
              Protección vehicular completa con tecnología de punta
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 lg:p-12">
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-vyntra-brand/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-vyntra-brand" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">{feature.title}</h4>
                      <p className="text-sm text-ink-muted">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" variant="secondary" fullWidth>
                Próximamente en App
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1B3A6F] rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Empieza ahora sin costo
              </h2>
              <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Registra tu vehículo y recibe alertas inteligentes. Sin tarjeta de crédito.
              </p>

              <form onSubmit={handleRegister} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value.toUpperCase())}
                    placeholder="Tu placa (ej: ABC-1234)"
                    className="flex-1 px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                    maxLength={8}
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-[#1B3A6F] font-bold rounded-xl hover:bg-white/95 transition whitespace-nowrap shadow-[0_10px_30px_rgba(15,31,61,0.06)]"
                  >
                    Registrar →
                  </button>
                </div>
                <p className="text-sm text-white/90 mt-4 font-medium">
                  ✓ Gratis • ✓ Sin tarjeta • ✓ Cancela cuando quieras
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Data
const infoCards = [
  {
    icon: AlertCircle,
    title: 'Restricción vehicular',
    description: 'Pico y placa actualizado',
    cta: 'Ver guía completa',
    href: '/pico-placa',
  },
  {
    icon: Calendar,
    title: 'Calendario matrícula',
    description: 'Fechas según último dígito',
    cta: 'Activar alertas',
    href: '/calendario',
  },
  {
    icon: DollarSign,
    title: 'Multas y valores',
    description: 'Tarifario completo',
    cta: 'Consultar valores',
    href: '/tramites',
  },
  {
    icon: CheckCircle,
    title: 'RTV',
    description: 'Revisión técnica vehicular',
    cta: 'Ver requisitos',
    href: '/tramites',
  },
  {
    icon: MapPin,
    title: 'Centros AMT',
    description: 'Ubicaciones y horarios',
    cta: 'Ver en mapa',
    href: '/mapas',
  },
  {
    icon: FileText,
    title: 'Tarifarios',
    description: 'Costos de trámites',
    cta: 'Ver detalle',
    href: '/tramites',
  },
  {
    icon: Map,
    title: 'Mapas interactivos',
    description: 'Zonas, rutas y restricciones',
    cta: 'Explorar mapas',
    href: '/mapas',
  },
  {
    icon: Bell,
    title: 'Notificaciones',
    description: 'Alertas inteligentes',
    cta: 'Activar Premium',
    href: '/#premium',
  },
]

const legalServices = [
  { title: 'Impugnaciones', description: 'Multas injustas o incorrectas' },
  { title: 'Recursos', description: 'Apelaciones y revisiones' },
  { title: 'Defensa', description: 'Representación legal' },
]

const premiumFeatures = [
  {
    icon: Bell,
    title: 'Alertas anticipadas',
    description: 'Notificaciones antes de vencimientos y restricciones',
  },
  {
    icon: FileText,
    title: 'Historial del vehículo',
    description: 'Registro completo de trámites y pagos',
  },
  {
    icon: DollarSign,
    title: 'Simulador de multas',
    description: 'Calcula costos antes de que ocurran',
  },
  {
    icon: Sparkles,
    title: 'IA que traduce normativa',
    description: 'Explicaciones claras de leyes complejas',
  },
]
