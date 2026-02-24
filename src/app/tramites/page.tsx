'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/shared/Navbar'
import Card, { CardContent, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { 
  Search, 
  FileText, 
  DollarSign, 
  Clock, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  X,
  Download,
  ArrowRight,
  HelpCircle
} from 'lucide-react'

export default function TramitesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')
  const [selectedTramite, setSelectedTramite] = useState<typeof tramites[0] | null>(null)

  const allItems = [...tramites, ...normativaCards]

  const filteredItems = allItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = 
      selectedCategory === 'todos' || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-vyntra-bg-main">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-full">
            <FileText className="w-4 h-4 text-vyntra-brand" />
            <span className="text-sm font-semibold text-ink">Trámites y Normativa</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-ink">
            Trámites y Guías Legales
          </h1>
          
          <p className="text-xl text-ink-muted max-w-3xl mx-auto">
            Información completa sobre todos los trámites vehiculares y normativa legal en Quito. Haz click en cualquier tarjeta para más información.
          </p>
        </div>

        {/* Search */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ink-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar trámites o normativa..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-vyntra-border rounded-xl text-ink placeholder-ink-muted focus:outline-none focus:ring-2 focus:ring-vyntra-brand focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                selectedCategory === category.value
                  ? 'bg-vyntra-brand text-white'
                  : 'bg-white text-ink hover:border-vyntra-border border border-vyntra-border/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => {
            // Si es tarjeta de normativa, renderiza con Link
            if ('linkTo' in item && item.linkTo) {
              return (
                <Link key={item.id} href={item.linkTo}>
                  <Card className="h-full hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
                    {/* Color Header */}
                    <div className={`h-2 w-full ${item.colorHeader}`} />
                    
                    {/* Content */}
                    <CardContent className="p-6 space-y-4">
                      {/* Icon + Title */}
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${item.colorBg}`}>
                          <FileText className={`w-6 h-6 ${item.colorIcon}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-ink">{item.name}</h3>
                          <p className="text-sm text-ink-muted">{item.description}</p>
                        </div>
                      </div>

                      {/* Badge Category */}
                      <div className="flex flex-wrap gap-2">
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-lg text-xs">
                          <span className="text-vyntra-brand font-semibold">{item.categoryLabel}</span>
                        </div>
                        {'readTime' in item && (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-lg text-xs">
                            <Clock className="w-3.5 h-3.5 text-vyntra-brand" />
                            <span className="text-vyntra-brand font-semibold">{item.readTime}</span>
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-vyntra-brand text-sm font-semibold pt-2 group">
                        Leer guía completa
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            }

            // Si es tarjeta de trámite, renderiza con modal
            return (
              <button
                key={item.id}
                onClick={() => setSelectedTramite(item as typeof tramites[0])}
                className="text-left"
              >
                <Card className="h-full hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-vyntra-border shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
                  {/* Color Header */}
                  <div className={`h-2 w-full ${item.colorHeader}`} />
                  
                  {/* Content */}
                  <CardContent className="p-6 space-y-4">
                    {/* Icon + Title */}
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${item.colorBg}`}>
                        <FileText className={`w-6 h-6 ${item.colorIcon}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-ink">{item.name}</h3>
                        <p className="text-sm text-ink-muted">{item.description}</p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      {'cost' in item && item.cost && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-vyntra-success/10 border border-vyntra-success/20 rounded-lg text-xs">
                          <DollarSign className="w-3.5 h-3.5 text-vyntra-success" />
                          <span className="text-vyntra-success font-semibold">${item.cost}</span>
                        </div>
                      )}
                      {'duration' in item && item.duration && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-lg text-xs">
                          <Clock className="w-3.5 h-3.5 text-vyntra-brand" />
                          <span className="text-vyntra-brand font-semibold">{item.duration}</span>
                        </div>
                      )}
                      {'location' in item && item.location && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-lg text-xs">
                          <MapPin className="w-3.5 h-3.5 text-vyntra-brand" />
                          <span className="text-vyntra-brand font-semibold text-xs">{item.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Requirements Preview */}
                    {'requirements' in item && item.requirements && (
                      <div className="pt-2 border-t border-vyntra-border">
                        <p className="text-xs text-ink-muted font-semibold mb-2">Requisitos principales:</p>
                        <ul className="space-y-1">
                          {item.requirements.slice(0, 2).map((req, idx) => (
                            <li key={idx} className="text-xs text-ink-muted flex items-start gap-2">
                              <span className="text-vyntra-brand">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                          {item.requirements.length > 2 && (
                            <li className="text-xs text-vyntra-brand font-semibold">+{item.requirements.length - 2} más</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-vyntra-brand text-sm font-semibold pt-2 group">
                      Ver detalles
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </button>
            )
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-white border border-vyntra-border rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-ink-muted" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-ink">No se encontraron resultados</h3>
            <p className="text-ink-muted">
              Intenta con otros términos de búsqueda o cambia el filtro
            </p>
          </div>
        )}

        {/* Modal/Detail View (Solo para Trámites) */}
        {selectedTramite && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className={`p-6 ${selectedTramite.colorBg} border-b border-vyntra-border`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 bg-white/20 border border-white/30 rounded-lg mb-3`}>
                      <span className="w-2 h-2 bg-current rounded-full" />
                      <span className="text-sm font-medium text-ink">{selectedTramite.category.toUpperCase()}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-ink mb-2">{selectedTramite.name}</h2>
                    <p className="text-ink-muted">{selectedTramite.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedTramite(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition"
                  >
                    <X className="w-6 h-6 text-ink" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-8 space-y-8">
                {/* Quick Info */}
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedTramite.cost && (
                    <div className="p-4 bg-vyntra-success/5 border border-vyntra-success/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-5 h-5 text-vyntra-success" />
                        <span className="text-xs font-semibold text-ink-muted">COSTO</span>
                      </div>
                      <p className="text-2xl font-bold text-vyntra-success">${selectedTramite.cost}</p>
                    </div>
                  )}
                  {selectedTramite.duration && (
                    <div className="p-4 bg-vyntra-brand/5 border border-vyntra-brand/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-5 h-5 text-vyntra-brand" />
                        <span className="text-xs font-semibold text-ink-muted">DURACIÓN</span>
                      </div>
                      <p className="text-2xl font-bold text-vyntra-brand">{selectedTramite.duration}</p>
                    </div>
                  )}
                  {selectedTramite.location && (
                    <div className="p-4 bg-vyntra-brand/5 border border-vyntra-brand/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-5 h-5 text-vyntra-brand" />
                        <span className="text-xs font-semibold text-ink-muted">UBICACIÓN</span>
                      </div>
                      <p className="text-lg font-bold text-ink">{selectedTramite.location}</p>
                    </div>
                  )}
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center text-ink">
                    <CheckCircle className="w-6 h-6 text-vyntra-brand mr-3" />
                    Requisitos Obligatorios
                  </h3>
                  <ul className="space-y-3">
                    {selectedTramite.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-ink-muted">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-vyntra-brand/10 text-vyntra-brand text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Notes */}
                {selectedTramite.notes && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-900">{selectedTramite.notes}</p>
                  </div>
                )}

                {/* CTA */}
                <div className="flex gap-3 pt-4">
                  <Button variant="primary" size="lg" className="flex-1 gap-2">
                    <Download className="w-5 h-5" />
                    Descargar PDF
                  </Button>
                  <button
                    onClick={() => setSelectedTramite(null)}
                    className="px-6 py-3 border border-vyntra-border rounded-xl font-semibold text-ink hover:bg-vyntra-bg-main transition"
                  >
                    Cerrar
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Disclaimer */}
        <Card className="p-6 bg-blue-50 border border-blue-200 shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <strong className="font-bold">Importante:</strong> La información presentada es referencial y puede estar sujeta a cambios. Para datos oficiales y actualizados, consulta directamente en los portales de la AMT, ANT o las instituciones competentes.
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

const categories = [
  { value: 'todos', label: 'Todos' },
  { value: 'matricula', label: 'Matrícula' },
  { value: 'licencia', label: 'Licencia' },
  { value: 'rtv', label: 'RTV' },
  { value: 'multas', label: 'Multas' },
  { value: 'normativa', label: 'Normativa' },
  { value: 'otros', label: 'Otros' },
]

const tramites = [
  {
    id: 1,
    name: 'Matriculación Vehicular',
    description: 'Registro anual obligatorio para vehículos',
    category: 'matricula',
    categoryLabel: 'Trámite',
    colorHeader: 'bg-blue-500',
    colorBg: 'bg-blue-100',
    colorIcon: 'text-blue-600',
    cost: 34.5,
    duration: '30 minutos',
    location: 'AMT o en línea',
    requirements: [
      'Cédula de identidad o pasaporte',
      'Original y copia de la matrícula anterior',
      'Inspección vehicular al día (RTV)',
      'Certificado de no adeudar impuestos prediales',
      'Pago de impuestos municipales',
    ],
    notes: 'El pago varía según el avalúo del vehículo y la zona',
  },
  {
    id: 2,
    name: 'Revisión Técnica Vehicular (RTV)',
    description: 'Inspección obligatoria del estado del vehículo',
    category: 'rtv',
    categoryLabel: 'Trámite',
    colorHeader: 'bg-orange-500',
    colorBg: 'bg-orange-100',
    colorIcon: 'text-orange-600',
    cost: 18,
    duration: '45 minutos',
    location: 'Centros RTV autorizados',
    requirements: [
      'Cédula de identidad del propietario',
      'Matrícula vigente',
      'Vehículo limpio y en buen estado',
      'Documentos del vehículo',
    ],
    notes: 'Debe realizarse antes de matricular. Válida por 1 año para vehículos particulares',
  },
  {
    id: 3,
    name: 'Licencia de Conducir Tipo B',
    description: 'Licencia para conducir vehículos livianos',
    category: 'licencia',
    categoryLabel: 'Trámite',
    colorHeader: 'bg-green-500',
    colorBg: 'bg-green-100',
    colorIcon: 'text-green-600',
    cost: 32,
    duration: '2-3 semanas',
    location: 'ANT',
    requirements: [
      'Ser mayor de 18 años',
      'Cédula de identidad',
      'Certificado de grupo sanguíneo',
      'Certificado médico',
      'Certificado psicológico',
      'Aprobar examen teórico',
      'Aprobar examen práctico',
    ],
    notes: 'Válida por 5 años. Requiere curso de capacitación previo',
  },
  {
    id: 4,
    name: 'Renovación de Licencia',
    description: 'Actualización de licencia de conducir vencida',
    category: 'licencia',
    categoryLabel: 'Trámite',
    colorHeader: 'bg-emerald-500',
    colorBg: 'bg-emerald-100',
    colorIcon: 'text-emerald-600',
    cost: 32,
    duration: '1-2 semanas',
    location: 'ANT',
    requirements: [
      'Cédula de identidad',
      'Licencia anterior (si la tienes)',
      'Certificado de grupo sanguíneo',
      'Certificado médico actualizado',
      'No tener multas pendientes',
    ],
    notes: 'Si la licencia expiró hace más de 2 años, debes rendir examen nuevamente',
  },
  {
    id: 5,
    name: 'Pago de Multas de Tránsito',
    description: 'Cancelación de infracciones de tránsito',
    category: 'multas',
    categoryLabel: 'Trámite',
    colorHeader: 'bg-red-500',
    colorBg: 'bg-red-100',
    colorIcon: 'text-red-600',
    duration: '15 minutos',
    location: 'AMT, bancos o en línea',
    requirements: [
      'Cédula de identidad',
      'Número de citación o placa del vehículo',
      'Medio de pago (efectivo, tarjeta, transferencia)',
    ],
    notes: 'Las multas aumentan su valor con el tiempo. Págalas a tiempo para evitar recargos',
  },
  {
    id: 6,
    name: 'Traspaso de Dominio',
    description: 'Cambio de propietario del vehículo',
    category: 'otros',
    categoryLabel: 'Trámite',
    colorHeader: 'bg-purple-500',
    colorBg: 'bg-purple-100',
    colorIcon: 'text-purple-600',
    cost: 85,
    duration: '1-2 días',
    location: 'ANT',
    requirements: [
      'Cédulas de vendedor y comprador',
      'Matrícula vigente',
      'Contrato de compra-venta (notariado)',
      'Certificado de no tener multas',
      'Inspección vehicular (RTV) vigente',
      'Pago de impuestos',
    ],
    notes: 'Ambas partes deben estar presentes o tener poder notariado',
  },
  {
    id: 7,
    name: 'Cambio de Características',
    description: 'Modificación de datos del vehículo',
    category: 'otros',
    categoryLabel: 'Trámite',
    colorHeader: 'bg-indigo-500',
    colorBg: 'bg-indigo-100',
    colorIcon: 'text-indigo-600',
    cost: 45,
    duration: '1-2 días',
    location: 'ANT',
    requirements: [
      'Cédula del propietario',
      'Matrícula vigente',
      'Documentos que justifiquen el cambio',
      'Inspección vehicular si aplica',
    ],
    notes: 'Aplica para cambios de color, motor, carrocería, etc.',
  },
  {
    id: 8,
    name: 'Duplicado de Matrícula',
    description: 'Obtención de copia de matrícula extraviada o dañada',
    category: 'matricula',
    categoryLabel: 'Trámite',
    colorHeader: 'bg-cyan-500',
    colorBg: 'bg-cyan-100',
    colorIcon: 'text-cyan-600',
    cost: 12,
    duration: '30 minutos',
    location: 'AMT',
    requirements: [
      'Cédula de identidad',
      'Denuncia por pérdida (si aplica)',
      'Documentos del vehículo',
    ],
    notes: 'En caso de robo, presentar denuncia en la Fiscalía',
  },
]

// Tarjetas de Normativa (con enlaces a páginas dedicadas)
const normativaCards = [
  {
    id: 'norm-1',
    name: 'Matrícula Vehicular',
    description: 'Guía legal completa sobre renovación, cálculo y vencimiento',
    category: 'normativa',
    categoryLabel: 'Guía Legal',
    colorHeader: 'bg-blue-600',
    colorBg: 'bg-blue-50',
    colorIcon: 'text-blue-600',
    readTime: '8 min',
    linkTo: '/normativa/matricula',
  },
  {
    id: 'norm-2',
    name: 'Baja Vehicular',
    description: 'Proceso completo para dar de baja tu vehículo legalmente',
    category: 'normativa',
    categoryLabel: 'Guía Legal',
    colorHeader: 'bg-red-600',
    colorBg: 'bg-red-50',
    colorIcon: 'text-red-600',
    readTime: '6 min',
    linkTo: '/normativa/baja-vehicular',
  },
  {
    id: 'norm-3',
    name: 'Prescripción de Multas',
    description: 'Cómo saber si una multa prescribió y recuperar tu dinero',
    category: 'normativa',
    categoryLabel: 'Guía Legal',
    colorHeader: 'bg-yellow-600',
    colorBg: 'bg-yellow-50',
    colorIcon: 'text-yellow-600',
    readTime: '7 min',
    linkTo: '/normativa/prescripcion-multas',
  },
  {
    id: 'norm-4',
    name: 'Patios de Retención',
    description: 'Qué hacer si tu vehículo está en un patio y cómo recuperarlo',
    category: 'normativa',
    categoryLabel: 'Guía Legal',
    colorHeader: 'bg-orange-600',
    colorBg: 'bg-orange-50',
    colorIcon: 'text-orange-600',
    readTime: '5 min',
    linkTo: '/normativa/patios-retencion',
  },
  {
    id: 'norm-5',
    name: 'Parte Propio (Choque)',
    description: 'Guía legal para diligenciar tu parte propio sin problemas',
    category: 'normativa',
    categoryLabel: 'Guía Legal',
    colorHeader: 'bg-purple-600',
    colorBg: 'bg-purple-50',
    colorIcon: 'text-purple-600',
    readTime: '6 min',
    linkTo: '/normativa/parte-propio',
  },
  {
    id: 'norm-6',
    name: 'Libertad Vehicular',
    description: 'Requisitos para obtener tu certificado de libertad vehicular',
    category: 'normativa',
    categoryLabel: 'Guía Legal',
    colorHeader: 'bg-green-600',
    colorBg: 'bg-green-50',
    colorIcon: 'text-green-600',
    readTime: '4 min',
    linkTo: '/normativa/libertad-vehicular',
  },
  {
    id: 'norm-7',
    name: 'Chatarización Vehicular',
    description: 'Proceso legal para chatarizar un vehículo inservible',
    category: 'normativa',
    categoryLabel: 'Guía Legal',
    colorHeader: 'bg-slate-600',
    colorBg: 'bg-slate-50',
    colorIcon: 'text-slate-600',
    readTime: '7 min',
    linkTo: '/normativa/chatarizacion',
  },
  {
    id: 'norm-8',
    name: 'Procesos Judiciales Tránsito',
    description: 'Cómo defenderte en juicio de asuntos de tránsito',
    category: 'normativa',
    categoryLabel: 'Guía Legal',
    colorHeader: 'bg-indigo-600',
    colorBg: 'bg-indigo-50',
    colorIcon: 'text-indigo-600',
    readTime: '10 min',
    linkTo: '/normativa/procesos-judiciales',
  },
]
