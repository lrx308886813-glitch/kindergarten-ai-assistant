import Link from "next/link";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { childProfiles, dashboardStats, recentGenerations } from "@/lib/mock-data";

export default function DashboardPage() {
  const latestChildren = childProfiles.slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">今日工作台</p>
          <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
            幼师 AI 工作台
          </h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild href="/ai">
            开始生成
          </Button>
          <Button asChild href="/children/new" variant="secondary">
            新建档案
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">幼儿档案</h2>
              <p className="mt-1 text-sm text-muted">最近更新的 mock 档案</p>
            </div>
            <Link
              href="/children"
              className="text-sm font-medium text-primary hover:text-teal-900"
            >
              查看全部
            </Link>
          </div>

          <div className="mt-5 grid gap-3">
            {latestChildren.map((child) => (
              <div
                key={child.id}
                className="flex flex-col gap-3 rounded-lg border border-line bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">{child.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {child.className} · {child.age} 岁 · {child.status}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {child.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-line"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <RecentActivity items={recentGenerations} />
      </section>
    </div>
  );
}
