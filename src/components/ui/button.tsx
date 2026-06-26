import * as React from "react";

import { cn } from "@/lib/utils/cn";


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "ghost"
    | "outline";
};

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  const variants: Record<string, string> = {
  default: "bg-foreground text-background hover:opacity-90",

  secondary: "bg-muted text-foreground hover:opacity-90",

  destructive: "bg-red-600 text-white hover:bg-red-700",

  ghost: "hover:bg-muted",

  outline:
    "border border-gray-300 bg-white text-foreground hover:bg-muted",
};

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

