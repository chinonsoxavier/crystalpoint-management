"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight, Check, X } from "lucide-react"
import { useAdminWithdrawalsStore } from "./admin_withdrawals_store";
type Period = "7d" | "30d" | "90d" | "1y";


const mockWithdrawals = [
  {
    id: "1",
    userId: "user1",
    username: "john_doe",
    amount: 3000,
    status: "pending",
    date: "2024-01-15",
    method: "bitcoin",
  },
  {
    id: "2",
    userId: "user2",
    username: "jane_smith",
    amount: 5000,
    status: "approved",
    date: "2024-01-14",
    method: "ethereum",
  },
  {
    id: "3",
    userId: "user3",
    username: "mike_wilson",
    amount: 15000,
    status: "processed",
    date: "2024-01-13",
    method: "bank_transfer",
    txHash: "0x123abc",
  },
  {
    id: "4",
    userId: "user4",
    username: "sarah_jones",
    amount: 800,
    status: "pending",
    date: "2024-01-12",
    method: "usdt",
  },
  {
    id: "5",
    userId: "user5",
    username: "alex_brown",
    amount: 4000,
    status: "rejected",
    date: "2024-01-11",
    method: "bitcoin",
  },
]

export default function WithdrawalsPage() {
  const {fetchWithdrawalStats,fetchWithdrawals,withdrawalStats,withdrawals} = useAdminWithdrawalsStore();
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1);
      const [period, setPeriod] = useState<Period>("1y");
  const [methodFilter, setMethodFilter] = useState<
    "bitcoin" | "ethereum" | "usdt" | "bank_transfer" | undefined
  >();
  const [statusFilter, setStatusFilter] = useState<
    "pending" | "approved" | "processed" | "rejected" | undefined
  >();
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<(typeof withdrawals)[0] | null>(null)
  const [showActionModal, setShowActionModal] = useState(false)
  const [action, setAction] = useState<"approve" | "reject" | "process" | null>(null);

  useEffect(() => {
fetchWithdrawalStats(period);
fetchWithdrawals({page:1,status:statusFilter,method:methodFilter})
  }, [action,statusFilter])
  

  // const filteredWithdrawals = mockWithdrawals.filter(
  //   (withdrawal) =>
  //     (withdrawal.username.toLowerCase().includes(search.toLowerCase()) || withdrawal.id.includes(search)) &&
  //     (statusFilter === "all" || withdrawal.status === statusFilter),
  // )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "processed":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Withdrawals Management</h1>
        <p className="text-muted-foreground mt-1">
          Process and manage user withdrawal requests
        </p>
      </div>

      <Select
        value={period}
        onValueChange={(value) => setPeriod(value as Period)}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Filter by periods" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Periods</SelectItem>
          <SelectItem value="7d">7 Days</SelectItem>
          <SelectItem value="30d">30 Days</SelectItem>
          <SelectItem value="90d">90 Days</SelectItem>
          <SelectItem value="1y">1 Year</SelectItem>
        </SelectContent>
      </Select>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
        <Card className="">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Withdrawals</p>
            <p className="text-2xl font-bold mt-2">
              ${withdrawalStats?.overview.total_withdrawals ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold mt-2">
              ${withdrawalStats?.overview.pending_withdrawals}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Approved</p>
            <p className="text-2xl font-bold mt-2">
              ${withdrawalStats?.overview.approved_withdrawals}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Processed</p>
            <p className="text-2xl font-bold mt-2">
              ${withdrawalStats?.overview?.processed_withdrawals}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Average</p>
            <p className="text-2xl font-bold mt-2">
              ${withdrawalStats?.overview?.average_withdrawal}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Processed</p>
            <p className="text-2xl font-bold mt-2">
              ${withdrawalStats?.overview?.total_processed_amount}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Withdrawals</CardTitle>
          <CardDescription>Manage user withdrawal requests</CardDescription>
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
                placeholder="Search by username or withdrawal ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(
                  value as
                    | "pending"
                    | "approved"
                    | "processed"
                    | "rejected"
                    | undefined
                )
              }
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={methodFilter}
              onValueChange={(value) =>
                setMethodFilter(
                  value as
                    | "bitcoin"
                    | "ethereum"
                    | "usdt"
                    | "bank_transfer"
                    | undefined
                )
              }
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="usdt">Usdt</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Withdrawal ID</TableHead>
                  <TableHead>Wallet address</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.map((withdrawal) => (
                  <TableRow key={withdrawal._id}>
                    <TableCell className="font-mono text-sm">
                      {withdrawal._id}
                    </TableCell>
                    <TableCell>{withdrawal.walletAddress}</TableCell>
                    <TableCell>{withdrawal.user.username}</TableCell>
                    <TableCell className="font-bold">
                      ${withdrawal.amount.toLocaleString()}
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusColor(withdrawal.status)}>
                        {withdrawal.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{withdrawal.processedAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {withdrawal.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700 bg-transparent"
                              onClick={() => {
                                setSelectedWithdrawal(withdrawal);
                                setAction("approve");
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
                                setSelectedWithdrawal(withdrawal);
                                setAction("reject");
                                setShowActionModal(true);
                              }}
                            >
                              <X size={16} />
                            </Button>
                          </>
                        )}
                        {withdrawal.status === "approved" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal);
                              setAction("process");
                              setShowActionModal(true);
                            }}
                          >
                            Mark Processed
                          </Button>
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
              Showing {withdrawals.length} withdrawals
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page < 2}
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Modal */}
      <Dialog open={showActionModal} onOpenChange={setShowActionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === "approve"
                ? "Approve Withdrawal"
                : action === "reject"
                ? "Reject Withdrawal"
                : "Process Withdrawal"}
            </DialogTitle>
            <DialogDescription>
              {action === "approve"
                ? "Approve this withdrawal request"
                : action === "reject"
                ? "Reject this withdrawal request"
                : "Mark withdrawal as processed"}
            </DialogDescription>
          </DialogHeader>
          {selectedWithdrawal && (
            <div className="space-y-4">
              <div className="bg-secondary p-4 rounded">
                <p className="text-sm text-muted-foreground">
                  Withdrawal Amount
                </p>
                <p className="text-2xl font-bold">
                  ${selectedWithdrawal.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User</p>
                <p className="font-semibold">{selectedWithdrawal.user.username}</p>
              </div>
            

              {action === "reject" && (
                <Input placeholder="Reason for rejection" />
              )}
              {action === "process" && (
                <>
                  <Input placeholder="Transaction Hash" />
                  <Input placeholder="Processing Notes" />
                </>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowActionModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowActionModal(false)}
                  className={
                    action === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : action === "reject"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                >
                  {action === "approve"
                    ? "Approve"
                    : action === "reject"
                    ? "Reject"
                    : "Process"}{" "}
                  Withdrawal
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
