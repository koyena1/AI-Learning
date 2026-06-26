"use client";

import * as React from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  return (
    <Button
      variant="secondary"
      disabled={isSigningOut}
      onClick={() => {
        setIsSigningOut(true);
        signOut({ callbackUrl: "/auth/login" });
      }}
    >
      {isSigningOut ? "Logging out..." : "Logout"}
    </Button>
  );
}

