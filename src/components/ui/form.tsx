"use client";

import * as React from "react";
import { FormProvider } from "react-hook-form";
import type { FieldError } from "react-hook-form";

import { cn } from "@/lib/utils/cn";

export const Form = FormProvider;

export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export function FormLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

export function FormControl({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full">{children}</div>;
}

export function FormMessage({
  children,
}: {
  children?: React.ReactNode;
}) {
  if (!children) return null;

  return (
    <p className="text-sm text-red-600">
      {children}
    </p>
  );
}

export function FormField({
  control,
  name,
  render,
}: {
  control: any;
  name: string;
  render: (args: {
    field: any;
    fieldState: { error?: FieldError };
  }) => React.ReactNode;
}) {
  const { useController } =
    require("react-hook-form") as typeof import("react-hook-form");

  const { field, fieldState } = useController({
    control,
    name,
  });

  return <>{render({ field, fieldState })}</>;
}