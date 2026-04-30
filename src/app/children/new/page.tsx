import { ChildProfileForm } from "@/components/children/ChildProfileForm";

export default function NewChildPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium text-primary">新建档案</p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
          幼儿档案表单
        </h1>
      </section>

      <ChildProfileForm />
    </div>
  );
}
