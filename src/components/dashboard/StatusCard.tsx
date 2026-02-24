import Card from "@/components/ui/Card";

interface StatusCardProps {
  status: "ok" | "warning" | "danger";
}

export default function StatusCard({ status }: StatusCardProps) {
  const statusConfig = {
    ok: {
      color: "bg-green-100",
      dot: "bg-green-500",
      text: "Todo al día",
    },
    warning: {
      color: "bg-yellow-100",
      dot: "bg-yellow-500",
      text: "Atención requerida",
    },
    danger: {
      color: "bg-red-100",
      dot: "bg-red-500",
      text: "Acción urgente",
    },
  };

  const config = statusConfig[status];

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Estado Legal
      </h2>
      <div className="flex items-center gap-3">
        <span className={`w-4 h-4 rounded-full ${config.dot}`} />
        <p className="font-medium text-gray-700">{config.text}</p>
      </div>
    </Card>
  );
}
