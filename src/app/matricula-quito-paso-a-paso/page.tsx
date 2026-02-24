import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Cómo matricular un vehículo en Quito 2026 | Vyntra",
  description:
    "Guía completa paso a paso para matricular tu vehículo en Quito. Costos actualizados 2026, requisitos, documentos y ubicaciones de centros autorizados.",
  keywords:
    "matricula quito, matricula vehiculo, como matricular, requisitos matricula, costo matricula quito 2026",
};

export default function MatriculaPage() {
  return (
    <main className="bg-white text-gray-900">
      <Section className="py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Cómo matricular un vehículo en Quito (2026)
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Guía paso a paso que te explica el orden exacto a seguir, cuánto pagar y 
          qué instituciones intervienen en el proceso.
        </p>
      </Section>

      {/* PASOS */}
      <Section variant="light">
        <h2 className="text-2xl font-bold mb-8">Paso 1: Verificar valores pendientes</h2>
        <Card hover>
          <p className="text-gray-700 leading-relaxed">
            Antes de cualquier cosa, debes asegurarte de no tener multas o impuestos pendientes:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• Consulta multas en <strong>www.amt.gob.ec</strong></li>
            <li>• Verifica impuestos en <strong>www.sri.gob.ec</strong></li>
            <li>• Comprueba adeudos municipales si aplica</li>
          </ul>
          <p className="text-sm text-gray-600 mt-4">
            ⚠️ Si hay deudas, debes pagarlas primero. No puedes matricular si tienes pendientes.
          </p>
        </Card>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-8">Paso 2: Realizar la Revisión Técnica Vehicular (RTV)</h2>
        <Card hover>
          <p className="text-gray-700 leading-relaxed">
            Tu vehículo debe pasar inspección en un centro RTV autorizado:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• Agendarás cita en <strong>www.certificadortecnico.ec</strong></li>
            <li>• Lleva: cédula, placa, comprobante de seguro</li>
            <li>• Costo: $35–$50 aprox. (varía por tipo vehículo)</li>
            <li>• Tiempo: 20–30 minutos</li>
          </ul>
          <p className="text-sm text-gray-600 mt-4">
            ℹ️ Si tu vehículo aprueba, recibirás certificado digital inmediatamente.
          </p>
        </Card>
      </Section>

      <Section variant="light">
        <h2 className="text-2xl font-bold mb-8">Paso 3: Pagar matrícula según dígito final</h2>
        <Card hover>
          <p className="text-gray-700 mb-4">
            La matrícula se paga en meses específicos según el último dígito de tu placa:
          </p>
          <div className="space-y-2 text-gray-700 text-sm">
            <p><strong>Febrero:</strong> Placas terminadas en 1</p>
            <p><strong>Marzo:</strong> Placas terminadas en 2</p>
            <p><strong>Abril:</strong> Placas terminadas en 3</p>
            <p><strong>Mayo:</strong> Placas terminadas en 4</p>
            <p><strong>Junio:</strong> Placas terminadas en 5</p>
            <p><strong>Julio:</strong> Placas terminadas en 6</p>
            <p><strong>Agosto:</strong> Placas terminadas en 7</p>
            <p><strong>Septiembre:</strong> Placas terminadas en 8</p>
            <p><strong>Octubre:</strong> Placas terminadas en 9 o 0</p>
          </div>
          <p className="text-sm text-red-600 mt-4 font-semibold">
            ⚠️ Después del mes, hay recargo de 10% por cada mes de retraso.
          </p>
        </Card>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-8">Paso 4: Completar matrícula en AMT</h2>
        <Card hover>
          <p className="text-gray-700 leading-relaxed">
            Finalmente, irás a un centro AMT a completar el trámite:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• Lleva: cédula, comprobante de pago RTV, comprobante pago matrícula</li>
            <li>• Recibirás: Matrícula actualizada (física o digital)</li>
            <li>• Tiempo: 10–20 minutos</li>
            <li>• No hay costo adicional en AMT</li>
          </ul>
        </Card>
      </Section>

      {/* TABLA COSTOS */}
      <Section variant="light">
        <h2 className="text-2xl font-bold mb-8">Costos actualizados 2026</h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold">Concepto</th>
                  <th className="text-right py-2 px-3 font-semibold">Costo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">RTV (Revisión Técnica)</td>
                  <td className="text-right py-2 px-3">$35–$50</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">Matrícula auto (normal)</td>
                  <td className="text-right py-2 px-3">$150–$200</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">Matrícula moto</td>
                  <td className="text-right py-2 px-3">$80–$120</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold">TOTAL estimado</td>
                  <td className="text-right py-2 px-3 font-semibold">$185–$250</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            * Costos referenciales. Pueden variar. Si hay recargo, suma 10% por mes de retraso.
          </p>
        </Card>
      </Section>

      {/* ERRORES COMUNES */}
      <Section>
        <h2 className="text-2xl font-bold mb-8">Errores comunes (evita estos)</h2>
        <div className="space-y-4">
          <Card hover>
            <h3 className="font-semibold text-red-600 mb-2">❌ Matricular sin hacer RTV</h3>
            <p className="text-gray-700 text-sm">
              No puedes completar matrícula sin certificado RTV. Es obligatorio.
            </p>
          </Card>

          <Card hover>
            <h3 className="font-semibold text-red-600 mb-2">❌ Ir fuera del mes asignado</h3>
            <p className="text-gray-700 text-sm">
              Si tu dígito es 5 (Junio) y vas en Julio, pagarás recargo del 10%.
            </p>
          </Card>

          <Card hover>
            <h3 className="font-semibold text-red-600 mb-2">❌ No verificar multas previas</h3>
            <p className="text-gray-700 text-sm">
              Si tienes deudas, te lo impedirán en AMT. Verifica antes.
            </p>
          </Card>

          <Card hover>
            <h3 className="font-semibold text-red-600 mb-2">❌ No llevar documentos originales</h3>
            <p className="text-gray-700 text-sm">
              Necesitas cédula original. Copias no sirven.
            </p>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="light" className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Quieres recordatorios automáticos?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Registra tu placa y recibe alertas 30 días antes de que venza tu matrícula.
          Nunca más olvides un trámite.
        </p>
        <Link href="/registrar-vehiculo">
          <Button variant="primary" size="lg">
            Registrar mi vehículo ahora
          </Button>
        </Link>
      </Section>

      {/* FOOTER INFO */}
      <Section className="text-center py-12 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Esta guía es referencial. Valida siempre en fuentes oficiales:
        </p>
        <p className="text-xs text-gray-500 mt-2">
          AMT: www.amt.gob.ec | SRI: www.sri.gob.ec
        </p>
      </Section>
    </main>
  );
}
