"use client";

import * as React from "react";


export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-xl text-sm text-muted-foreground">
        {error.message || "Unknown error"}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-md bg-foreground px-4 py-2 text-background hover:opacity-90"
      >
        Try again
      </button>

    </div>
  );
}

