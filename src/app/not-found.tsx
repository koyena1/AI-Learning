import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-sm text-muted-foreground">The link you followed is invalid.</p>
      <Link className="text-sm underline" href="/">
        Return home
      </Link>
    </div>
  );
}

