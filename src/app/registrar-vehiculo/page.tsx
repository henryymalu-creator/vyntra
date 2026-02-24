"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export const dynamic = 'force-dynamic';

export default function RegistrarVehiculoPage() {
  const router = useRouter();
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      router.replace('/registro');
    }
  }, [loading, router]);

  return (
    <>
      {!isClient ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Cargando...</p>
        </div>
      ) : (
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
                  return (
                    <div className="flex items-center justify-center min-h-screen bg-white">
                      <p className="text-gray-600">Redirigiendo a registro...</p>
                    </div>
                  );
                </p>
              </Card>
            </div>
          </div>
        </Section>
      )}
        </main>
      )}
    </>
  );
}
