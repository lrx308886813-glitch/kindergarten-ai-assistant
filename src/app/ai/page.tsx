import { AiGenerator } from "@/components/ai/AiGenerator";

export default function AiPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium text-primary">AI 生成</p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
          文案生成器
        </h1>
      </section>

      <AiGenerator />
    </div>
  );
}
