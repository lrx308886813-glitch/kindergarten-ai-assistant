import { Card } from "@/components/ui/Card";
import type { RecentGeneration } from "@/lib/types";

export function RecentActivity({ items }: { items: RecentGeneration[] }) {
  return (
    <Card>
      <div>
        <h2 className="text-lg font-semibold text-foreground">最近生成</h2>
        <p className="mt-1 text-sm text-muted">前端 mock 记录</p>
      </div>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <article key={item.id} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-foreground">{item.type}</p>
              <span className="text-xs text-muted">{item.createdAt}</span>
            </div>
            <p className="mt-1 text-sm text-slate-700">{item.childName}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
          </article>
        ))}
      </div>
    </Card>
  );
}
