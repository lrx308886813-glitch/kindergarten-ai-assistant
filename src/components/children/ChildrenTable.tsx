import type { ChildProfile } from "@/lib/types";
import { Card } from "@/components/ui/Card";

export function ChildrenTable({ childrenData }: { childrenData: ChildProfile[] }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-4">姓名</th>
              <th className="px-5 py-4">班级</th>
              <th className="px-5 py-4">年龄</th>
              <th className="px-5 py-4">状态</th>
              <th className="px-5 py-4">观察标签</th>
              <th className="px-5 py-4">最近观察</th>
              <th className="px-5 py-4">更新日期</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {childrenData.map((child) => (
              <tr key={child.id} className="bg-surface align-top">
                <td className="px-5 py-4">
                  <p className="font-semibold text-foreground">{child.name}</p>
                  <p className="mt-1 text-xs text-muted">{child.gender}</p>
                </td>
                <td className="px-5 py-4 text-slate-700">{child.className}</td>
                <td className="px-5 py-4 text-slate-700">{child.age} 岁</td>
                <td className="px-5 py-4">
                  <span className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold text-primary">
                    {child.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {child.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="max-w-xs px-5 py-4 leading-6 text-muted">
                  {child.recentObservation}
                </td>
                <td className="px-5 py-4 text-muted">{child.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
