import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import Card from '@/components/ui/Card'
import { Users, Target, Sparkles, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Quiénes Somos</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Somos una plataforma tecnológica independiente comprometida con empoderar a los conductores de Quito
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card gradient className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-vyntra-blue/20 rounded-2xl flex items-center justify-center">
                <Target className="w-7 h-7 text-vyntra-blue" />
              </div>
              <h2 className="text-2xl font-bold">Nuestra Misión</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empoderar a los conductores de Quito con información precisa, alertas oportunas y herramientas inteligentes para evitar multas, mantenerse al día con la normativa y tomar decisiones informadas sobre su movilidad.
            </p>
          </Card>

          <Card gradient className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-vyntra-blue/20 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-vyntra-blue" />
              </div>
              <h2 className="text-2xl font-bold">Nuestra Visión</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Convertirnos en la plataforma líder de movilidad inteligente en Ecuador y expandirnos a toda Latinoamérica, revolucionando la forma en que los conductores interactúan con la normativa de tránsito.
            </p>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Lo Que Nos Hace Diferentes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} hover className="p-6 text-center">
                <div className="w-12 h-12 bg-vyntra-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-vyntra-blue" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card gradient className="p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-vyntra-blue/20 rounded-2xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-vyntra-blue" />
              </div>
              <h2 className="text-2xl font-bold">Nuestra Historia</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Vyntra nació en 2026 en Quito, Ecuador, de la visión de <strong className="text-white">Henry Zavala</strong>, quien identificó una necesidad crítica en la comunidad de conductores: acceso fácil y centralizado a información de tránsito confiable.
              </p>
              <p>
                Como muchos conductores, experimentó la frustración de multas evitables, información dispersa en múltiples portales gubernamentales, y la complejidad de entender la normativa de tránsito. Así surgió la idea de crear una plataforma que simplificara todo este proceso.
              </p>
              <p>
                Hoy, Vyntra es una plataforma tecnológica independiente que ayuda a miles de conductores a mantenerse informados, evitar multas y conducir con tranquilidad. No estamos afiliados a ninguna entidad gubernamental - somos una solución privada creada por conductores, para conductores.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Nuestros Valores</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="font-bold text-lg">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-vyntra-blue to-vyntra-blue-dark rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Quieres saber más?</h2>
          <p className="text-blue-50 mb-6 max-w-2xl mx-auto">
            Estamos constantemente mejorando y expandiendo nuestros servicios. Tu feedback es invaluable para nosotros.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center px-8 py-4 bg-white text-vyntra-blue font-bold rounded-xl hover:bg-blue-50 transition"
          >
            Contáctanos
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}

const features = [
  {
    icon: Users,
    title: 'Independientes',
    description: 'No estamos afiliados a entidades gubernamentales, trabajamos para ti',
  },
  {
    icon: Target,
    title: 'Precisos',
    description: 'Información verificada y actualizada constantemente',
  },
  {
    icon: Sparkles,
    title: 'Innovadores',
    description: 'Tecnología de punta para simplificar tu experiencia',
  },
]

const values = [
  {
    icon: '🎯',
    title: 'Transparencia',
    description: 'Información clara y sin letra pequeña',
  },
  {
    icon: '🔒',
    title: 'Privacidad',
    description: 'Tus datos están seguros y protegidos',
  },
  {
    icon: '💡',
    title: 'Innovación',
    description: 'Mejoramos constantemente',
  },
  {
    icon: '❤️',
    title: 'Compromiso',
    description: 'Tu satisfacción es nuestra prioridad',
  },
]
