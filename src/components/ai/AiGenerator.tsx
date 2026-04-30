"use client";

import { useEffect, useMemo, useState } from "react";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import {
  generateMockResult,
  generationOptions,
  getGenerationLabel,
} from "@/lib/mock-data";
import type { GenerationType } from "@/lib/types";

export function AiGenerator() {
  const { addGenerationHistory, childProfiles } = useWorkspace();
  const [generationType, setGenerationType] =
    useState<GenerationType>("dailyObservation");
  const [childId, setChildId] = useState(childProfiles[0]?.id ?? "");
  const [observation, setObservation] = useState("");
  const [result, setResult] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");

  const selectedChild = useMemo(
    () => childProfiles.find((child) => child.id === childId),
    [childId]
  );

  const selectedOption = generationOptions.find(
    (option) => option.value === generationType
  );

  useEffect(() => {
    if (!childProfiles.length) {
      setChildId("");
      return;
    }

    if (!childProfiles.some((child) => child.id === childId)) {
      setChildId(childProfiles[0].id);
    }
  }, [childId, childProfiles]);

  function handleGenerate() {
    if (!selectedChild) {
      return;
    }

    const text = generateMockResult(
      generationType,
      observation,
      selectedChild.name
    );
    setResult(text);
    setCopyStatus("idle");
    setSaveStatus("idle");
  }

  async function handleCopy() {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  function handleSave() {
    if (!selectedChild || !result.trim()) {
      return;
    }

    addGenerationHistory({
      generationType,
      child: selectedChild,
      observation: observation.trim(),
      result: result.trim(),
    });
    setSaveStatus("saved");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <Card>
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            生成类型
            <Select
              value={generationType}
              onChange={(event) => setGenerationType(event.target.value as GenerationType)}
            >
              {generationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </label>

          <div className="rounded-lg bg-slate-50 p-4 text-sm leading-6 text-muted">
            {selectedOption?.description}
          </div>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            关联幼儿
            <Select
              value={childId}
              onChange={(event) => {
                setChildId(event.target.value);
                setSaveStatus("idle");
              }}
            >
              {childProfiles.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name} · {child.className}
                </option>
              ))}
            </Select>
          </label>

          {selectedChild ? (
            <div className="grid gap-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted">姓名</span>
                <span className="font-medium text-foreground">{selectedChild.name}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted">班级</span>
                <span className="font-medium text-foreground">
                  {selectedChild.className}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted">年龄</span>
                <span className="font-medium text-foreground">
                  {selectedChild.age} 岁
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted">状态</span>
                <span className="font-medium text-foreground">
                  {selectedChild.status}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-slate-50 p-4 text-sm leading-6 text-muted">
              暂无幼儿档案，请先新建档案。
            </div>
          )}

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            观察文字
            <Textarea
              value={observation}
              onChange={(event) => {
                setObservation(event.target.value);
                setSaveStatus("idle");
              }}
              placeholder="例如：今天区域活动时，安安主动邀请同伴一起搭积木，并能说明她想搭一座桥。"
              className="min-h-44"
            />
          </label>

          <Button
            type="button"
            onClick={handleGenerate}
            disabled={!selectedChild || !observation.trim()}
          >
            生成 mock 结果
          </Button>
        </div>
      </Card>

      <Card className="min-h-[520px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">生成结果</h2>
            <p className="mt-1 text-sm text-muted">
              {getGenerationLabel(generationType)}
              {selectedChild ? ` · ${selectedChild.name}` : ""}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              onClick={handleSave}
              disabled={!selectedChild || !result.trim()}
            >
              保存历史
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCopy}
              disabled={!result}
            >
              复制结果
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setResult("");
                setCopyStatus("idle");
                setSaveStatus("idle");
              }}
              disabled={!result}
            >
              清空结果
            </Button>
          </div>
        </div>

        <div className="mt-5 min-h-[360px] rounded-lg border border-line bg-slate-50 p-4">
          {result ? (
            <Textarea
              value={result}
              onChange={(event) => {
                setResult(event.target.value);
                setSaveStatus("idle");
              }}
              className="min-h-[320px] border-0 bg-transparent p-0 leading-7 shadow-none focus:border-0 focus:ring-0"
            />
          ) : (
            <div className="flex min-h-[320px] items-center justify-center text-center text-sm text-muted">
              输入观察文字后生成内容。
            </div>
          )}
        </div>

        {copyStatus === "copied" ? (
          <p className="mt-4 text-sm font-medium text-primary">已复制到剪贴板。</p>
        ) : null}
        {copyStatus === "failed" ? (
          <p className="mt-4 text-sm font-medium text-rose">
            浏览器暂未允许复制，请手动选择结果文本。
          </p>
        ) : null}
        {saveStatus === "saved" ? (
          <p className="mt-4 text-sm font-medium text-primary">
            已保存到本地 mock 历史记录。
          </p>
        ) : null}
      </Card>
    </div>
  );
}
