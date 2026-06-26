import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import Link from "next/link";

import { authOptions } from "@/lib/auth/auth";
import { prisma } from "@/lib/db";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function formatDate(value: Date | string) {
  return new Date(value).toLocaleDateString();
}

async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) redirect("/auth/login");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) redirect("/auth/login");

  return { session, user };
}

export default async function ResourcesPage() {
  const { user } = await getCurrentUser();

  const resources = await prisma.resource.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      resourceType: true,
      category: true,
      url: true,
      createdAt: true,
    },
  });

  return (
    <div className="min-h-[calc(100vh-0px)] bg-muted/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6">
        <header className="rounded-2xl border border-violet-200/40 bg-gradient-to-r from-violet-50 via-white to-pink-50 p-6 shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-2xl shadow-lg">
                  📚
                </div>

                <div>
                  <h1 className="bg-gradient-to-r from-violet-700 via-fuchsia-600 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent">
                    Resources
                  </h1>

                  <p className="mt-1 text-muted-foreground">
                    Browse everything you've saved
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/resources/new">
                <Button
                  className="rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 px-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  + Add Resource
                </Button>
              </Link>

              <Link href="/">
                <Button
                  variant="outline"
                  className="rounded-xl border-violet-200 px-6 hover:bg-violet-50"
                >
                  Back to Dashboard
                </Button>
              </Link>
            </div>

          </div>
        </header>

        {resources.length === 0 ? (
          <div className="rounded-xl border bg-background p-8 text-center">
            <div className="mx-auto flex max-w-md flex-col items-center gap-2">
              <div className="text-base font-medium">No resources found</div>
              <div className="text-sm text-muted-foreground">
                Once you save resources, they&apos;ll appear here.
              </div>
            </div>
          </div>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <Card
                key={r.id}
                className="group overflow-hidden rounded-2xl border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <CardHeader className="pb-3">
                  <CardTitle
                    className="line-clamp-2 text-xl font-bold group-hover:text-violet-600"
                    title={r.title}
                  >
                    {r.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                      {r.resourceType}
                    </span>

                    {r.category && (
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                        {r.category}
                      </span>
                    )}
                    <span className="font-medium text-foreground">{r.category}</span>
                  </div>

                  <div className="rounded-lg border bg-muted/20 p-3">
                    <div className="text-xs font-medium text-muted-foreground">URL</div>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block break-all text-sm font-medium text-primary hover:underline"
                      title={r.url}
                    >
                      {r.url}
                    </a>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-medium text-muted-foreground">
                      Created
                    </div>
                    <div className="text-sm font-semibold">{formatDate(r.createdAt)}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}