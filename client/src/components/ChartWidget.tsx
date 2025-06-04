import { ReactNode } from "react";

interface ChartWidgetProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function ChartWidget({ title, children, actions }: ChartWidgetProps) {
  return (
    <div className="glass-card rounded-2xl p-6 hover-glow transition-all duration-500 neon-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {actions}
      </div>
      <div className="relative">
        {children}
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-xl"></div>
      </div>
    </div>
  );
}
