"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import useMembershipStore from "../_membership_store";
import { CurrentMembership } from "@/components/user/membership/current_membership";
import { MembershipBenefits } from "@/components/user/membership/membership_benefits";

export default function OverviewPage() {
  const { getCurrentMembership, getMembershipBenefits } = useMembershipStore();

  useEffect(() => {
    getCurrentMembership();
    getMembershipBenefits();
  }, [getCurrentMembership, getMembershipBenefits]);

  return (
    <div className="min-h-screen bg-accent">
  

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <CurrentMembership />
          <MembershipBenefits />
        </div>
      </main>
    </div>
  );
}
