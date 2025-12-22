"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TransactionTable } from "@/components/layouts/transaction_table";
import { useEffect, useState } from "react";
import useDepositStore, { IDepositMethod } from "../../deposit/_deposit_store";
import { formatDate } from "@/utility/format_date";
import { X, Loader2, Clock, CheckCircle, XCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DepositLogs() {
  const {
    fetchDepositHistory,
    depositHistory,
    isDepositLoading,
    cancelPendingDeposit,
    isDepositCancelLoading,
  } = useDepositStore();

  const transactionColumns: ColumnDef<IDepositMethod>[] = [
    {
      accessorKey: "_id",
      header: "Transaction ID",
      cell: ({ row }) => (
        <div className="font-mono text-xs text-muted-foreground max-w-[100px] truncate">
          {row.getValue("_id")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        return (
          <div className="font-semibold">
            {formatDate(row.original.createdAt)}
          </div>
        );
      },
    },
    {
      accessorKey: "method",
      header: "Method",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="font-semibold">{formatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const deposit = row.original;
        const status = deposit.status as string;

        // Define status properties
        const getStatusProps = () => {
          switch (status) {
            case "confirmed":
              return {
                variant: "default" as const,
                icon: <CheckCircle className="h-3 w-3 mr-1" />,
                text: "CONFIRMED",
              };
            case "failed":
              return {
                variant: "destructive" as const,
                icon: <XCircle className="h-3 w-3 mr-1" />,
                text: "FAILED",
              };
            case "pending":
            default:
              return {
                variant: "secondary" as const,
                icon: <Clock className="h-3 w-3 mr-1" />,
                text: "PENDING",
              };
          }
        };

        const statusProps = getStatusProps();

        // For pending status, show badge with cancel button
        if (status === "pending") {
          return (
            <div className="flex items-center gap-2">
              <Badge variant={statusProps.variant} className="text-xs">
                {statusProps.icon}
                {statusProps.text}
              </Badge>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10 border-destructive/30"
                    disabled={isDepositCancelLoading}
                  >
                    {isDepositCancelLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Deposit</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel this pending deposit of{" "}
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(deposit.amount)}
                      </span>{" "}
                      via {deposit.method}? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Deposit</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => cancelPendingDeposit(deposit._id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Yes, Cancel Deposit
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          );
        }

        // For non-pending status, just show the badge
        return (
          <Badge variant={statusProps.variant} className="text-xs">
            {statusProps.icon}
            {statusProps.text}
          </Badge>
        );
      },
    },
  ];

  useEffect(() => {
    fetchDepositHistory(1);
  }, []);

  return (
    <TransactionTable
      columns={transactionColumns}
      data={depositHistory}
      searchColumn="method"
      searchPlaceholder="Filter by method..."
      isDataLoading={isDepositLoading}
    />
  );
}
