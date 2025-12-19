"use client";

import { useEffect, useMemo, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useAdminManagementStore } from "./_management_store";
import CreateAdmin from "@/components/admin/management/create_admin";
import EditAdmin from "@/components/admin/management/edit_admin";
import ViewAdminDetails from "@/components/admin/management/view_admin_details";
import { AdminAuthGuard } from "@/components/admin_auth_guard";
import { formatDate } from "@/utility/format_date";

export default function AdminsPage() {
  const { admins, fetchAdmins } = useAdminManagementStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedAdmin, setSelectedAdmin] = useState<(typeof admins)[0] | null>(
    null
  );

  // Fetch admins on mount
  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // Filter admins based on search query (username or email)
  const filteredAdmins = useMemo(() => {
    if (!search.trim()) return admins;

    const lowerSearch = search.toLowerCase().trim();

    return admins.filter(
      (admin) =>
        admin.username.toLowerCase().includes(lowerSearch) ||
        admin.email.toLowerCase().includes(lowerSearch)
    );
  }, [admins, search]);

  // Pagination logic (client-side)
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredAdmins.length / ITEMS_PER_PAGE);
  const paginatedAdmins = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredAdmins.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAdmins, page]);

  // Reset page to 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <AdminAuthGuard requiredRole="super_admin">
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

          <CardContent className="space-y-6">
            {/* Search Input */}
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  placeholder="Search by username or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Results Info */}
            {search && (
              <p className="text-sm text-muted-foreground">
                Found {filteredAdmins.length} admin
                {filteredAdmins.length !== 1 ? "s" : ""} matching{" "}
                <span className="font-medium">{`"${search}"`}</span>
              </p>
            )}

            {/* Table */}
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAdmins.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-muted-foreground"
                      >
                        {search
                          ? "No admins found matching your search."
                          : "No admins available."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedAdmins.map((admin) => (
                      <TableRow key={admin._id || admin.email}>
                        <TableCell className="font-medium">
                          {admin.username}
                        </TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
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
                        <TableCell>
                          {formatDate(admin.createdAt ?? "")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <ViewAdminDetails
                              selectedAdmin={selectedAdmin}
                              admin={admin}
                              setSelectedAdmin={setSelectedAdmin}
                            />
                            <EditAdmin
                              selectedAdmin={selectedAdmin}
                              setSelectedAdmin={setSelectedAdmin}
                              admin={admin}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Page {page} of {totalPages} ({filteredAdmins.length} total)
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminAuthGuard>
  );
}
