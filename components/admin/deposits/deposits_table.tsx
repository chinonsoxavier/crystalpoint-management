"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { useAdminDepositsStore } from "@/app/admin/(routes)/deposits/admin_deposit_store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DepositsTableModal from "./deposits_table_modal";
type DepositStatus = "pending" | "confirmed" | "failed";

const DepositsTable = () => {
  const { deposits, fetchDeposits } = useAdminDepositsStore();
  const [action, setAction] = useState<"confirm" | "reject" | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<DepositStatus>("confirmed");
  const [selectedDeposit, setSelectedDeposit] = useState<
    (typeof deposits)[0] | null
  >(null);
  const [showActionModal, setShowActionModal] = useState(false);

  const filteredDeposits = deposits.filter(
    (deposit) =>
      (deposit?.deposits?.user.username
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        deposit?.deposits?.id?.includes(search)) &&
      (statusFilter === "confirmed" ||
        deposit?.deposits.status === statusFilter)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    fetchDeposits({ page: 1, limit: 100, status: statusFilter });
  }, [statusFilter]);

  const handleStatusFilterChange = (value: string) => {
    // Type assertion to ensure the value is of the correct type
    setStatusFilter(value as DepositStatus);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Deposits</CardTitle>
          <CardDescription>Manage user deposits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search by username or deposit ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deposit ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeposits.map((deposit) => (
                  <TableRow key={deposit.deposits.id}>
                    <TableCell className="font-mono text-sm">
                      {deposit.deposits.id}
                    </TableCell>
                    <TableCell>{deposit.deposits.user.username}</TableCell>
                    <TableCell className="font-bold">
                      ${deposit.deposits.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="capitalize">
                      {deposit.deposits.method.replace("_", " ")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(deposit.deposits.status)}
                      >
                        {deposit.deposits.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{deposit.deposits.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {deposit.deposits.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700 bg-transparent"
                              onClick={() => {
                                setSelectedDeposit(deposit);
                                setAction("confirm");
                                setShowActionModal(true);
                              }}
                            >
                              <Check size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                              onClick={() => {
                                setSelectedDeposit(deposit);
                                setAction("reject");
                                setShowActionModal(true);
                              }}
                            >
                              <X size={16} />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredDeposits.length} deposits
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <DepositsTableModal
        selectedDeposit={selectedDeposit}
        action={action}
        setShowActionModal={setShowActionModal}
        showActionModal={showActionModal}
      />
    </div>
  );
};

export default DepositsTable;
