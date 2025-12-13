"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  TrendingUp,
  Wallet,
  AlertCircle,
  DollarSign,
  Activity,
} from "lucide-react";
import { StatCard } from "@/components/admin/stat_card";
import { formatNumber } from "@/utility/format_number";
import { formatCurrency } from "@/utility/format_currency";
import { useAdminDashboardStore } from "./_admin_dashboard_store";

// const mockoverview = {
//   total_users: 15234,
//   total_deposits: 2150000,
//   total_withdrawals: 1850000,
//   total_investments: 5230000,
//   pending_withdrawals: 42,
//   open_tickets: 8,
//   new_users_today: 145,
//   total_deposit_amount: 125000,
//   total_withdrawal_amount: 98000,
//   total_investment_amount: 320000,
// };

const mockChartData = [
  { _id: "Jan 1", deposits: 4000, withdrawals: 2400, investments: 2400 },
  { _id: "Jan 2", deposits: 3000, withdrawals: 1398, investments: 2210 },
  { _id: "Jan 3", deposits: 2000, withdrawals: 9800, investments: 2290 },
  { _id: "Jan 4", deposits: 2780, withdrawals: 3908, investments: 2000 },
  { _id: "Jan 5", deposits: 1890, withdrawals: 4800, investments: 2181 },
  { _id: "Jan 6", deposits: 2390, withdrawals: 3800, investments: 2500 },
  { _id: "Jan 7", deposits: 3490, withdrawals: 4300, investments: 2100 },
];

// Define a consistent color palette for charts
const chartColors = {
  deposits: "hsl(var(--chart-1))",
  withdrawals: "hsl(var(--chart-2))",
  investments: "hsl(var(--chart-3))",
};

export default function DashboardPage() {
  const [period, setPeriod] = useState("7d");
  const { fetchDashboardOverview, overview, fetchAnalytics,analytics } =
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          <Card>
            <CardHeader>
              <CardTitle>Financial Activity</CardTitle>
              <CardDescription>
                Daily breakdown of deposits, withdrawals, and investments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={analytics}>
                  <defs>
                    <linearGradient
                      id="colorDeposits"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={chartColors.deposits}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={chartColors.deposits}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorWithdrawals"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={chartColors.withdrawals}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={chartColors.withdrawals}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="_id" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="deposits"
                    stackId="1"
                    stroke={chartColors.deposits}
                    fill="url(#colorDeposits)"
                  />
                  <Area
                    type="monotone"
                    dataKey="withdrawals"
                    stackId="1"
                    stroke={chartColors.withdrawals}
                    fill="url(#colorWithdrawals)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Users Today
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(overview?.new_users_today || 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Deposits Today
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(overview?.total_deposit_amount || 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +5% from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Open Support Tickets
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(overview?.open_tickets || 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  -2 from yesterday
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Transaction Analytics</CardTitle>
                <CardDescription>
                  Detailed view of all transactions.
                </CardDescription>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                {["7d", "30d", "90d"].map((p) => (
                  <Button
                    key={p}
                    variant={period === p ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPeriod(p)}
                  >
                    {p === "7d"
                      ? "7 Days"
                      : p === "30d"
                      ? "30 Days"
                      : "90 Days"}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={analytics}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="_id" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="deposits"
                    fill={chartColors.deposits}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="withdrawals"
                    fill={chartColors.withdrawals}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="investments"
                    fill={chartColors.investments}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
