"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Crown, CalendarDays, TrendingUp } from "lucide-react";
import useMembershipStore from "@/app/user/membership/_membership_store";

export function CurrentMembership() {
  const { currentMembership,getCurrentMembership } =
    useMembershipStore();

  useEffect(() => {
    if (!currentMembership) {
      getCurrentMembership();
    }
  }, [currentMembership, getCurrentMembership]);


  if (!currentMembership?.membership) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Membership</CardTitle>
          <CardDescription>
            You don`t have an active membership yet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Activate a membership card to start enjoying exclusive benefits
          </p>
        </CardContent>
      </Card>
    );
  }

  const activatedDate = new Date(currentMembership?.membership?.activatedAt ?? '');
  const nextTierDeposit = currentMembership?.membership?.card?.requiredDeposit * 5;
  const currentDeposit = currentMembership?.membership?.card?.requiredDeposit;

  return (
    <Card className="border bg-accent-foreground">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl">Current Membership</CardTitle>
            <CardDescription>Your active membership details</CardDescription>
          </div>
          <Badge variant="default" className="gap-1">
            <Crown className="h-3 w-3" />
            Tier {currentMembership.currentTier}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-accent p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Crown className="h-5 w-5 text-black dark:text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Plan</p>
              <p className="font-semibold text-foreground">
                {currentMembership?.membership?.card?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border bg-accent p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays className="h-5 w-5 text-black dark:text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Activated</p>
              <p className="font-semibold text-foreground">
                {activatedDate.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border bg-accent p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-black dark:text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-semibold capitalize text-foreground">
                {currentMembership?.membership?.status}
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
