import Card from "@/components/ui/Card";

interface NextEventCardProps {
  title: string;
  value: string;
  icon?: string;
}

export default function NextEventCard({
  title,
  value,
  icon = "📅",
}: NextEventCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </Card>
  );
}
