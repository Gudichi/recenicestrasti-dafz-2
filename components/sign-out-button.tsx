"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut({ redirectUrl: "/prijava" });
  };

  return (
    <Button
      className="bg-primary text-white font-bold"
      size="sm"
      onClick={handleSignOut}
    >
      Odjava <LogOut className="h-4 w-4" />
    </Button>
  );
}
