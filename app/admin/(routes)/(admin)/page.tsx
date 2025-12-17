"use client";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Wallet,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import { StatCard } from "@/components/admin/stat_card";
import { formatNumber } from "@/utility/format_number";
import { formatCurrency } from "@/utility/format_currency";
import { useAdminDashboardStore } from "./_admin_dashboard_store";
import AnalyticsDetails from "@/components/admin/overview/analytics_details";
import FinancialOverview from "@/components/admin/overview/financial_overview";
export default function DashboardPage() {
  const { fetchDashboardOverview, overview, fetchAnalytics } =
    useAdminDashboardStore();
  useEffect(() => {
    fetchDashboardOverview();
    fetchAnalytics("1y");
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here`s your platform overview.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 grid-cols-2">
        <StatCard
          title="Total Users"
          value={formatNumber(overview?.total_users || 0)}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Deposits"
          value={formatCurrency(overview?.total_deposits || 0)}
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Total Withdrawals"
          value={formatCurrency(overview?.total_withdrawals || 0)}
          icon={Wallet}
          trend={{ value: 3, isPositive: false }}
        />
        <StatCard
          title="Pending Withdrawals"
          value={formatNumber(overview?.pending_withdrawals || 0)}
          description="Requires action"
          icon={AlertCircle}
        />
      </div>

      {/* Charts and Details Section */}
      <Tabs defaultValue="overview?" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview?">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview?" className="space-y-4">
          <AnalyticsDetails />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <FinancialOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
