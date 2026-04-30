import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-teal-100",
        className
      )}
      {...props}
    />
  );
}
