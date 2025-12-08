"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TransactionTable } from "@/components/layouts/transaction_table";
import useInvestStore from "../../invest/_invest_store";
import { useEffect } from "react";

// Define the specific type for this data
export interface IInvestPlans {
  id: string;
  name: string;
  description: string;
  roiPercentage: number;
  durationDays: number;
  minAmount: number;
  maxAmount: number;
  isActive: boolean; // Changed from true to boolean
  isFetchingMethods: boolean;
}

// Define the columns for this type
const PlanColumns: ColumnDef<IInvestPlans>[] = [
  {
    accessorKey: "name",
    header: "Investment Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "roiPercentage",
    header: "ROI",
    cell: ({ row }) => <div>{row.original.roiPercentage}%</div>,
  },
  {
    accessorKey: "durationDays",
    header: "Duration",
    cell: ({ row }) => <div>{row.original.durationDays} Days</div>,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
];

export default function InvestMentLogs() {
  const { fetchInvestHistory, investHistory } = useInvestStore();

  useEffect(() => {
    fetchInvestHistory(1);
  }, []);

  return (
    <TransactionTable
      columns={PlanColumns}
      data={investHistory}
      searchColumn="name"
      searchPlaceholder="Filter by investment name..."
    />
  );
}
