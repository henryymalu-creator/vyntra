'use client'

import { useState } from 'react'
import Navbar from '@/components/shared/Navbar'
import Card from '@/components/ui/Card'
import { Navigation, ExternalLink, Check } from 'lucide-react'

const mapFilters = [
  { id: 'all', label: 'Todos', description: 'Ver todos los mapas' },
  { id: 'pico-placa', label: 'Pico Y Placa', description: 'Restricción vehicular' },
  { id: 'parroquias', label: 'Parroquias', description: 'Zonas administrativas' },
  { id: 'judiciales', label: 'Unidades Judiciales', description: 'Jurisdicciones' },
]

const embeddedMaps = [
  {
    id: 'pico-placa',
    icon: '🚦',
    title: 'Restricción Vehicular Pico y Placa - DMQ',
    description: 'Zonas de restricción vehicular en Quito según Resolución AQ033-2021',
    embedUrl: 'https://www.google.com/maps/d/embed?mid=1ZEtTyI3ecSzRRMugah_gtuxJMXAkTOwm&ehbc=2E312F',
    source: 'AMT',
    author: 'Mgtr. Henry W. Zavala',
    date: '15/12/2021',
    email: 'henrywzamt@gmail.com',
    resolution: 'RES. AQ033-2021033',
    category: 'restriccion',
    description2: 'Con base a la reforma de la RESOLUCIÓN AQ019-2021 contenida en la RESOLUCIÓN AQ033-2021, se establece el perímetro de restricción, por día y placa en el Distrito Metropolitano de Quito.',
    filterId: 'pico-placa',
  },
  {
    id: 'zonales',
    icon: '🏙️',
    title: 'Parroquias - Administración Zonal - SIAT',
    description: 'Las 9 zonas administrativas del Municipio de Quito',
    embedUrl: 'https://www.google.com/maps/d/embed?mid=1HM7cqGL1Q0oRj_obNzjcJQIUzSaZeSw&ehbc=2E312F',
    source: 'Municipio DMQ',
    author: 'Mgtr. Henry W. Zavala',
    date: '15/12/2021',
    email: 'henrywzamt@gmail.com',
    category: 'administrativa',
    filterId: 'parroquias',
  },
  {
    id: 'judiciales',
    icon: '⚖️',
    title: 'Mapa de Jurisdicción de Unidades Judiciales',
    description: 'Jurisdicciones de las Unidades Judiciales de Tránsito por sector',
    embedUrl: 'https://www.google.com/maps/d/embed?mid=1HQOIj7WsXITktP_jFxQqq7OFmt0Kl6c7&ehbc=2E312F',
    source: 'Función Judicial',
    author: 'Mgtr. Henry W. Zavala',
    date: '2024',
    email: 'henrywzamt@gmail.com',
    resolution: 'Resolución Nro. 051-2017 - Consejo de Judicatura',
    category: 'judicial',
    filterId: 'judiciales',
  },
]

export default function MapasPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredMaps = activeFilter === 'all' 
    ? embeddedMaps 
    : embeddedMaps.filter(map => map.filterId === activeFilter)

  return (
    <div className="min-h-screen bg-vyntra-bg-main">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-ink">
            Mapas <span className="text-vyntra-brand">Oficiales de Tránsito</span>
          </h1>
          <p className="text-xl text-ink-muted max-w-3xl mx-auto mb-8">
            Información geográfica oficial verificada para el Distrito Metropolitano de Quito
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-vyntra-success/10 border border-vyntra-success/20 rounded-lg text-sm text-vyntra-success">
            <Navigation className="w-4 h-4 mr-2" />
            Mapas oficiales verificados
          </div>
        </div>

        {/* Filters */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-3 justify-center">
            {mapFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`group px-4 py-3 rounded-xl font-medium transition flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-vyntra-brand text-white shadow-lg shadow-vyntra-brand/30'
                    : 'bg-white text-ink border border-vyntra-border hover:border-vyntra-brand/50 hover:shadow-md'
                }`}
              >
                {activeFilter === filter.id && (
                  <Check className="w-5 h-5" />
                )}
                <div className="text-left">
                  <div className="font-semibold text-sm md:text-base">{filter.label}</div>
                  <div className={`text-xs ${activeFilter === filter.id ? 'text-white/80' : 'text-ink-muted'}`}>
                    {filter.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mapas Embebidos */}
        <div className="space-y-12 mb-16">
          {filteredMaps.map((map) => (
            <Card 
              key={map.id} 
              className="overflow-hidden border-2 border-vyntra-border shadow-[0_15px_40px_rgba(15,31,61,0.12)] hover:shadow-[0_20px_50px_rgba(15,31,61,0.16)] transition-all duration-300"
            >
              {/* Header */}
              <div className="p-6 sm:p-8 border-b border-vyntra-border bg-white">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="text-4xl flex-shrink-0">{map.icon}</div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-ink">{map.title}</h2>
                      <p className="text-ink-muted mb-2">{map.description}</p>
                      {map.description2 && (
                        <p className="text-sm text-ink-muted mb-3">{map.description2}</p>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-vyntra-brand/10 text-vyntra-brand px-3 py-1 rounded-full font-semibold">
                          Fuente: {map.source}
                        </span>
                        {map.resolution && (
                          <span className="bg-vyntra-success/10 text-vyntra-success px-3 py-1 rounded-full">
                            {map.resolution}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa Embebido */}
              <div className="relative w-full h-[500px] md:h-[600px] bg-vyntra-bg-main border-b-2 border-vyntra-border">
                <iframe
                  src={map.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={map.title}
                />
              </div>

              {/* Footer */}
              <div className="p-4 bg-vyntra-bg-main border-b border-vyntra-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-ink-muted">
                  <div className="flex flex-col gap-1">
                    <span>Elaborado por: {map.author}</span>
                    <span>Fecha: {map.date}</span>
                  </div>
                  <a 
                    href={`mailto:${map.email}`}
                    className="text-vyntra-brand hover:text-vyntra-brand/80 transition font-semibold"
                  >
                    {map.email}
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 bg-vyntra-brand/5 border-t border-vyntra-brand/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-ink">
                      {map.id === 'pico-placa' && '¿Te multaron por pico y placa? Podemos ayudarte a revisar tu caso y asesorarte legalmente.'}
                      {map.id === 'zonales' && '¿Necesitas gestionar trámites en tu zona? Encuentra la información que necesitas.'}
                      {map.id === 'judiciales' && '¿Tienes un proceso judicial de tránsito? Conoce tu jurisdicción y obtén orientación legal.'}
                    </p>
                  </div>
                  <a
                    href="/contacto"
                    className="whitespace-nowrap bg-vyntra-brand text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition text-sm inline-flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Consultar
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info */}
        <Card className="p-8 text-center bg-vyntra-brand/5 border border-vyntra-brand/20 shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
          <h3 className="text-2xl font-bold mb-4 text-ink">¿Necesitas más información?</h3>
          <p className="text-ink-muted mb-6 max-w-2xl mx-auto">
            Estos mapas son de elaboración propia basados en fuentes oficiales verificadas. 
            Para consultas sobre multas, trámites o asesoría legal, contáctanos.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center px-8 py-3 bg-vyntra-brand hover:opacity-90 text-white rounded-xl font-semibold transition"
          >
            Contactar
          </a>
        </Card>
      </div>
    </div>
  )
}
