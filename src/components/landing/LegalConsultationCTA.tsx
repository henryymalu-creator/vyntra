'use client'

import Link from 'next/link'
import { MessageCircle, Phone, Calendar, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { generateWhatsAppLink } from '@/lib/whatsapp'

export default function LegalConsultationCTA() {
  const whatsappLink = generateWhatsAppLink('consultation')
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-white/5 border-y border-white/10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="w-2 h-2 bg-vyntra-brand rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-white/80">Asesoría Profesional</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            ¿Tu caso es más complejo?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Consulta directamente con nuestros abogados especializados en derechos de tránsito. 
            Tenemos experiencia en prescripciones, recursos legales y defensa ante juzgados.
          </p>
        </div>

        {/* Consultation Options Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* WhatsApp Option */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-green-500/30 hover:bg-green-500/5 transition-all">
            <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Chat por WhatsApp</h3>
            <p className="text-sm text-white/70 mb-4">
              Respuesta en menos de 1 hora. Consulta inicial sin costo.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="w-full text-green-400 border-green-500/30 hover:bg-green-500/10" size="sm">
                Enviar WhatsApp
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>

          {/* Phone Option */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all">
            <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Llamada Telefónica</h3>
            <p className="text-sm text-white/70 mb-4">
              Consulta directa. Horario: Lunes a viernes 10am-6pm
            </p>
            <a href="tel:+593999999999">
              <Button variant="ghost" className="w-full text-blue-400 border-blue-500/30 hover:bg-blue-500/10" size="sm">
                Llamar Ahora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>

          {/* Scheduled Consultation */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all">
            <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-bold text-white mb-2">Agendar Consulta</h3>
            <p className="text-sm text-white/70 mb-4">
              Reserva una sesión de 30 minutos con especialista
            </p>
            <Button variant="ghost" className="w-full text-purple-400 border-purple-500/30 hover:bg-purple-500/10" size="sm">
              Ver disponibilidad
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-vyntra-brand/10 border border-vyntra-brand/30 rounded-xl p-6 text-center">
          <p className="text-white/80">
            <strong className="text-white">Especialidades:</strong> Impugnación de multas • Prescripción • Baja vehicular • Defensa en procesos judiciales • Recursos legales
          </p>
        </div>
      </div>
    </section>
  )
}
