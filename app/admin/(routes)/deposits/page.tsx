"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminDepositsStore } from "./admin_deposit_store";
import DepositsTable from "@/components/admin/deposits/deposits_table";
import { formatCurrency } from "@/utility/format_currency";


type Period = "7d" | "30d" | "90d" | "1y";

export default function DepositsPage() {
  const { fetchDepositStats, depositStats,deposits } =
    useAdminDepositsStore();
  const [period, setPeriod] = useState<Period>("1y");
  useEffect(() => {
    fetchDepositStats(period);
  }, [period]);



  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Deposits Management</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage user deposits
        </p>
      </div>

      <div>
        <div className="pb-5 flex w-full items-center justify-end">
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
        <div className="grid grid-cols-1 md:grid-cols-2 medium:grid-cols-3 gap-4">
          <Card>
            <CardContent className="">
              <p className="text-sm text-muted-foreground">Total Deposits</p>
              <p className="text-2xl font-bold mt-2">
                $ {formatCurrency(depositStats?.stats?.total_deposits || 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold mt-2">
                $ {formatCurrency(depositStats?.stats?.pending_deposits || 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="">
              <p className="text-sm text-muted-foreground">Confirmed</p>
              <p className="text-2xl font-bold mt-2">
                $ {formatCurrency(depositStats?.stats?.confirmed_deposits || 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="">
              <p className="text-sm text-muted-foreground">Average</p>
              <p className="text-2xl font-bold mt-2">
                $ {Math.round(depositStats?.stats?.average_amount || 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="">
              <p className="text-sm text-muted-foreground">Total Amount </p>
              <p className="text-2xl font-bold mt-2">
                $ {formatCurrency(depositStats?.stats?.total_amount || 0)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <DepositsTable />

    
    </div>
  );
}
