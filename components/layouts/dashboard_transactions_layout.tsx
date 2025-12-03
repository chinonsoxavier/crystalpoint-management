"use client";

import LedgerBalance from "../shared/ledger_balance";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import React from "react";
import { Input } from "../ui/input";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Import the Badge component

// type Transaction = {
//   id: string;
//   amount: number;
//   date: Date;
//   recipient: string;
//   type: string;
//   status: "pending" | "processing" | "success" | "failed";
// };

interface Transaction {
  id: string;
  method: string;
  amount: number;
  transactionHash: string;
  status: string;
}


interface DashboardTransactionsLayoutProps {
  data: Transaction[];
}

export default function DashboardTransactionsLayout({
  data,
}: DashboardTransactionsLayoutProps) {
  // Define columns INSIDE the client component
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: "Transaction ID",
      // Make the ID less prominent with a monospace font and muted color
      cell: ({ row }) => (
        <div className="font-mono text-xs text-muted-foreground">
          {row.getValue("id")}
        </div>
      ),
    },
    // {
    //   accessorKey: "date",
    //   header: ({ column }) => (
    //     <Button
    //     //   variant="secondary"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       className="font-semibold bg-transparent text-white hover:bg-primary/20"
    //     >
    //       Date
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   ),
    //   // Format date to a more readable standard
    //   cell: ({ row }) => (
    //     <div className="font-medium">
    //       {row.original.date.toLocaleDateString("en-US", {
    //         year: "numeric",
    //         month: "short",
    //         day: "numeric",
    //       })}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "recipient",
      header: "Recipient",
      // Ensure long recipient names don't break the layout
      cell: ({ row }) => (
        <div
          className="font-medium truncate max-w-[150px]"
          title={row.getValue("recipient")}
        >
          {row.getValue("recipient")}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      // Use Intl.NumberFormat for professional currency formatting
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
      // Use the shadcn/ui Badge component for a clean look
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant: "default" | "secondary" | "destructive" | "outline" =
          status === "success"
            ? "default"
            : status === "failed"
            ? "destructive"
            : "secondary";

        return <Badge variant={variant}>{status.toUpperCase()}</Badge>;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize text-muted-foreground">
          {row.getValue("type")}
        </div>
      ),
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    // Main container with better spacing and background
    <div className="flex flex-col gap-6 p-4 md:p-6 h-full overflow-y-auto bg-accent">
      <LedgerBalance />

      {/* Summary Cards with improved styling and icons */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="text-sm font-medium text-muted-foreground">
              Approved
            </p>
          </div>
          <p className="text-2xl font-bold">$0.00</p>
        </div>
        <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm p-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
          </div>
          <p className="text-2xl font-bold">$0.00</p>
        </div>
      </div>

      {/* Transactions History Card */}
      <div className="rounded-lg border bg-accent-foreground text-card-foreground shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Transactions History</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter recipients..."
              value={
                (table.getColumn("recipient")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("recipient")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          {/* Table with improved styling and hover effects */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-muted/50 transition-colors" // Subtle hover effect
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* Enhanced Pagination with page numbers */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
