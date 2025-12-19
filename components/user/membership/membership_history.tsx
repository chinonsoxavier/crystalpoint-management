"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, HistoryIcon } from "lucide-react";
import useMembershipStore from "@/app/user/membership/_membership_store";

export function MembershipHistory() {
  const { membershipHistory, loading, getMembershipHistory } =
    useMembershipStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMembershipHistory(currentPage);
  }, [currentPage, getMembershipHistory]);

  if (loading.history) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 w-48 rounded bg-muted" />
          <div className="h-4 w-32 rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 w-full rounded-lg bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!membershipHistory || membershipHistory.memberships.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Membership History</CardTitle>
          <CardDescription>No membership history found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <HistoryIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Your membership history will appear here once you activate a
              membership
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Membership History</CardTitle>
            <CardDescription>
              View your past and current memberships
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {membershipHistory.pagination.total} total
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {membershipHistory.memberships.map((item) => {
            const activatedDate = new Date(item.activatedAt);
            const isActive = item.status === "active";

            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      isActive ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    <HistoryIcon
                      className={`h-5 w-5 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">
                        {item.card.name}
                      </p>
                      <Badge
                        variant={isActive ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Activated on {activatedDate.toLocaleDateString()} at{" "}
                      {activatedDate.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    Tier {item.card.tier}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${item.card.requiredDeposit.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {membershipHistory.pagination.pages > 1 && (
          <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">
              Page {membershipHistory.pagination.page} of{" "}
              {membershipHistory.pagination.pages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(membershipHistory.pagination.pages, p + 1)
                  )
                }
                disabled={currentPage === membershipHistory.pagination.pages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
