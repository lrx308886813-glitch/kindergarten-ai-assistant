"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/children", label: "幼儿档案" },
  { href: "/children/new", label: "新建档案" },
  { href: "/ai", label: "AI 生成" },
];

export function SidebarNav({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        compact ? "mt-4 flex gap-2 overflow-x-auto" : "mt-8 grid gap-2",
        "text-sm"
      )}
      aria-label="主导航"
    >
      {navItems.map((item) => {
        const active =
          item.href === "/" || item.href === "/children"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-lg px-3 py-2 font-medium transition-colors",
              compact ? "whitespace-nowrap" : "block",
              active
                ? "bg-primary text-primary-foreground"
                : "text-slate-700 hover:bg-slate-100 hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
