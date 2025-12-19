"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Gift } from "lucide-react";
import useMembershipStore from "@/app/user/membership/_membership_store";

export function MembershipBenefits() {
  const { membershipBenefits, loading, getMembershipBenefits } =
    useMembershipStore();

  useEffect(() => {
    if (!membershipBenefits) {
      getMembershipBenefits();
    }
  }, [membershipBenefits, getMembershipBenefits]);

  if (loading.benefits) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 w-48 rounded bg-muted" />
          <div className="h-4 w-32 rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-full rounded bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!membershipBenefits) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Membership Benefits</CardTitle>
          <CardDescription>
            Activate a membership to see your benefits
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Gift className="h-5 w-5 text-black dark:text-white" />
          </div>
          <div>
            <CardTitle>Your Benefits</CardTitle>
            <CardDescription>
              {membershipBenefits.name} • Tier {membershipBenefits.tier}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {membershipBenefits.benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-black dark:text-white" />
              <p className="text-sm text-foreground">{benefit}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
