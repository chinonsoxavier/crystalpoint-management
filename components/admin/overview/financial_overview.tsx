'use client'
import { useAdminDashboardStore } from '@/app/admin/(routes)/(admin)/_admin_dashboard_store';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'

const FinancialOverview = () => {
  const {financialSummary,fetchFinancialSummary} = useAdminDashboardStore();
    const [startDate, setStartDate] = useState(() => {
      const date = new Date();
      date.setMonth(date.getMonth() - 1);
      return date.toISOString().split("T")[0];
    });
    const [endDate, setEndDate] = useState(
      () => new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
    fetchFinancialSummary(startDate,endDate)
    }, [startDate,endDate])
    

  return (
    <div className="">
      <Card className="bg-accent-foreground p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Financial Overview
          </h3>
          <p className="text-sm text-muted-foreground">
            Revenue, deposits, withdrawals, and profit metrics
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="mb-6 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Start Date
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="mb-2 block text-sm font-medium text-foreground">
              End Date
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Financial Metrics Table */}
        <div className="space-y-4">
          <div className="flex justify-between border-b border-border pb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </span>
            <span className="text-lg font-semibold text-foreground">
              ${financialSummary?.total_revenue.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-b border-border pb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Total Deposits
            </span>
            <span className="text-lg font-semibold text-foreground">
              ${financialSummary?.total_deposits.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-b border-border pb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Total Withdrawals
            </span>
            <span className="text-lg font-semibold text-foreground">
              ${financialSummary?.total_withdrawals.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-b border-border pb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Net Profit
            </span>
            <span className="text-lg font-semibold text-chart-2">
              ${financialSummary?.net_profit.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-b border-border pb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Active Investments
            </span>
            <span className="text-lg font-semibold text-foreground">
              {financialSummary?.active_investments}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-sm font-medium text-muted-foreground">
              Date Range
            </span>
            <span className="text-sm font-medium text-foreground">
              {financialSummary?.date_range.start_date} to{" "}
              {financialSummary?.date_range.end_date}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default FinancialOverview