"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAdminManagementStore } from "./_management_store";
import CreateAdmin from "@/components/admin/management/create_admin";
import EditAdmin from "@/components/admin/management/edit_admin";
import ViewAdminDetails from "@/components/admin/management/view_admin_details";
import { AdminAuthGuard } from "@/components/admin_auth_guard";
import { formatDate } from "@/utility/format_date";

export default function AdminsPage() {
  const {admins,fetchAdmins} = useAdminManagementStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAdmin, setSelectedAdmin] = useState<
    (typeof admins)[0] | null
  >(null);




useEffect(() => {
fetchAdmins()
}, [])


  return (
    <AdminAuthGuard requiredRole="super_admin" >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Management</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage admin accounts
            </p>
          </div>
          <CreateAdmin />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Accounts</CardTitle>
            <CardDescription>
              View and manage all administrator accounts
            </CardDescription>
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
                  placeholder="Search by username or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {admin.username}
                      </TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            admin.role === "super_admin"
                              ? "bg-purple-100 text-purple-800"
                              : admin.role === "admin"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {admin.role.replace("_", " ")}
                        </span>
                      </TableCell>

                      <TableCell>{formatDate(admin.createdAt ?? '')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <ViewAdminDetails
                            selectedAdmin={selectedAdmin}
                            admin={admin}
                            setSelectedAdmin={setSelectedAdmin}
                          />
                          <EditAdmin
                            setSelectedAdmin={setSelectedAdmin}
                            selectedAdmin={selectedAdmin}
                            admin={admin}
                          />
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
                Showing {admins.length} admins
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
      </div>
    </AdminAuthGuard>
  );
}
