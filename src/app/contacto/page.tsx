'use client'

import { useState } from 'react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success('¡Mensaje enviado! Te responderemos pronto.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            ¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para ti
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center">
            <div className="w-14 h-14 bg-vyntra-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-vyntra-blue" />
            </div>
            <h3 className="font-bold mb-2">Email</h3>
            <a href="mailto:contacto@vyntra.com" className="text-sm text-gray-400 hover:text-vyntra-blue transition">
              contacto@vyntra.com
            </a>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-14 h-14 bg-vyntra-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-vyntra-blue" />
            </div>
            <h3 className="font-bold mb-2">Ubicación</h3>
            <p className="text-sm text-gray-400">
              Quito, Ecuador
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-14 h-14 bg-vyntra-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-vyntra-blue" />
            </div>
            <h3 className="font-bold mb-2">Teléfono</h3>
            <a href="tel:+593999999999" className="text-sm text-gray-400 hover:text-vyntra-blue transition">
              +593 99 999 9999
            </a>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 lg:p-12">
            <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  label="Nombre completo"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />

                <Input
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <Input
                label="Asunto"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="¿En qué podemos ayudarte?"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje aquí..."
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vyntra-blue focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              <Button type="submit" size="lg" fullWidth loading={loading}>
                <Send className="w-5 h-5 mr-2" />
                Enviar mensaje
              </Button>
            </form>
          </Card>

          <div className="mt-8 bg-vyntra-blue/10 border border-vyntra-blue/20 rounded-xl p-6">
            <h3 className="font-bold mb-3 text-vyntra-blue">Horario de atención</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📅 Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p>📅 Sábados: 9:00 AM - 1:00 PM</p>
              <p>📅 Domingos y feriados: Cerrado</p>
              <p className="mt-4 text-xs text-gray-400">
                * Responderemos tu mensaje dentro de 24-48 horas hábiles
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Prefieres hablar directamente?</h2>
          <p className="text-gray-400 mb-6">
            Programa una llamada con nuestro equipo
          </p>
          <Button variant="secondary">
            Agendar llamada
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
