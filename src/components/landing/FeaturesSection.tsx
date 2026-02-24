'use client'

import { AlertCircle, Clock, FileCheck, MapPin, Zap, Users } from 'lucide-react'
import Card, { CardContent, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: AlertCircle,
    title: 'Alertas en Tiempo Real',
    description: 'Notificaciones automáticas sobre vencimientos y cambios en la regulación vehicular',
    color: 'from-vyntra-danger/20 to-vyntra-danger/10',
    iconColor: 'text-vyntra-danger',
    borderColor: 'border-vyntra-danger/40'
  },
  {
    icon: Clock,
    title: 'Agendamiento Inteligente',
    description: 'Reserva tu cita en centros de trámite sin esperas innecesarias',
    color: 'from-vyntra-warning/20 to-vyntra-warning/10',
    iconColor: 'text-vyntra-warning',
    borderColor: 'border-vyntra-warning/40'
  },
  {
    icon: FileCheck,
    title: 'Documentos Guiados',
    description: 'Instrucciones paso a paso para cada trámite que necesites realizar',
    color: 'from-vyntra-success/20 to-vyntra-success/10',
    iconColor: 'text-vyntra-success',
    borderColor: 'border-vyntra-success/40'
  },
  {
    icon: MapPin,
    title: 'Mapas de Centros',
    description: 'Ubica todos los centros de registro y servicios vehiculares cercanos',
    color: 'from-vyntra-brand/20 to-vyntra-brand/10',
    iconColor: 'text-vyntra-brand',
    borderColor: 'border-vyntra-brand/40'
  },
  {
    icon: Zap,
    title: 'Asesoría Legal',
    description: 'Acceso a expertos para resolver dudas sobre regulaciones y derechos',
    color: 'from-vyntra-brand/15 to-vyntra-structural/20',
    iconColor: 'text-vyntra-structural',
    borderColor: 'border-vyntra-structural/40'
  },
  {
    icon: Users,
    title: 'Comunidad Conectada',
    description: 'Comparte experiencias y aprende de otros propietarios de vehículos',
    color: 'from-vyntra-brand/15 to-vyntra-brand/25',
    iconColor: 'text-vyntra-brand',
    borderColor: 'border-vyntra-brand/40'
  }
]

export default function FeaturesSection() {
  return (
    <section id="funciona" className="relative py-24 px-4 sm:px-6 lg:px-8 section-muted">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-vyntra-brand/30 rounded-full mb-4">
            <span className="w-2 h-2 bg-vyntra-brand rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-slate-900">Características Principales</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-ink">
            Todo lo que necesitas en un lugar
          </h2>
          <p className="text-lg text-ink-muted max-w-2xl mx-auto">
            Resuelve todos tus trámites vehiculares con herramientas diseñadas específicamente para los conductores de Quito
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                variant="default"
                className={cn(
                  'group cursor-pointer h-full card-premium-light !rounded-[14px]',
                  'hover:scale-105 hover:shadow-2xl',
                  feature.borderColor
                )}
              >
                <CardContent className="space-y-4">
                  {/* Icon Container */}
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300',
                    'bg-slate-100 border border-slate-300 group-hover:scale-110 group-hover:shadow-lg'
                  )}>
                    <Icon className={cn('w-7 h-7', feature.iconColor)} />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <CardTitle className="text-slate-900">{feature.title}</CardTitle>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect - Bottom Border */}
                  <div className="pt-2 mt-auto">
                    <div className={cn(
                      "h-0.5 w-0 bg-gradient-to-r",
                      feature.borderColor.replace('border-', 'from-').replace('/40', '').replace('to-', ' to-'),
                      "group-hover:w-full transition-all duration-300"
                    )} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-white border border-vyntra-brand/30 rounded-2xl">
            <p className="text-slate-600 mb-3">¿Listo para simplificar tus trámites?</p>
            <a href="/registro" className="inline-flex items-center gap-2 px-6 py-3 btn-primary rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              Crear una Cuenta Ahora
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
