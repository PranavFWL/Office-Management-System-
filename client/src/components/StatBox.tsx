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
    positive: "text-emerald-400",
    negative: "text-rose-400",
    neutral: "text-blue-400"
  }[changeType];

  const gradientClass = {
    positive: "gradient-success",
    negative: "gradient-secondary", 
    neutral: "gradient-primary"
  }[changeType];

  return (
    <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-white mt-2 mb-2">{value}</p>
          <div className="flex items-center">
            <span className={`text-sm font-medium ${changeColorClass} bg-white/5 px-2 py-1 rounded-lg`}>
              {change}
            </span>
            <span className="text-gray-500 text-sm ml-2">{changeLabel}</span>
          </div>
        </div>
        <div className={`w-14 h-14 ${gradientClass} rounded-xl flex items-center justify-center shadow-md`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
      
      {/* Subtle bottom accent */}
      <div className={`mt-4 h-0.5 ${gradientClass} rounded-full opacity-50`}></div>
    </div>
  );
}
