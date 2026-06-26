import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth/auth";
import { prisma } from "@/lib/db";

import { Button } from "@/components/ui/button";

import Link from "next/link";


import ResourceNewForm from "./page.client";


async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) redirect("/auth/login");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) redirect("/auth/login");

  return user;
}

export default async function NewResourcePage() {
  await getCurrentUser();

  return (
    <div className="min-h-[calc(100vh-0px)] bg-muted/40">
      <div className="mx-auto w-full max-w-4xl px-4 py-6">
        <div className="mb-4">
          <Link href="/resources">
            <Button variant="secondary">Back to resources</Button>
          </Link>
        </div>

        <ResourceNewForm />
      </div>
    </div>
  );
}

