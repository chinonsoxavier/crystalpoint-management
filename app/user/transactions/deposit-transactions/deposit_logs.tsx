// app/user/transactions/deposit-transactions/deposit_logs.tsx
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
import { useTranslate } from "@/hooks/use_translate";

export default function DepositLogs() {
  const {
    fetchDepositHistory,
    depositHistory,
    isDepositLoading,
    cancelPendingDeposit,
    isDepositCancelLoading,
  } = useDepositStore();

  const { t } = useTranslate();

  // Helper function for string interpolation
  const interpolate = (template: string, values: Record<string, string | number>) => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return String(values[key] || match);
    });
  };

  const transactionColumns: ColumnDef<IDepositMethod>[] = [
    {
      accessorKey: "_id",
      header: t.admin.transactions.transactionId,
      cell: ({ row }) => (
        <div className="font-mono text-xs text-muted-foreground max-w-[100px] truncate">
          {row.getValue("_id")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t.admin.transactions.date,
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
      header: t.admin.transactions.method,
    },
    {
      accessorKey: "amount",
      header: t.admin.transactions.amount,
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
      header: t.admin.transactions.status,
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
                text: t.admin.transactions.confirmed.toUpperCase(),
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
                text: t.admin.transactions.pending.toUpperCase(),
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
                    <AlertDialogTitle>
                      {t.admin.transactions.cancelDeposit}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {interpolate(
                        t.admin.transactions.cancelDepositDescription,
                        {
                          amount: new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(deposit.amount),
                          method: deposit.method,
                        }
                      )}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {t.admin.transactions.keepDeposit}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => cancelPendingDeposit(deposit._id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {t.admin.transactions.yesCancelDeposit}
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
    fetchDepositHistory(1,20);
  }, []);

  return (
    <TransactionTable
      columns={transactionColumns}
      data={depositHistory}
      searchColumn="method"
      searchPlaceholder={t.admin.transactions.filterByMethod}
      isDataLoading={isDepositLoading}
    />
  );
}
