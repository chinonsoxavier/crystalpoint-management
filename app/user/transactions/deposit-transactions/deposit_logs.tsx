"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TransactionTable } from "@/components/layouts/transaction_table";
import { Transactions } from "./page";
import { useEffect } from "react";
import useDepositStore from "../../deposit/_deposit_store";

// Define the columns for this type
const transactionColumns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => (
      <div className="font-mono text-xs text-muted-foreground max-w-[100px] truncate">
        {row.getValue("id")}
      </div>
    ),
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
      const status = row.getValue("status") as string;
      const variant =
        status === "completed"
          ? "default"
          : status === "failed"
          ? "destructive"
          : "secondary";
      return <Badge variant={variant}>{status.toUpperCase()}</Badge>;
    },
  },
];

interface TransactionsTableProps {
  data: Transactions[];
}

export default function DepositLogs() {
      const {
        fetchDepositHistory,
        depositHistory,
      } = useDepositStore();
   
      useEffect(() => {
        fetchDepositHistory(1);
      }, []);
  return (
    <TransactionTable
      columns={transactionColumns}
      data={depositHistory}
      searchColumn="method"
      searchPlaceholder="Filter by method..."
    />
  );
}
