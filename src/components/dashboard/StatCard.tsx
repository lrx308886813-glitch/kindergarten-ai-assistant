import { Card } from "@/components/ui/Card";
import type { DashboardStat } from "@/lib/types";
import { cn } from "@/lib/utils";

const toneClasses: Record<DashboardStat["tone"], string> = {
  teal: "bg-teal-50 text-primary ring-teal-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  rose: "bg-rose-50 text-rose ring-rose-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function StatCard({ label, value, helper, tone }: DashboardStat) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-foreground">{value}</p>
        </div>
        <span className={cn("rounded-lg px-2.5 py-1 text-xs font-semibold ring-1", toneClasses[tone])}>
          MVP
        </span>
      </div>
      <p className="mt-3 text-sm text-muted">{helper}</p>
    </Card>
  );
}
