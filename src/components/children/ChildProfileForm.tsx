"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type { ChildGender } from "@/lib/types";

const initialForm = {
  name: "",
  gender: "女",
  age: "4",
  className: "",
  parentContact: "",
  tags: "",
  recentObservation: "",
};

export function ChildProfileForm() {
  const router = useRouter();
  const { addChildProfile } = useWorkspace();
  const [formData, setFormData] = useState(initialForm);

  function updateField(field: keyof typeof initialForm, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    addChildProfile({
      name: formData.name.trim(),
      gender: formData.gender as ChildGender,
      age: Number(formData.age),
      className: formData.className.trim(),
      parentContact: formData.parentContact.trim(),
      tags: parseTags(formData.tags),
      recentObservation: formData.recentObservation.trim(),
    });
    router.push("/children");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Card>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              姓名
              <Input
                required
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="例如：安安"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              性别
              <Select
                value={formData.gender}
                onChange={(event) => updateField("gender", event.target.value)}
              >
                <option value="女">女</option>
                <option value="男">男</option>
              </Select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              年龄
              <Input
                required
                min="2"
                max="7"
                type="number"
                value={formData.age}
                onChange={(event) => updateField("age", event.target.value)}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              班级
              <Input
                required
                value={formData.className}
                onChange={(event) => updateField("className", event.target.value)}
                placeholder="例如：小二班"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              家长联系人
              <Input
                value={formData.parentContact}
                onChange={(event) => updateField("parentContact", event.target.value)}
                placeholder="例如：安安妈妈"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              观察标签
              <Input
                value={formData.tags}
                onChange={(event) => updateField("tags", event.target.value)}
                placeholder="例如：语言表达、同伴互动"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            最近观察
            <Textarea
              required
              value={formData.recentObservation}
              onChange={(event) => updateField("recentObservation", event.target.value)}
              placeholder="记录幼儿今天的行为、情绪、互动或活动表现"
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit">保存档案</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setFormData(initialForm);
              }}
            >
              清空
            </Button>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-foreground">表单预览</h2>
        <div className="mt-5 space-y-4 text-sm">
          <PreviewRow label="姓名" value={formData.name || "未填写"} />
          <PreviewRow label="性别" value={formData.gender} />
          <PreviewRow label="年龄" value={`${formData.age || "-"} 岁`} />
          <PreviewRow label="班级" value={formData.className || "未填写"} />
          <PreviewRow label="联系人" value={formData.parentContact || "未填写"} />
          <PreviewRow label="标签" value={formData.tags || "未填写"} />
        </div>
        <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-muted">
          {formData.recentObservation || "最近观察内容会显示在这里。"}
        </div>
      </Card>
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line pb-3 last:border-b-0 last:pb-0">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function parseTags(value: string) {
  return value
    .split(/[,，、\s]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}
