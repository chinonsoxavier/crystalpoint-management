"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"

const mockAdmins = [
  {
    id: "1",
    name: "Super Admin",
    email: "super@admin.com",
    role: "super_admin",
    status: "active",
    lastLogin: "2024-01-15 10:30",
  },
  {
    id: "2",
    name: "Admin One",
    email: "admin1@admin.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-14 15:45",
  },
  {
    id: "3",
    name: "Admin Two",
    email: "admin2@admin.com",
    role: "admin",
    status: "inactive",
    lastLogin: "2024-01-10 08:00",
  },
]

export default function SettingsPage() {
  const [showCreateAdmin, setShowCreateAdmin] = useState(false)
  const [showFinancialModal, setShowFinancialModal] = useState(false)
  const [startDate, setStartDate] = useState("2024-01-01")
  const [endDate, setEndDate] = useState("2024-01-31")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground mt-1">Manage admin accounts and platform settings</p>
      </div>

      <Tabs defaultValue="admins" className="space-y-4">
        <TabsList>
          <TabsTrigger value="admins">Admin Management</TabsTrigger>
          <TabsTrigger value="financial">Financial Summary</TabsTrigger>
          <TabsTrigger value="deposit-stats">Deposit Stats</TabsTrigger>
          <TabsTrigger value="withdrawal-stats">Withdrawal Stats</TabsTrigger>
        </TabsList>

        {/* Admin Management */}
        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Manage Admins</CardTitle>
                  <CardDescription>Create, edit, and manage admin accounts</CardDescription>
                </div>
                <Button onClick={() => setShowCreateAdmin(true)}>
                  <Plus size={16} className="mr-2" />
                  Create Admin
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAdmins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell className="capitalize">{admin.role.replace("_", " ")}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              admin.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {admin.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{admin.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit size={16} />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Summary */}
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>View platform financial metrics for a date range</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-1">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">End Date</label>
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-2" />
                </div>
                <div className="flex items-end">
                  <Button onClick={() => setShowFinancialModal(true)}>Generate Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Data Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold mt-2">$125,430</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <p className="text-2xl font-bold mt-2">$450,000</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Withdrawals</p>
                <p className="text-2xl font-bold mt-2">$380,000</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-2xl font-bold mt-2">$70,000</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Active Investments</p>
                <p className="text-2xl font-bold mt-2">245</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Deposit Stats */}
        <TabsContent value="deposit-stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deposit Statistics</CardTitle>
              <CardDescription>Choose a time period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                {["7d", "30d", "90d", "1y"].map((p) => (
                  <Button key={p} variant="outline">
                    {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : p === "90d" ? "90 Days" : "1 Year"}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-secondary p-4 rounded">
                  <p className="text-sm text-muted-foreground">Average Deposit</p>
                  <p className="text-2xl font-bold mt-2">$4,500</p>
                </div>
                <div className="bg-secondary p-4 rounded">
                  <p className="text-sm text-muted-foreground">Total Deposits</p>
                  <p className="text-2xl font-bold mt-2">$450,000</p>
                </div>
                <div className="bg-secondary p-4 rounded">
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold mt-2">96.2%</p>
                </div>
                <div className="bg-secondary p-4 rounded">
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-2xl font-bold mt-2">1,234</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Withdrawal Stats */}
        <TabsContent value="withdrawal-stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Statistics</CardTitle>
              <CardDescription>Choose a time period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                {["7d", "30d", "90d", "1y"].map((p) => (
                  <Button key={p} variant="outline">
                    {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : p === "90d" ? "90 Days" : "1 Year"}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-secondary p-4 rounded">
                  <p className="text-sm text-muted-foreground">Average Withdrawal</p>
                  <p className="text-2xl font-bold mt-2">$3,100</p>
                </div>
                <div className="bg-secondary p-4 rounded">
                  <p className="text-sm text-muted-foreground">Total Withdrawals</p>
                  <p className="text-2xl font-bold mt-2">$380,000</p>
                </div>
                <div className="bg-secondary p-4 rounded">
                  <p className="text-sm text-muted-foreground">Processing Rate</p>
                  <p className="text-2xl font-bold mt-2">98.5%</p>
                </div>
                <div className="bg-secondary p-4 rounded">
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-2xl font-bold mt-2">892</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Admin Modal */}
      <Dialog open={showCreateAdmin} onOpenChange={setShowCreateAdmin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Admin</DialogTitle>
            <DialogDescription>Add a new admin account to the platform</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Full Name" />
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="Temporary Password" type="password" />
            <Select defaultValue="admin">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowCreateAdmin(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateAdmin(false)}>Create Admin</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
