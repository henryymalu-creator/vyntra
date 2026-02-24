"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function RegistrarVehiculoPage() {
  const [plate, setPlate] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Quito");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const months = [
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
  ];

  const getMonthFromDigit = (digit: number) => {
    return months[digit % months.length];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const cleanPlate = plate.toUpperCase().replace(/\s/g, "");
      if (cleanPlate.length < 6) {
        setError("La placa debe tener mínimo 6 caracteres");
        setLoading(false);
        return;
      }

      const lastDigit = parseInt(cleanPlate.slice(-1));
      const month = getMonthFromDigit(lastDigit);

      const { error: dbError } = await supabase.from("vehicles").insert([
        {
          plate: cleanPlate,
          email: email.toLowerCase(),
          city,
          last_digit: lastDigit,
          registration_month: month,
        },
      ]);

      if (dbError) {
        setError(dbError.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Error al registrar. Intenta de nuevo.");
    }

    setLoading(false);
  };

  return (
    <main className="bg-white min-h-screen">
      <Section className="py-16">
        <h1 className="text-4xl font-bold mb-4">
          Activa tu monitoreo vehicular
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Registra tu placa y recibe recordatorios automáticos 30 días antes de cada vencimiento.
        </p>
      </Section>

      <Section>
        {!success ? (
          <div className="max-w-md mx-auto">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Placa vehicular
                  </label>
                  <input
                    type="text"
                    placeholder="ABC-1234"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formato: ABC-1234 (6 caracteres)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Aquí recibirás los recordatorios
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-xl p-3"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option>Quito</option>
                    <option>Guayaquil</option>
                    <option>Cuenca</option>
                  </select>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Registrar vehículo"}
                </Button>
              </form>
            </Card>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <Card className="bg-green-50 border-green-200">
              <div className="text-center">
                <div className="text-4xl mb-4">✅</div>
                <h2 className="text-xl font-bold text-green-900 mb-2">
                  ¡Vehículo registrado!
                </h2>
                <p className="text-green-800 mb-4">
                  Recibirás recordatorios en {email}
                </p>
                <p className="text-sm text-green-700 mb-6">
                  Tu matrícula vence en <strong>{getMonthFromDigit(parseInt(plate.slice(-1)))}</strong>
                </p>
                <Link href="/">
                  <Button variant="primary" className="w-full">
                    Volver al inicio
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </Section>

      {!success && (
        <Section variant="light">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">¿Qué incluye?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <div className="text-2xl mb-2">📅</div>
                <h3 className="font-semibold text-gray-900">Recordatorios</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Alertas 30 días antes de vencer
                </p>
              </Card>

              <Card>
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-900">Panel personal</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Verifica estado en cualquier momento
                </p>
              </Card>

              <Card>
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="font-semibold text-gray-900">Futuro Premium</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Acceso a features avanzados
                </p>
              </Card>
            </div>
          </div>
        </Section>
      )}
    </main>
  );
}
