'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Shield, MapPinned, CarFront } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="hero relative min-h-screen pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-5">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-full">
              <Zap className="w-4 h-4 text-vyntra-brand" />
              <span className="text-sm font-semibold text-slate-900">
                Movilidad Inteligente para Quito
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white">
                <span className="block">Domina tus</span>
                <span className="block text-white">
                  Trámites Vehiculares
                </span>
              </h1>
              <p className="text-lg text-white/80 max-w-md leading-relaxed">
                Simplifica la gestión de tu vehículo en Quito. Alertas en tiempo real, asesoría legal y navegación inteligente para todos tus trámites.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/registro">
                <Button size="lg" className="w-full sm:w-auto group btn-primary">
                  Registrar mi vehículo gratis
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#funciona">
                <Button variant="outline" size="lg" className="w-full sm:w-auto btn-secondary-light">
                  Ver Cómo Funciona
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border border-slate-300 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-vyntra-success" />
                </div>
                <div>
                  <p className="text-xs text-white/70 uppercase tracking-wide font-semibold">Seguridad</p>
                  <p className="text-sm font-semibold text-white">Datos Protegidos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border border-slate-300 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-vyntra-warning" />
                </div>
                <div>
                  <p className="text-xs text-white/70 uppercase tracking-wide font-semibold">Velocidad</p>
                  <p className="text-sm font-semibold text-white">Procesos Ágiles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:block">
            <div className="bg-white border border-slate-300 rounded-2xl shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-white/90 font-semibold bg-vyntra-brand px-3 py-1 rounded-lg">
                  <MapPinned className="w-5 h-5" />
                  <span className="text-sm">Movilidad Quito</span>
                </div>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md font-medium">En tiempo real</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-vyntra-success/10 to-vyntra-success/5 border border-vyntra-success/30 rounded-xl">
                  <p className="text-xs text-vyntra-brand font-semibold mb-2 uppercase tracking-wide">Mapa AMT</p>
                  <div className="h-20 bg-white rounded-lg border border-slate-300 flex items-center justify-center">
                    <MapPinned className="w-6 h-6 text-slate-400" />
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-vyntra-warning/10 to-vyntra-warning/5 border border-vyntra-warning/30 rounded-xl">
                  <p className="text-xs text-vyntra-brand font-semibold mb-2 uppercase tracking-wide">RTV Cercano</p>
                  <div className="h-20 bg-white rounded-lg border border-slate-300 flex items-center justify-center">
                    <MapPinned className="w-6 h-6 text-slate-400" />
                  </div>
                </div>
                <div className="col-span-2 p-4 bg-vyntra-brand/10 border border-vyntra-brand/40 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-vyntra-brand">Estado del Vehículo</p>
                    <p className="text-xs text-slate-600">Alertas y vencimientos al día</p>
                  </div>
                  <CarFront className="w-8 h-8 text-vyntra-brand" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
