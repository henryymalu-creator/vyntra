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
    <div className="flex items-center justify-center min-h-screen bg-white">
      <p className="text-gray-600">Redirigiendo a registro...</p>
    </div>
  );
}
