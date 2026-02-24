import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import Card from '@/components/ui/Card'
import { Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-vyntra-blue/10 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-vyntra-blue" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
          <p className="text-gray-400">
            Última actualización: 21 de febrero de 2026
          </p>
        </div>

        <Card className="p-8 lg:p-12 prose prose-invert prose-vyntra max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introducción</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              En Vyntra, respetamos tu privacidad y nos comprometemos a proteger tu información personal. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos tu información cuando utilizas nuestra plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Información que Recopilamos</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Información que Proporcionas</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
              <li><strong>Datos de registro:</strong> nombre, correo electrónico, contraseña</li>
              <li><strong>Información vehicular:</strong> número de placa, tipo de vehículo, marca, modelo</li>
              <li><strong>Información de contacto:</strong> teléfono, dirección (opcional)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Información Recopilada Automáticamente</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Dirección IP y ubicación aproximada</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Páginas visitadas y tiempo de uso</li>
              <li>Cookies y tecnologías similares</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Cómo Usamos tu Información</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Utilizamos tu información para:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Enviar alertas y notificaciones sobre tu vehículo</li>
              <li>Personalizar tu experiencia en la plataforma</li>
              <li>Procesar pagos y gestionar suscripciones</li>
              <li>Comunicarnos contigo sobre actualizaciones y cambios</li>
              <li>Prevenir fraudes y proteger la seguridad</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Compartir Información</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              NO vendemos tu información personal. Podemos compartir información limitada con:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Proveedores de servicios:</strong> Firebase, servicios de email, procesadores de +pago</li>
              <li><strong>Abogados certificados:</strong> solo cuando solicitas asesoría legal</li>
              <li><strong>Autoridades:</strong> cuando sea requerido por ley</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Seguridad de los Datos</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Cifrado SSL/TLS para transmisión de datos</li>
              <li>Autenticación segura con Firebase</li>
              <li>Almacenamiento encriptado en bases de datos</li>
              <li>Auditorías de seguridad periódicas</li>
              <li>Acceso restringido a información personal</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Tus Derechos</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Acceder:</strong> solicitar copia de tu información personal</li>
              <li><strong>Rectificar:</strong> corregir información inexacta</li>
              <li><strong>Eliminar:</strong> solicitar la eliminación de tu cuenta y datos</li>
              <li><strong>Exportar:</strong> obtener tus datos en formato portable</li>
              <li><strong>Oponerte:</strong> rechazar ciertos usos de tu información</li>
              <li><strong>Revocar consentimiento:</strong> en cualquier momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Cookies y Tecnologías Similares</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Utilizamos cookies para mejorar tu experiencia. Puedes controlar las cookies a través de la configuración de tu navegador. Para más información, consulta nuestra{' '}
              <a href="/cookies" className="text-vyntra-blue hover:underline">
                Política de Cookies
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Retención de Datos</h2>
            <p className="text-gray-300 leading-relaxed">
              Retenemos tu información personal mientras tu cuenta esté activa o según sea necesario para proporcionarte servicios. Puedes solicitar la eliminación de tu cuenta en cualquier momento.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Menores de Edad</h2>
            <p className="text-gray-300 leading-relaxed">
              Vyntra no está dirigido a menores de 18 años. No recopilamos intencionalmente información de menores. Si detectamos que un menor ha proporcionado información, la eliminaremos inmediatamente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Cambios a esta Política</h2>
            <p className="text-gray-300 leading-relaxed">
              Nos reservamos el derecho de actualizar esta Política de Privacidad. Te notificaremos sobre cambios significativos por correo electrónico o mediante un aviso destacado en la plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Contacto</h2>
            <p className="text-gray-300 leading-relaxed">
              Para ejercer tus derechos o hacer preguntas sobre privacidad, contáctanos:
            </p>
            <ul className="list-none text-gray-300 space-y-2 mt-4">
              <li>📧 Email: <a href="mailto:privacidad@vyntra.com" className="text-vyntra-blue hover:underline">privacidad@vyntra.com</a></li>
              <li>📍 Ubicación: Quito, Ecuador</li>
              <li>⚖️ Responsable: Henry Zavala</li>
            </ul>
          </section>

          <div className="bg-vyntra-blue/10 border border-vyntra-blue/20 rounded-xl p-6 mt-8">
            <p className="text-sm text-gray-300">
              <strong className="text-vyntra-blue">Nota:</strong> Esta política se aplica únicamente a la información recopilada por Vyntra. No somos responsables por las prácticas de privacidad de sitios web de terceros enlazados desde nuestra plataforma.
            </p>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
