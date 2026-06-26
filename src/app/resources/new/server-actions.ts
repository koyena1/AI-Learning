"use server";

import { redirect } from "next/navigation";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth";
import { prisma } from "@/lib/db";

import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  resourceType: z.enum(["ARTICLE", "VIDEO", "COURSE", "BOOK", "OTHER"]),
  category: z.string().nullable(),
  tags: z.string().nullable(),
  aiSummary: z.string().nullable(),
  description: z.string().nullable(),
});

export type CreateResourceInput = z.infer<typeof formSchema>;

export async function createResourceAction(input: CreateResourceInput) {
  console.log("===== CREATE RESOURCE =====");
  console.log(input);

  const session = await getServerSession(authOptions);
  console.log("SESSION:", session);

  const userId = (session?.user as any)?.id as string | undefined;
  console.log("USER ID:", userId);

  if (!userId) {
    console.log("NO USER");
    redirect("/auth/login");
  }

  const parsed = formSchema.safeParse(input);
  console.log("PARSED:", parsed.success);

  if (!parsed.success) {
    console.log(parsed.error);
    redirect("/resources/new");
  }

  console.log("CREATING RESOURCE...");

  const resource = await prisma.resource.create({
    data: {
      title: parsed.data.title,
      url: parsed.data.url,
      resourceType: parsed.data.resourceType,
      category: parsed.data.category,
      tags: parsed.data.tags,
      aiSummary: parsed.data.aiSummary,
      description: parsed.data.description,
      userId,
    },
  });

  console.log("RESOURCE CREATED:", resource);

  redirect("/resources");
}

