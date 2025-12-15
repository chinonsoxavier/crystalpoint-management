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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, ChevronLeft, ChevronRight, Edit, Eye } from "lucide-react";
import { useAdminUsersStore } from "./admin_users_store";
import { formatDate } from "@/utility/format_date";
type IDepositType = "deposit" | 'withdraw';
type ITier = "tier1" | "tier2" | "tier3";
export default function UsersPage() {
  const { updateUserBalance,updateUserTier,updateUserStatus,isUpdatingBalance,isUpdatingTier,isUpdatingStatus, users, fetchUsers } = useAdminUsersStore();
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null
  );
  const [tierFilter, setTierFilter] = useState<ITier>('tier1');
  const [depositType, setDepositType] = useState<IDepositType>("deposit");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [page, setPage] = useState();
  const filteredUsers = users.filter(
    (user) =>
      (user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())) &&
      (tierFilter === "tier1" || user.tier.toString() === tierFilter)
  );

  
  useEffect(() => {
    fetchUsers({ page: page, limit: 100 });
  }, []);

const handleSubmit = (e:React.FormEvent)=>{
  e.preventDefault();
}

        const handleTierFilterChange = (value: string) => {
          // Type assertion to ensure the value is of the correct type
          setTierFilter(value as ITier);
        };

        const handleDepositTypeChange = (value: string) => {
          // Type assertion to ensure the value is of the correct type
          setDepositType(value as IDepositType);
        };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage user accounts, balance, and tier settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            View and manage all registered users
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
            <Select value={tierFilter} onValueChange={handleTierFilterChange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="1">Tier 1</SelectItem>
                <SelectItem value="2">Tier 2</SelectItem>
                <SelectItem value="3">Tier 3</SelectItem>
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
                  <TableHead>Tier</TableHead>
                  <TableHead>Deposited</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user,index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                        Tier {user.tier}
                      </span>
                    </TableCell>
                    <TableCell>${user.balance.deposit ?? 0}</TableCell>

                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit size={16} />
                        </Button>
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
              Showing {filteredUsers.length} users
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft size={16} />
              </Button>
              <Button
                // onClick={() => setPage(page + 1)}
                variant="outline"
                size="sm"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View User Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View user information and statistics
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-semibold">{selectedUser.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tier</p>
                <p className="font-semibold">Tier {selectedUser.tier}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deposited</p>
                <p className="font-semibold">${selectedUser.balance.deposit}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <p className="font-semibold">
                  ${selectedUser.balance.deposit ?? 0}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-semibold">
                  {formatDate(selectedUser.createdAt)}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user balance, status, or tier
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <form className="space-y-4" onSubmit={handleSubmit} >  
              <div>
                <label className="text-sm font-medium">
                  Add/Remove Balance
                </label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Amount"
                    className="flex-1"
                  />
                  <Select value={depositType} onValueChange={handleDepositTypeChange}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deposit">Deposit</SelectItem>
                      <SelectItem value="withdraw">Withdraw</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input placeholder="Reason for adjustment" className="mt-2" />
              </div>

              <div>
                <label className="text-sm font-medium">Update Tier</label>
                <Select onValueChange={handleTierFilterChange} value={selectedUser.tier.toString()}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tier1">Tier 1</SelectItem>
                    <SelectItem value="tier2">Tier 2</SelectItem>
                    <SelectItem value="tier3">Tier 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <DialogClose>
                  <Button
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                  <Button>
                    Save Changes
                  </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
