"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TransactionTable } from "@/components/layouts/transaction_table";
import useWithdrawStore from "../../withdraw/_withdraw_store";
import { useEffect } from "react";

// Define the specific type for this data
export interface Withdrawal {
  id: string;
  amount: number;
  user: string;
  status: string;
  walletAddress: string;
  createdAt: string;
  updatedAt?: string;
}

// Define the columns for this type
const withdrawalColumns: ColumnDef<Withdrawal>[] = [
  {
    accessorKey: "user",
    header: "User",
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
    accessorKey: "walletAddress",
    header: "Wallet",
    cell: ({ row }) => (
      <div className="font-mono text-xs max-w-[150px] truncate">
        {row.getValue("walletAddress")}
      </div>
    ),
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
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
];

export default function WithdrawalsTable() {
     const {
       fetchWithdrawalsHistory,
       withdrawalHistory,
     } = useWithdrawStore();
    
     useEffect(() => {
       fetchWithdrawalsHistory();
     }, []);

  return (
    
    <TransactionTable
      columns={withdrawalColumns}
      data={withdrawalHistory}
      searchColumn="user"
      searchPlaceholder="Filter by user..."
    />
  );
}
