import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-teal-800",
  secondary:
    "border border-line bg-surface text-foreground hover:border-slate-300 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
  danger: "bg-rose text-white hover:bg-rose-800",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: false;
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  asChild: true;
};

export function Button(props: ButtonProps | LinkButtonProps) {
  const { variant = "primary", className } = props;
  const classes = cn(
    "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    className
  );

  if (props.asChild) {
    const { asChild, variant: _variant, className: _className, ...linkProps } = props;
    void asChild;
    void _variant;
    void _className;
    return <Link className={classes} {...linkProps} />;
  }

  const { variant: _variant, asChild: _asChild, className: _className, ...buttonProps } =
    props;
  void _variant;
  void _asChild;
  void _className;

  return <button className={classes} {...buttonProps} />;
}
