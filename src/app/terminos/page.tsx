import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import Card from '@/components/ui/Card'
import { FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-vyntra-blue/10 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-vyntra-blue" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Términos de Servicio</h1>
          <p className="text-gray-400">
            Última actualización: 21 de febrero de 2026
          </p>
        </div>

        <Card className="p-8 lg:p-12 prose prose-invert prose-vyntra max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Al acceder y utilizar Vyntra ("la Plataforma"), usted acepta estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, no debe utilizar esta plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Descripción del Servicio</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Vyntra es una plataforma privada e independiente que proporciona:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Información sobre normativa de tránsito en Quito, Ecuador</li>
              <li>Sistema de alertas para vencimientos y restricciones vehiculares</li>
              <li>Acceso a mapas y recursos de movilidad urbana</li>
              <li>Conexión con profesionales legales especializados en tránsito</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Independencia de Entidades Gubernamentales</h2>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-4">
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-yellow-400">IMPORTANTE:</strong> Vyntra NO está afiliado, asociado, patrocinado, respaldado ni representa de manera alguna a la Agencia Metropolitana de Tránsito (AMT), Agencia Nacional de Tránsito (ANT), ni a ninguna otra entidad gubernamental ecuatoriana. Somos una plataforma privada independiente.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Uso de la Información</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              La información proporcionada en Vyntra tiene carácter informativo y se basa en datos públicos disponibles. Los usuarios deben:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li>Verificar toda información oficial en los portales gubernamentales competentes</li>
              <li>No considerar la información de Vyntra como asesoría legal vinculante</li>
              <li>Consultar con profesionales certificados para casos específicos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Registro y Cuenta de Usuario</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Para acceder a ciertas funciones, usted debe:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Proporcionar información precisa y completa</li>
              <li>Mantener la confidencialidad de su contraseña</li>
              <li>Notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
              <li>Ser responsable de todas las actividades bajo su cuenta</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Servicios Premium</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Algunos servicios de Vyntra requieren suscripción de pago. Al suscribirse, usted acepta:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Los precios y términos de facturación especificados</li>
              <li>La renovación automática según el plan seleccionado</li>
              <li>Nuestra política de reembolsos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Servicios Legales de Terceros</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Vyntra facilita la conexión con abogados independientes. Sin embargo:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Vyntra no proporciona servicios legales directamente</li>
              <li>Los profesionales son responsables de su propio trabajo</li>
              <li>Vyntra no garantiza resultados específicos</li>
              <li>Las tarifas legales son independientes de Vyntra</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Limitación de Responsabilidad</h2>
            <p className="text-gray-300 leading-relaxed">
              Vyntra y sus creadores no serán responsables por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar la plataforma, incluyendo pero no limitado a multas, sanciones, o pérdidas económicas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Propiedad Intelectual</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Todo el contenido, diseño, código y materiales de Vyntra están protegidos por derechos de autor. © 2026 Henry Zavala. Todos los derechos reservados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Modificaciones</h2>
            <p className="text-gray-300 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Contacto</h2>
            <p className="text-gray-300 leading-relaxed">
              Para preguntas sobre estos términos, contáctanos en:{' '}
              <a href="mailto:legal@vyntra.com" className="text-vyntra-blue hover:underline">
                legal@vyntra.com
              </a>
            </p>
          </section>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
