// app/components/support/support-stats.tsx

"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, TrendingUp, Users, Clock } from "lucide-react";
import { StatCard } from "./stat_card";
import { useSupportStore } from "@/app/user/support/_support";

// Define the structure of the data from the API
type StatsData = {
  total_tickets: number;
  open_tickets: number;
  response_time: string; // e.g., "2 hours 30 minutes"
};

// Define the full API response structure
type StatsResponse = {
  success: boolean;
  message: string;
  data: StatsData;
};

export function SupportStats() {
  const {fetchStats,stats} = useSupportStore();

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Tickets"
        value={stats?.total_tickets.toLocaleString() || 0}
        icon={<TrendingUp className="h-5 w-5" />}
        description="All time"
      />
      <StatCard
        title="Open Tickets"
        value={stats?.open_tickets.toLocaleString() || 0}
        icon={<Users className="h-5 w-5" />}
        description="Awaiting response"
        trend={{
          value: "12%",
          isPositive: false,
        }}
      />
      <StatCard
        title="Avg. Response Time"
        value={stats?.response_time || 0}
        icon={<Clock className="h-5 w-5" />}
        description="Last 30 days"
        trend={{
          value: "5%",
          isPositive: true,
        }}
      />
   
    </div>
  );
}
