import { ChildrenClient } from "@/components/children/ChildrenClient";
import { Button } from "@/components/ui/Button";

export default function ChildrenPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">幼儿档案</p>
          <h1 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
            档案列表
          </h1>
        </div>
        <Button asChild href="/children/new">
          新建档案
        </Button>
      </section>

      <ChildrenClient />
    </div>
  );
}
