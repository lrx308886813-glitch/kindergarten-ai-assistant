import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { WorkspaceProvider } from "@/components/providers/WorkspaceProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "幼师 AI 工作台",
  description: "面向幼儿园教师的前端 mock 工作台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        <WorkspaceProvider>
          <AppShell>{children}</AppShell>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
