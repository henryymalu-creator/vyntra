import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function UpgradeBanner() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Desbloquea Score Avanzado
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Accede a puntuación inteligente, histórico completo y alertas prioritarias.
          </p>
          <Button variant="primary" size="sm">
            Actualizar a Premium
          </Button>
        </div>
        <span className="text-4xl">🚀</span>
      </div>
    </Card>
  );
}
