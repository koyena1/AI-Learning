import { NextResponse } from "next/server";

// Simple logout redirect target.
// Client should call next-auth signOut() for session invalidation.
export async function GET() {
  return NextResponse.redirect(
    new URL("/auth/login", process.env.NEXTAUTH_URL || "http://localhost:3000")
  );
}


