"use client";

import Link from "next/link";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatCard } from "@/components/dashboard/StatCard";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { generationOptions } from "@/lib/mock-data";
import type { DashboardStat, RecentGeneration } from "@/lib/types";

export function DashboardClient() {
  const { childProfiles, generationHistory } = useWorkspace();
  const latestChildren = childProfiles.slice(0, 3);
  const todayGenerationCount = generationHistory.filter((item) =>
    isToday(item.createdAt)
  ).length;
  const attentionCount = childProfiles.filter((child) =>
    child.status.includes("关注")
  ).length;

  const stats: DashboardStat[] = [
    {
      label: "幼儿档案",
      value: String(childProfiles.length),
      helper: "本地档案总数",
      tone: "teal",
    },
    {
      label: "今日生成",
      value: String(todayGenerationCount),
      helper: "本地 mock 历史",
      tone: "amber",
    },
    {
      label: "待关注",
      value: String(attentionCount),
      helper: "需要持续观察",
      tone: "rose",
    },
    {
      label: "可用模板",
      value: String(generationOptions.length),
      helper: "生成类型数量",
      tone: "slate",
    },
  ];

  const recentItems: RecentGeneration[] = generationHistory
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      type: item.type,
      childName: item.childName,
      createdAt: formatCreatedAt(item.createdAt),
      summary: item.summary,
    }));

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
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">幼儿档案</h2>
              <p className="mt-1 text-sm text-muted">最近更新的本地档案</p>
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

        <RecentActivity items={recentItems} />
      </section>
    </div>
  );
}

function isToday(value: string) {
  const date = new Date(value);
  const today = new Date();

  return date.toDateString() === today.toDateString();
}

function formatCreatedAt(value: string) {
  const date = new Date(value);
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  const time = date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (date.toDateString() === today.toDateString()) {
    return `今天 ${time}`;
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return `昨天 ${time}`;
  }

  return date.toLocaleDateString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
  });
}
