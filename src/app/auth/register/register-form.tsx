"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const RegisterSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(values: RegisterValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Registration failed");
      }

      toast({ title: "Account created", description: "You can now log in." });
      router.push("/auth/login");
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: e instanceof Error ? e.message : "Unknown error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Ada Lovelace" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>

      <FormControl>
        <Input
          type="password"
          placeholder="••••••••"
          {...field}
        />
      </FormControl>

      {/* Helper text */}
      <p className="text-xs text-muted-foreground">
        Password must be at least{" "}
        <span className="font-semibold text-green-700">8 characters</span>.
        Example:{" "}
        <span className="font-semibold text-green-700">
          rosy1234
        </span>
      </p>

      <FormMessage />
    </FormItem>
  )}
/>

        <FormField
  control={form.control}
  name="confirmPassword"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Confirm password</FormLabel>

      <FormControl>
        <Input
          type="password"
          placeholder="••••••••"
          {...field}
        />
      </FormControl>

      {/* Helper text */}
      <p className="text-xs text-muted-foreground">
        Re-enter the same password.
      </p>

      <FormMessage />
    </FormItem>
  )}
/>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Creating..." : "Create account"}
        </Button>
      </form>
    </Form>
  );
}

