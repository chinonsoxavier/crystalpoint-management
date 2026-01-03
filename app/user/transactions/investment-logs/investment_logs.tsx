// app/user/transactions/investment-logs/investment_logs.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TransactionTable } from "@/components/layouts/transaction_table";
import useInvestStore, { IInvestLog } from "../../invest/_invest_store";
import { useEffect } from "react";
import { formatDate } from "@/utility/format_date";
import { useTranslate } from "@/hooks/use_translate";

// Define the columns for this type
const PlanColumns: ColumnDef<IInvestLog>[] = [
  {
    accessorKey: "name",
    header: "Investment Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.plan?.name ?? ""}</div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {formatDate(row.original?.startDate ?? "")}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {formatDate(row.original?.endDate ?? "")}
      </div>
    ),
  },
  {
    accessorKey: "roiPercentage",
    header: "ROI",
    cell: ({ row }) => <div>{row.original.plan?.roiPercentage ?? 0}%</div>,
  },
  {
    accessorKey: "durationDays",
    header: "Duration",
    cell: ({ row }) => <div>{row.original.plan?.durationDays ?? ""} Days</div>,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.plan?.isActive ?? false;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
];

export default function InvestMentLogs() {
  const { fetchInvestHistory, investHistory, isFetchingInvestHistory } =
    useInvestStore();
  const { t } = useTranslate();

  useEffect(() => {
    fetchInvestHistory(1);
  }, []);

  return (
    <TransactionTable
      columns={PlanColumns}
      data={investHistory}
      isDataLoading={isFetchingInvestHistory}
      searchColumn="name"
      searchPlaceholder={t.admin.transactions.filterByInvestmentName}
    />
  );
}
