import Card from "@/components/ui/Card";

interface ScoreGaugeProps {
  score: number;
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const getColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getLabel = () => {
    if (score >= 80) return "Bajo riesgo";
    if (score >= 60) return "Riesgo medio";
    return "Alto riesgo";
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Score Vehicular
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-5xl font-bold ${getColor()}`}>
            {score}
          </div>
          <p className="text-sm text-gray-600 mt-2">/ 100</p>
        </div>
        <div className="text-right">
          <p className={`font-semibold ${getColor()}`}>
            {getLabel()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Basado en tu historial legal
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${getColor()}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </Card>
  );
}
