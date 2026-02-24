'use client'

import Link from 'next/link'
import { FileText, ArrowRight, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

const normativeTopics = [
  {
    id: 'matricula',
    title: 'Matrícula Vehicular',
    description: 'Todo lo que necesitas saber sobre renovación, cálculo y tramites',
    category: 'Trámite Obligatorio',
    icon: FileText,
    color: 'blue',
    reads: '8 min',
  },
  {
    id: 'baja-vehicular',
    title: 'Baja Vehicular',
    description: 'Proceso completo para dar de baja tu vehículo de forma legal',
    category: 'Trámite de Baja',
    icon: FileText,
    color: 'red',
    reads: '6 min',
  },
  {
    id: 'prescripcion-multas',
    title: 'Prescripción de Multas',
    description: 'Cómo saber si una multa prescribió y recover tu dinero',
    category: 'Derechos',
    icon: AlertCircle,
    color: 'yellow',
    reads: '7 min',
  },
  {
    id: 'patios-retencion',
    title: 'Patios de Retención',
    description: 'Qué hacer si tu vehículo está en un patio, cómo recuperarlo',
    category: 'Emergencia',
    icon: AlertCircle,
    color: 'orange',
    reads: '5 min',
  },
  {
    id: 'parte-propio',
    title: 'Parte Propio (Choque)',
    description: 'Guía legal para diligenciar tu parte propio sin problemas',
    category: 'Accidentes',
    icon: FileText,
    color: 'purple',
    reads: '6 min',
  },
  {
    id: 'libertad-vehicular',
    title: 'Libertad Vehicular',
    description: 'Requisitos para obtener tu certificado de libertad vehicular',
    category: 'Documentos',
    icon: CheckCircle,
    color: 'green',
    reads: '4 min',
  },
  {
    id: 'chatarización',
    title: 'Chatarización Vehicular',
    description: 'Proceso legal para charatizar un vehículo inservible',
    category: 'Desecho',
    icon: AlertCircle,
    color: 'slate',
    reads: '7 min',
  },
  {
    id: 'procesos-judiciales',
    title: 'Procesos Judiciales Tránsito',
    description: 'Cómo defenderte en juicio de asuntos de tránsito',
    category: 'Legal',
    icon: HelpCircle,
    color: 'indigo',
    reads: '10 min',
  },
]

const colorMap = {
  blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400',
  red: 'from-red-500/20 to-red-500/5 border-red-500/30 text-red-400',
  yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400',
  orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400',
  purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400',
  green: 'from-green-500/20 to-green-500/5 border-green-500/30 text-green-400',
  slate: 'from-slate-500/20 to-slate-500/5 border-slate-500/30 text-slate-400',
  indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 text-indigo-400',
}

export default function NormativaPage() {
  return (
    <main className="min-h-screen bg-vyntra-bg-main text-ink pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-vyntra-brand/10 border border-vyntra-brand/20 rounded-full">
            <FileText className="w-4 h-4 text-vyntra-brand" />
            <span className="text-sm font-semibold text-ink">Información Legal Explicada</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-ink">
            Normativa Explicada para{' '}
            <span className="text-vyntra-brand">
              Ciudadanos
            </span>
          </h1>
          
          <p className="text-xl text-ink-muted max-w-3xl mx-auto leading-relaxed">
            Entiende fácilmente las normas de tránsito, multas, trámites vehiculares y tus derechos. 
            Contenido simple, ejemplos prácticos, y acceso a documentos oficiales.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <div className="flex items-center gap-2 text-sm text-ink-muted">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Información oficial
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-muted">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Ejemplos prácticos
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-muted">
              <CheckCircle className="w-4 h-4 text-green-400" />
              PDF descargables
            </div>
          </div>
        </div>

        {/* Filter/Category Tags */}
        <div className="mb-12 flex flex-wrap gap-2 justify-center">
          <button className="px-4 py-2 bg-vyntra-brand/20 border border-vyntra-brand/40 rounded-full text-sm font-medium text-vyntra-brand hover:bg-vyntra-brand/30 transition">
            Todos (8)
          </button>
          <button className="px-4 py-2 bg-white border border-vyntra-border rounded-full text-sm font-medium text-ink-muted hover:bg-vyntra-surface transition">
            Trámites
          </button>
          <button className="px-4 py-2 bg-white border border-vyntra-border rounded-full text-sm font-medium text-ink-muted hover:bg-vyntra-surface transition">
            Derechos
          </button>
          <button className="px-4 py-2 bg-white border border-vyntra-border rounded-full text-sm font-medium text-ink-muted hover:bg-vyntra-surface transition">
            Emergencias
          </button>
        </div>

        {/* Grid of Topics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {normativeTopics.map((topic) => {
            const Icon = topic.icon
            const colorClasses = colorMap[topic.color as keyof typeof colorMap]
            
            return (
              <Link key={topic.id} href={`/normativa/${topic.id}`}>
                <div className={`bg-gradient-to-br ${colorClasses} border rounded-xl p-6 backdrop-blur-sm hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col group`}>
                  {/* Icon */}
                  <div className="mb-4">
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 border border-white/20 rounded-md mb-3 w-fit">
                    <span className="w-1.5 h-1.5 bg-current rounded-full" />
                    <span className="text-xs font-medium text-white/70">{topic.category}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-vyntra-brand transition">
                    {topic.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/70 mb-4 flex-grow">
                    {topic.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs text-white/50">{topic.reads} de lectura</span>
                    <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 group-hover:text-white/90 transition-all" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-vyntra-brand/5 border border-vyntra-brand/20 rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-ink">
            ¿Necesitas ayuda personalizada?
          </h2>
          <p className="text-ink-muted mb-6 max-w-2xl mx-auto">
            Nuestros abogados especializados en derecho de tránsito pueden asesorarte directamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="sm:w-auto">
              Solicitar consulta legal
            </Button>
            <Button variant="secondary" size="lg" className="sm:w-auto">
              Contactar por WhatsApp
            </Button>
          </div>
        </div>

        {/* FAQ Summary */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-vyntra-border rounded-xl p-6 shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-ink">
              <span className="w-1 h-6 bg-vyntra-brand rounded" />
              Para ciudadanos
            </h3>
            <p className="text-sm text-ink-muted">
              Aprende tus derechos, entiende las normas, y resuelve trámites simples por tu cuenta.
            </p>
          </div>
          
          <div className="bg-white border border-vyntra-border rounded-xl p-6 shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-ink">
              <span className="w-1 h-6 bg-blue-400 rounded" />
              Para agentes de tránsito
            </h3>
            <p className="text-sm text-ink-muted">
              Consulta normativa, regulaciones actualizadas y procedimientos oficiales.
            </p>
          </div>
          
          <div className="bg-white border border-vyntra-border rounded-xl p-6 shadow-[0_10px_30px_rgba(15,31,61,0.06)]">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-ink">
              <span className="w-1 h-6 bg-emerald-400 rounded" />
              Para abogados jóvenes
            </h3>
            <p className="text-sm text-ink-muted">
              Base de conocimiento de derecho de tránsito con jurisprudencia y casos prácticos.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
