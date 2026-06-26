import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth/auth";
import { prisma } from "@/lib/db";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LogoutButton from "./logout-button";


function formatResourceType(type: string) {
  return type
    .toString()
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) redirect("/auth/login");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) redirect("/auth/login");

  return { session, user };
}

export default async function DashboardPage() {
  const { user } = await getCurrentUser();

  const [totalResources, recentResources, resourcesByType] = await Promise.all([
    prisma.resource.count({ where: { userId: user.id } }),
    prisma.resource.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
     select: {
  id: true,
  title: true,
  resourceType: true,
  createdAt: true,
  url: true,
},
    }),
    prisma.resource.groupBy({
      by: ["resourceType"],
      where: { userId: user.id },
      _count: { id: true },
    }),

  ]);

  return (
    <div className="min-h-[calc(100vh-0px)] bg-muted/40">
      <div className="mx-auto flex w-full max-w-7xl gap-4 px-4 py-6">
        <aside className="hidden w-60 shrink-0 rounded-xl border bg-background p-4 md:block">
          <div className="space-y-2">
            <div className="text-sm font-semibold">AI Learning Vault</div>
            <div className="text-xs text-muted-foreground">Dashboard</div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="text-xs font-medium text-muted-foreground">Quick stats</div>
            <div className="text-sm">Resources: {totalResources}</div>
          </div>
          <div className="mt-6 text-xs text-muted-foreground">
            Signed in as <span className="font-medium">{user.email}</span>
          </div>
        </aside>

        <main className="flex-1">
          <header className="flex flex-col gap-3 rounded-xl border bg-background p-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Welcome{user.name ? `, ${user.name}` : ""}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <LogoutButton />
            </div>
          </header>

          <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Total Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{totalResources}</div>
                <div className="mt-1 text-xs text-muted-foreground">All resources you&apos;ve saved</div>
              </CardContent>
            </Card>

            <Card className="shadow-sm sm:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Resources</CardTitle>
              </CardHeader>
              <CardContent>
                {recentResources.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No resources yet.</div>
                ) : (
                  <div className="space-y-3">
                    {recentResources.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-start justify-between gap-3 rounded-lg border bg-muted/30 p-3"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium" title={r.title}>
                            {r.title}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {r.resourceType} • {new Date(r.createdAt).toLocaleDateString()}

                          </div>
                        </div>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-xs font-medium text-primary hover:underline"
                        >
                          Open
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Resource Types</CardTitle>
              </CardHeader>
              <CardContent>
                {resourcesByType.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No data yet.</div>
                ) : (
                  <div className="space-y-2">
                    {resourcesByType
.sort((a, b) => (b._count as any).id - (a._count as any).id)
                      .map((row) => (
                        <div
                          key={row.resourceType}

                          className="flex items-center justify-between gap-3"

                        >
                          <div className="text-sm">
                            {row.resourceType}

                          </div>
                          <div className="text-sm font-semibold">{row._count.id}</div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}

