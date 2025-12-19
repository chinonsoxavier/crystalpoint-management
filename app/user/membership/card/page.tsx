"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import useMembershipStore from "../_membership_store";
import { MembershipCards } from "@/components/user/membership/membership_card";

export default function CardsPage() {
  const { getMembershipCards } = useMembershipStore();

  useEffect(() => {
    getMembershipCards();
  }, [getMembershipCards]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Membership Cards
              </h1>
              <p className="text-sm text-muted-foreground">
                Browse and activate membership tiers
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <MembershipCards />
      </main>
    </div>
  );
}
