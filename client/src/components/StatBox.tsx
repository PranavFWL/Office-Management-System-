import { LucideIcon } from "lucide-react";

interface StatBoxProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  changeLabel: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export function StatBox({ 
  title, 
  value, 
  change, 
  changeType, 
  changeLabel, 
  icon: Icon, 
  iconColor, 
  iconBgColor 
}: StatBoxProps) {
  const changeColorClass = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-blue-500"
  }[changeType];

  return (
    <div className="glass-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm font-medium ${changeColorClass}`}>{change}</span>
            <span className="text-gray-600 text-sm ml-1">{changeLabel}</span>
          </div>
        </div>
        <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
