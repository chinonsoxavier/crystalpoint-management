// components/layouts/transaction_table.tsx
"use client";

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
import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTranslate } from "@/hooks/use_translate";

// This component is generic! It accepts a type `T` that extends object.
interface TransactionTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  searchColumn?: string; // Optional: which column to search in
  searchPlaceholder?: string; // Optional: placeholder for the search input
  isDataLoading?: boolean;
}

export function TransactionTable<T extends object>({
  data,
  columns,
  searchColumn = "id", // Default to searching by 'id'
  searchPlaceholder = "Filter...",
  isDataLoading,
}: TransactionTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // Add a state to track when data is loaded
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  const { t } = useTranslate();

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

  // Fix: Add data as a dependency to useEffect
  useEffect(() => {

    // Mark data as loaded
    if (data && data.length > 0) {
      setIsDataLoaded(true);
    }
  }, [data, table]);

  // Reset column filters when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      setColumnFilters([]);
    }
  }, [data]);

  return (
    <div className="space-y-4">
      {/* Filter Input - only shows if a searchColumn is provided */}
      {searchColumn && (
        <div className="flex items-center py-4">
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      )}

      {/* The Table Itself */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="md:text-lg">
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
                  className="hover:bg-muted/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="md:text-base text-sm">
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
                  {isDataLoading
                    ? t.admin.transactions.loadingData
                    : t.admin.transactions.noResults}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {t.admin.transactions.page}{" "}
          {table.getState().pagination.pageIndex + 1} {t.admin.transactions.of}{" "}
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
            {t.admin.transactions.previous}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t.admin.transactions.next}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
