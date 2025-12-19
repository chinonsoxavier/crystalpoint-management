"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import useInvestStore, { IInvestLog } from "../_invest_store";


export default function InvestmentHistoryPage() {
  const [filteredLogs, setFilteredLogs] = useState<IInvestLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState<IInvestLog | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {investHistory,isFetchingInvestHistory,fetchInvestHistory } = useInvestStore();
  useEffect(() => {


  }, []);

  useEffect(() => {
    const filtered = investHistory?.filter(
      (log) =>
        log.plan.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredLogs(filtered);
  }, [searchTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };



  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
      case "failed":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };


  const handleViewDetails = (log: IInvestLog) => {
    setSelectedLog(log);
    setDialogOpen(true);
  };


  return (
    <div className="min-h-screen bg-accent p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Investment History
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete transaction history and investment logs
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by user, plan, or transaction type..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Logs</CardTitle>
            <CardDescription>
              {filteredLogs.length} transactions found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLogs.length === 0 ? (
                <div className="flex min-h-[200px] items-center justify-center">
                  <p className="text-muted-foreground">No transactions found</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div
                    key={log.plan.id}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/5"
                  >
                    <div className="flex items-center gap-4">
                     
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">
                            {log.plan.name}
                          </p>
                    
                        </div>
                     
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {formatCurrency(log.amount)}
                        </p>
                        <Badge
                          variant="outline"
                          className={getStatusColor(log.status)}
                        >
                          {log.status}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(log)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Investment Details</DialogTitle>
              <DialogDescription>
                Complete information about this transaction
              </DialogDescription>
            </DialogHeader>
            {selectedLog && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Transaction ID
                    </p>
                    <p className="mt-1 font-mono text-sm text-foreground">
                      {selectedLog._id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Plan ID
                    </p>
                    <p className="mt-1 font-mono text-sm text-foreground">
                      {selectedLog.plan.id}
                    </p>
                  </div>
                </div>

      

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Investment Plan
                  </p>
                  <p className="mt-1 text-foreground">{selectedLog.plan.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                 
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Status
                    </p>
                    <Badge
                      variant="outline"
                      className={`mt-1 ${getStatusColor(selectedLog.status)}`}
                    >
                      {selectedLog.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Amount
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {formatCurrency(selectedLog.amount)}
                  </p>
                </div>

               
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
