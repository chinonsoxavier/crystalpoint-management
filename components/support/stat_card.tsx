// app/components/support/stat-card.tsx

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCard({
  title,
  value,
  icon,
  description,
  trend,
}: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-accent-foreground p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <p className="text-base font-medium text-muted-foreground">{title}</p>
          <p className="text-lg font-bold">{value}</p>
        </div>
      </div>
      {/* Optional: Add a subtle background decoration */}
      <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-primary/5" />
    </div>
  );
}
