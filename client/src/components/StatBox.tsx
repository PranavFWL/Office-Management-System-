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
    positive: "text-green-400",
    negative: "text-red-400",
    neutral: "text-blue-400"
  }[changeType];

  const gradientClass = {
    positive: "gradient-success",
    negative: "gradient-secondary", 
    neutral: "gradient-accent"
  }[changeType];

  return (
    <div className="glass-card rounded-2xl p-6 hover-glow transition-all duration-500 neon-border floating-animation">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-300 text-sm font-medium uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-bold text-white mt-3 mb-2">{value}</p>
          <div className="flex items-center">
            <span className={`text-sm font-semibold ${changeColorClass} bg-white/10 px-2 py-1 rounded-lg`}>
              {change}
            </span>
            <span className="text-gray-400 text-sm ml-2">{changeLabel}</span>
          </div>
        </div>
        <div className={`w-16 h-16 ${gradientClass} rounded-2xl flex items-center justify-center shadow-lg animate-gradient pulse-glow`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      
      {/* Decorative bottom line */}
      <div className={`mt-4 h-1 ${gradientClass} rounded-full opacity-60`}></div>
    </div>
  );
}
