"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Section from "@/components/ui/Section";
import StatusCard from "@/components/dashboard/StatusCard";
import NextEventCard from "@/components/dashboard/NextEventCard";
import ScoreGauge from "@/components/dashboard/ScoreGauge";
import UpgradeBanner from "@/components/dashboard/UpgradeBanner";
import Card from "@/components/ui/Card";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface Vehicle {
  plate: string;
  registration_month: string;
  city: string;
  created_at: string;
}

export default function MiVehiculoPage() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [searched, setSearched] = useState(false);
  const [isPremium] = useState(false); // Simulado - cambiar cuando tengas auth real

  const calculateScore = (vehicle: Vehicle): number => {
    // Score simple v1
    let score = 100;
    // En futuro agregar lógica real basada en multas, retrasos, etc
    return score;
  };

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("email", email.toLowerCase())
        .single();

      if (error || !data) {
        setVehicle(null);
      } else {
        setVehicle(data);
      }
    } catch (err) {
      setVehicle(null);
    }

    setLoading(false);
  };

  return (
    <>
      {!isClient ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Cargando...</p>
        </div>
      ) : (
        <main className="bg-white text-gray-900 min-h-screen">
      {/* HEADER OSCURO */}
      <div className="bg-vyntra-primary text-white px-8 py-6 md:py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Mi vehículo</h1>
          <p className="text-sm opacity-75 mt-1">
            Panel de monitoreo vehicular inteligente
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      {!vehicle || !searched ? (
        <Section className="py-20">
          <div className="max-w-md mx-auto">
            <Card>
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                Busca tu vehículo
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Ingresa el email con el que registraste tu placa
              </p>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  className="w-full border border-gray-300 rounded-xl p-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Buscando..." : "Buscar"}
                </button>
              </div>

              {searched && !vehicle && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                  No encontramos un vehículo registrado con este email.{" "}
                  <Link href="/registrar-vehiculo" className="font-semibold underline">
                    Regístralo aquí
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </Section>
      ) : (
        <Section className="py-10 space-y-8">
          {/* ESTADO */}
          <StatusCard status="ok" />

          {/* INFO RÁPIDA */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Información del vehículo</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Placa:</span>{" "}
                <span className="font-semibold text-gray-900">{vehicle.plate}</span>
              </p>
              <p>
                <span className="text-gray-600">Ciudad:</span>{" "}
                <span className="font-semibold text-gray-900">{vehicle.city}</span>
              </p>
              <p>
                <span className="text-gray-600">Mes matrícula:</span>{" "}
                <span className="font-semibold text-gray-900">{vehicle.registration_month}</span>
              </p>
              <p>
                <span className="text-gray-600">Registrado:</span>{" "}
                <span className="text-gray-600">
                  {new Date(vehicle.created_at).toLocaleDateString("es-EC")}
                </span>
              </p>
            </div>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            <NextEventCard
              title="Próxima Matrícula"
              value={vehicle.registration_month}
              icon="📅"
            />
            <NextEventCard
              title="Pico y Placa Hoy"
              value="Sin restricción"
              icon="✅"
            />
          </div>

          {/* SCORE O UPGRADE */}
          {isPremium ? (
            <ScoreGauge score={calculateScore(vehicle)} />
          ) : (
            <UpgradeBanner />
          )}

          {/* ACCIONES */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setVehicle(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Buscar otro vehículo
            </button>
            <Link href="/matricula-quito-paso-a-paso">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Ver guía de matrícula
              </button>
            </Link>
          </div>
        </Section>
      )}
        </main>
      )}
    </>
  );
}
