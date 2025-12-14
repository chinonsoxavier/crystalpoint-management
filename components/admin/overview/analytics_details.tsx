"use client";
import { useAdminDashboardStore } from '@/app/admin/(routes)/(admin)/_admin_dashboard_store';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useEffect, useState } from 'react'
type Period = "7d" | "30d" | "90d" | "1y";

const AnalyticsDetails = () => {
    const [period, setPeriod] = useState<Period>("1y");
const {analytics,fetchAnalytics} = useAdminDashboardStore();

useEffect(() => {
  const getAnalytics = async ()=>{
    await fetchAnalytics(period);
  }
  getAnalytics();
console.log(analytics);
}, [period])


  const totalUsers = analytics?.user_registrations?.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  const totalDeposits = analytics?.deposits?.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0
  );
  const totalInvestments = analytics?.investments?.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0
  );
    const totalInvestmentsCount = analytics?.investments?.reduce(
      (acc, curr) => acc + curr.count,
      0
    );
  const depositCount = analytics?.deposits?.reduce((acc, curr) => acc + curr.count, 0);
  return (  
    <div>
      <Card className="bg-accent-foreground p-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Data Breakdown
            </h3>
            <p className="text-sm text-muted-foreground">
              Detailed metrics summary by period
            </p>
          </div>
          <Select
            value={period}
            onValueChange={(value) => setPeriod(value as Period)}
          >
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-6">
          {/* User Registrations Breakdown */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[oklch(0.488_0.243_264.376)]" />
                <span className="text-sm font-medium text-foreground">
                  User Registrations
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Users</span>
                <span className="font-medium text-foreground">
                  {totalUsers}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg per day</span>
                <span className="font-medium text-foreground">
                  {(
                    totalUsers ?? 0 /
                    (period === "7d"
                      ? 7
                      : period === "30d"
                      ? 30
                      : period === "90d"
                      ? 90
                      : 365)
                  ).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Deposits Breakdown */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[oklch(0.696_0.17_162.48)]" />
                <span className="text-sm font-medium text-foreground">
                  Deposits
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-medium text-foreground">
                  ${totalDeposits}
                  {analytics.deposits?.length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg deposit</span>
                <span className="font-medium text-foreground">
                  $
                  {depositCount > 0
                    ? (totalDeposits / depositCount).toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total count</span>
                <span className="font-medium text-foreground">
                  {depositCount}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Investments Breakdown */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[oklch(0.769_0.188_70.08)]" />
                <span className="text-sm font-medium text-foreground">
                  Investments
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-medium text-foreground">
                  ${totalInvestments}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg investment</span>
                <span className="font-medium text-foreground">
                  $
                  {totalInvestmentsCount > 0
                    ? (totalInvestments ?? 0 / totalInvestmentsCount).toFixed(2)
                    : "0.00"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total count</span>
                <span className="font-medium text-foreground">
                  {totalInvestments}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AnalyticsDetails