import Link from "next/link"
import Section from "@/components/ui/Section"
import HeroSection from "@/components/landing/HeroSection"
import FeaturesSection from "@/components/landing/FeaturesSection"
import LegalConsultationCTA from "@/components/landing/LegalConsultationCTA"
import Card, { CardContent, CardTitle } from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import { MapPin, FileCheck, Users } from 'lucide-react'

export default function Home() {
  const mapsItems = [
    {
      title: "Centros AMT",
      description: "Ubicaciones oficiales de Agencia Metropolitana de Tránsito",
      icon: MapPin
    },
    {
      title: "RTV Certificados",
      description: "Centros de revisión técnica vehicular autorizados",
      icon: FileCheck
    },
    {
      title: "Oficinas ANT",
      description: "Agencia Nacional de Tránsito y servicios relacionados",
      icon: Users
    }
  ]

  return (
    <main className="min-h-screen bg-[#0F1F3D] text-white overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Legal Consultation CTA - Pilar Conversión */}
      <LegalConsultationCTA />

      {/* Maps Section */}
      <Section variant="light" spacing="lg" className="!bg-[#1B3A6F] border-t border-white/10">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Mapas Interactivos
            </h2>
            <p className="text-lg text-white/80">
              Localiza todos los centros de trámite vehicular en Quito con información actualizada y verificada
            </p>
          </div>

          {/* Maps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mapsItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <Card key={idx} variant="default" className="cursor-pointer group maps-card bg-white">
                  <CardContent className="space-y-4 h-full flex flex-col">
                    <div className="w-12 h-12 bg-vyntra-brand/10 border border-vyntra-brand/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-vyntra-brand" />
                    </div>
                    <div>
                      <CardTitle className="text-vyntra-brand">{item.title}</CardTitle>
                      <p className="text-sm text-slate-600 mt-2">{item.description}</p>
                    </div>
                    <div className="mt-auto pt-4">
                      <Link href="/mapas" className="text-sm font-semibold text-vyntra-brand flex items-center gap-2 group/link hover:translate-x-1 transition-transform">
                        Explorar <span>→</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/mapas">
              <Button size="lg" variant="secondary" className="btn-primary">
                Ver Todos los Mapas
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Calendar Section */}
      <Section variant="light" spacing="lg" className="!bg-[#0F1F3D] border-t border-white/10">
        <div className="space-y-8 max-w-3xl mx-auto text-center">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Calendario de Vencimientos
            </h2>
            <p className="text-lg text-white/80">
              Nunca más pierdas una fecha importante de tu vehículo. Recibe recordatorios automáticos en tu correo.
            </p>
          </div>
          
          <Link href="/calendario">
            <Button variant="secondary" size="lg" className="btn-primary">
              Ver Calendario
            </Button>
          </Link>
        </div>
      </Section>

      {/* Disclaimer Section */}
      <Section variant="light" spacing="sm" className="!bg-[#0F1F3D] border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block p-4 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-sm text-white/80 leading-relaxed">
              <strong className="text-white">Nota importante:</strong> Vyntra es una plataforma privada e independiente. No estamos afiliados a AMT, ANT ni a ninguna entidad gubernamental. Toda la información aquí es referencial. Te recomendamos siempre verificar en fuentes oficiales antes de realizar cualquier trámite.
            </p>
          </div>
        </div>
      </Section>
    </main>
  )
}
