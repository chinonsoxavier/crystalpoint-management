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
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
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
import { formatDate } from "@/utility/format_date";
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

type DepositStatus = "pending_approval" | "confirmed" | "failed";

const DepositsTable = () => {
  const {
    deposits,
    fetchDeposits,
    confirmDeposit,
    rejectDeposit,
    isRejectingDeposit,
  } = useAdminDepositsStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<DepositStatus>("confirmed");
  const [selectedDeposit, setSelectedDeposit] = useState<
    (typeof deposits)[0] | null
  >(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [action, setAction] = useState<"confirm" | "reject" | null>(null);

  const getStatusProps = (status: string) => {
    switch (status) {
      case "pending_approval":
        return {
          variant: "secondary" as const,
          icon: <Clock className="h-3 w-3 mr-1" />,
          text: "PENDING",
        };
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
      default:
        return {
          variant: "outline" as const,
          icon: null,
          text: status.toUpperCase(),
        };
    }
  };

  useEffect(() => {
    fetchDeposits({ page: page, status: statusFilter });
  }, [statusFilter, page]);

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as DepositStatus);
  };

  const handleConfirm = async (depositId: string) => {
    try {
      await confirmDeposit(depositId);
      // Refresh the deposits list after successful action
      fetchDeposits({ page, status: statusFilter });
    } catch (error) {
      console.error("Error confirming deposit:", error);
    }
  };

  const handleReject = async (depositId: string) => {
    try {
      await rejectDeposit(depositId);
      // Refresh the deposits list after successful action
      fetchDeposits({ page, status: statusFilter });
    } catch (error) {
      console.error("Error rejecting deposit:", error);
    }
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
        
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending_approval">Pending</SelectItem>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {deposits.map((deposit) => (
                  <TableRow key={deposit?._id}>
                    <TableCell className="font-mono text-sm">
                      {deposit?._id ?? ""}
                    </TableCell>
                    <TableCell>{deposit?.user?.username ?? ""}</TableCell>
                    <TableCell className="font-bold">
                      ${deposit?.amount.toLocaleString() ?? ""}
                    </TableCell>
                    <TableCell className="capitalize">
                      {deposit?.method?.replace("_", " ") ?? ""} 
                    </TableCell>
                    <TableCell>
                      {deposit?.status === "pending_approval" ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            PENDING
                          </Badge>
                          <div className="flex gap-1">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2 text-xs text-green-600 hover:bg-green-50 border-green-200"
                                  disabled={isRejectingDeposit}
                                >
                                  {isRejectingDeposit ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    <Check className="h-3 w-3" />
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Confirm Deposit
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to confirm this
                                    deposit of{" "}
                                    <span className="font-semibold">
                                      ${deposit?.amount.toLocaleString()}
                                    </span>{" "}
                                    from {deposit?.user?.username}? This action
                                    cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleConfirm(deposit._id)}
                                    className="bg-green-600 text-white hover:bg-green-700"
                                  >
                                    Confirm Deposit
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2 text-xs text-red-600 hover:bg-red-50 border-red-200"
                                  disabled={isRejectingDeposit}
                                >
                                  {isRejectingDeposit ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Reject Deposit
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to reject this deposit
                                    of{" "}
                                    <span className="font-semibold">
                                      ${deposit?.amount.toLocaleString()}
                                    </span>{" "}
                                    from {deposit?.user?.username}? This action
                                    cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleReject(deposit._id)}
                                    className="bg-red-600 text-white hover:bg-red-700"
                                  >
                                    Reject Deposit
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      ) : (
                        <Badge
                          variant={getStatusProps(deposit?.status).variant}
                          className="text-xs"
                        >
                          {getStatusProps(deposit?.status).icon}
                          {getStatusProps(deposit?.status).text}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(deposit?.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {deposits.length} deposits
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => setPage(page - 1)}
                variant="outline"
                size="sm"
                disabled={page < 2}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                onClick={() => setPage(page + 1)}
                variant="outline"
                size="sm"
                disabled={deposits.length < 1}
              >
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
