import { ReactNode } from "react";

interface ChartWidgetProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function ChartWidget({ title, children, actions }: ChartWidgetProps) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {actions}
      </div>
      {children}
    </div>
  );
}
