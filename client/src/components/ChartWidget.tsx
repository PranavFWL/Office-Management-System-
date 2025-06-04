import { ReactNode } from "react";

interface ChartWidgetProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function ChartWidget({ title, children, actions }: ChartWidgetProps) {
  return (
    <div className="glass-card rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {actions}
      </div>
      {children}
    </div>
  );
}
