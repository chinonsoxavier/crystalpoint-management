"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle2,
} from "lucide-react";
import useInvestStore from "../_invest_store";

interface InvestmentStats {
  totalInvested: number;
  totalProfit: number;
  activeCount: number;
  completedCount: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: InvestmentStats;
}

export default function InvestmentStatsPage() {
    const {investmentStats,fetchInvestStats,isFetchingInvestStats} = useInvestStore();

  useEffect(() => {
    fetchInvestStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  if (isFetchingInvestStats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const totalValue = investmentStats?.totalInvested  + investmentStats?.totalProfit;
  const profitPercentage = (
    (investmentStats.totalProfit / investmentStats.totalInvested) *
    100
  ).toFixed(2);
  const avgInvestmentValue =
    investmentStats.totalInvested / (investmentStats.activeCount + investmentStats.completedCount);

  return (
    <div className="min-h-screen bg-accent p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Investment Statistics
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Comprehensive overview of investment performance and metrics
          </p>
        </div>

        {/* Primary Stats Grid */}
        <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Invested
                </CardTitle>
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {formatCurrency(investmentStats.totalInvested)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Across{" "}
                  {formatNumber(investmentStats.activeCount + investmentStats.completedCount)}{" "}
                  investments
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Profit
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {formatCurrency(investmentStats.totalProfit)}
                </p>
                <p className="text-xs text-emerald-500">
                  +{profitPercentage}% overall return
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Investments
                </CardTitle>
                <Activity className="h-5 w-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {formatNumber(investmentStats.activeCount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Currently generating returns
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-violet-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completed Investments
                </CardTitle>
                <CheckCircle2 className="h-5 w-5 text-violet-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {formatNumber(investmentStats.completedCount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Successfully matured
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Insights */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Overview</CardTitle>
              <CardDescription>
                Key investment metrics and ratios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Portfolio Value
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(totalValue)}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-emerald-500"
                    style={{
                      width: `${(investmentStats.totalInvested / totalValue) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Average Investment Size
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(avgInvestmentValue)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Success Rate
                  </span>
                  <span className="font-semibold text-foreground">
                    {(
                      (investmentStats.completedCount /
                        (investmentStats.activeCount + investmentStats.completedCount)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-violet-500"
                    style={{
                      width: `${
                        (investmentStats.completedCount /
                          (investmentStats.activeCount + investmentStats.completedCount)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Distribution</CardTitle>
              <CardDescription>Active vs completed breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-lg bg-orange-500/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Active
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {formatNumber(investmentStats.activeCount)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Percentage</p>
                    <p className="text-lg font-semibold text-foreground">
                      {(
                        (investmentStats.activeCount /
                          (investmentStats.activeCount + investmentStats.completedCount)) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-violet-500/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-violet-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Completed
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {formatNumber(investmentStats.completedCount)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Percentage</p>
                    <p className="text-lg font-semibold text-foreground">
                      {(
                        (investmentStats.completedCount /
                          (investmentStats.activeCount + investmentStats.completedCount)) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Total Investments
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatNumber(investmentStats.activeCount + investmentStats.completedCount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
