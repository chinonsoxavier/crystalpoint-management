"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronLeft, ChevronRight, Check, X } from "lucide-react"

const mockDeposits = [
  {
    id: "1",
    userId: "user1",
    username: "john_doe",
    amount: 5000,
    status: "pending",
    date: "2024-01-15",
    method: "bank_transfer",
  },
  {
    id: "2",
    userId: "user2",
    username: "jane_smith",
    amount: 10000,
    status: "confirmed",
    date: "2024-01-14",
    method: "bitcoin",
  },
  {
    id: "3",
    userId: "user3",
    username: "mike_wilson",
    amount: 25000,
    status: "confirmed",
    date: "2024-01-13",
    method: "ethereum",
  },
  {
    id: "4",
    userId: "user4",
    username: "sarah_jones",
    amount: 1500,
    status: "pending",
    date: "2024-01-12",
    method: "usdt",
  },
  {
    id: "5",
    userId: "user5",
    username: "alex_brown",
    amount: 8000,
    status: "failed",
    date: "2024-01-11",
    method: "bank_transfer",
  },
]

export default function DepositsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDeposit, setSelectedDeposit] = useState<(typeof mockDeposits)[0] | null>(null)
  const [showActionModal, setShowActionModal] = useState(false)
  const [action, setAction] = useState<"confirm" | "reject" | null>(null)

  const filteredDeposits = mockDeposits.filter(
    (deposit) =>
      (deposit.username.toLowerCase().includes(search.toLowerCase()) || deposit.id.includes(search)) &&
      (statusFilter === "all" || deposit.status === statusFilter),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Deposits Management</h1>
        <p className="text-muted-foreground mt-1">Review and manage user deposits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Deposits</p>
            <p className="text-2xl font-bold mt-2">$49,500</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold mt-2">$6,500</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Confirmed</p>
            <p className="text-2xl font-bold mt-2">$40,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Failed</p>
            <p className="text-2xl font-bold mt-2">$3,000</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deposits</CardTitle>
          <CardDescription>Manage user deposits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search by username or deposit ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
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
                  <TableRow key={deposit.id}>
                    <TableCell className="font-mono text-sm">{deposit.id}</TableCell>
                    <TableCell>{deposit.username}</TableCell>
                    <TableCell className="font-bold">${deposit.amount.toLocaleString()}</TableCell>
                    <TableCell className="capitalize">{deposit.method.replace("_", " ")}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(deposit.status)}>{deposit.status}</Badge>
                    </TableCell>
                    <TableCell>{deposit.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {deposit.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700 bg-transparent"
                              onClick={() => {
                                setSelectedDeposit(deposit)
                                setAction("confirm")
                                setShowActionModal(true)
                              }}
                            >
                              <Check size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                              onClick={() => {
                                setSelectedDeposit(deposit)
                                setAction("reject")
                                setShowActionModal(true)
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
            <p className="text-sm text-muted-foreground">Showing {filteredDeposits.length} deposits</p>
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

      {/* Action Modal */}
      <Dialog open={showActionModal} onOpenChange={setShowActionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{action === "confirm" ? "Confirm Deposit" : "Reject Deposit"}</DialogTitle>
            <DialogDescription>
              {action === "confirm" ? "Confirm this deposit transaction" : "Reject this deposit transaction"}
            </DialogDescription>
          </DialogHeader>
          {selectedDeposit && (
            <div className="space-y-4">
              <div className="bg-secondary p-4 rounded">
                <p className="text-sm text-muted-foreground">Deposit Amount</p>
                <p className="text-2xl font-bold">${selectedDeposit.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User</p>
                <p className="font-semibold">{selectedDeposit.username}</p>
              </div>
              {action === "reject" && <Input placeholder="Reason for rejection" />}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowActionModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowActionModal(false)}
                  className={action === "confirm" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
                >
                  {action === "confirm" ? "Confirm" : "Reject"} Deposit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
