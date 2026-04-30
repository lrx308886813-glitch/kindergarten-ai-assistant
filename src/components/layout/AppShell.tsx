import type { ReactNode } from "react";
import { SidebarNav } from "@/components/layout/SidebarNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-surface px-5 py-6 lg:block">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            KINDER AI
          </p>
          <h2 className="mt-3 text-xl font-semibold text-foreground">幼师 AI 工作台</h2>
        </div>
        <SidebarNav />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-line bg-surface/95 px-4 py-4 backdrop-blur md:px-8 lg:hidden">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              KINDER AI
            </p>
            <h1 className="mt-1 text-lg font-semibold text-foreground">
              幼师 AI 工作台
            </h1>
          </div>
          <SidebarNav compact />
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
