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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Crown,
  Star,
  Shield,
} from "lucide-react";
import { useAdminUsersStore } from "./admin_users_store";
import { formatDate } from "@/utility/format_date";

type IDepositType = "deposit" | "bonus";
type ITierFilter = "all" | "1" | "2" | "3";
type ITierString = "1" | "2" | "3" | undefined;

// Tier information for display
const tierInfo = {
  "1": {
    name: "Tier 1",
    icon: Shield,
    color: "bg-gray-100 text-gray-800",
    borderColor: "border-gray-300",
  },
  "2": {
    name: "Tier 2",
    icon: Star,
    color: "bg-blue-100 text-blue-800",
    borderColor: "border-blue-300",
  },
  "3": {
    name: "Tier 3",
    icon: Crown,
    color: "bg-purple-100 text-purple-800",
    borderColor: "border-purple-300",
  },
};

export default function UsersPage() {
  const {
    updateUserBalance,
    updateUserTier,
    updateUserStatus,
    isUpdatingBalance,
    isUpdatingTier,
    isUpdatingStatus,
    users,
    fetchUsers,
  } = useAdminUsersStore();

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null
  );
  const [tierFilter, setTierFilter] = useState<ITierFilter>("all");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [page, setPage] = useState(1);

  // State for balance update
  const [balanceAmount, setBalanceAmount] = useState<number>(0);
  const [balanceReason, setBalanceReason] = useState<string>("");
  const [depositType, setDepositType] = useState<IDepositType>("deposit");

  // State for tier update
  const [newTier, setNewTier] = useState<ITierString>("1");

  useEffect(() => {
    fetchUsers({
      page,
      limit: 100,
      tier: tierFilter === "all" ? undefined : tierFilter,
    });
  }, [page, tierFilter]);

  // Reset form when a new user is selected
  useEffect(() => {
    if (selectedUser) {
      setBalanceAmount(selectedUser.balance?.deposit ?? 0);
      setBalanceReason("");
      setDepositType("deposit");
      setNewTier(selectedUser.tier?.toString() as ITierString);
    }
  }, [selectedUser]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "processed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handler for updating balance
  const handleBalanceUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const amount = Number(balanceAmount);
    if (isNaN(amount) || amount <= 0) {
      // You can add a snackbar notification here
      console.error("Invalid amount");
      return;
    }

    await updateUserBalance(
      selectedUser._id,
      depositType,
      amount,
      balanceReason || "Balance adjustment"
    );
    setShowEditModal(false); // Close modal after successful update
  };

  // Handler for updating tier
  const handleTierUpdate = async () => {
    if (!selectedUser || !newTier) return;

    await updateUserTier(selectedUser._id, parseInt(newTier));
    setShowEditModal(false); // Close modal after successful update
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
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
            <Select
              value={tierFilter}
              onValueChange={(value: ITierFilter) => setTierFilter(value)}
            >
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
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          tierInfo[user.tier ?? 1]?.color ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {user.tier ? `Tier ${user.tier}` : "No Tier"}
                      </Badge>
                    </TableCell>
                    <TableCell>${user.balance.deposit ?? 0}</TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
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
              Showing {users.length} users
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextPage}>
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
                <Badge
                  className={
                    tierInfo[selectedUser.tier ?? 1]?.color ||
                    "bg-gray-100 text-gray-800"
                  }
                >
                  {selectedUser.tier ? `Tier ${selectedUser.tier}` : "No Tier"}
                </Badge>
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

      {/* Edit User Modal with Separated Sections */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user balance, status, or tier
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Balance Management Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Balance Management</CardTitle>
                  <CardDescription>
                    Add or remove funds from the user`s account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBalanceUpdate} className="space-y-2">
                    <div className="flex w-full">
                      <div className="w-full" >
                        <Label htmlFor="deposit-type">Transaction Type</Label>
                        <Select
                          value={depositType}
                          onValueChange={(value: IDepositType) =>
                            setDepositType(value)
                          }
                        >
                          <SelectTrigger id="deposit-type">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="deposit">Deposit</SelectItem>
                            <SelectItem value="bonus">Bonus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full" >
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={balanceAmount}
                          onChange={(e) =>
                            setBalanceAmount(Number(e.target.value))
                          }
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="reason">Reason</Label>
                      <Input
                        id="reason"
                        value={balanceReason}
                        onChange={(e) => setBalanceReason(e.target.value)}
                        placeholder="Reason for adjustment"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full mt-4"
                      disabled={isUpdatingBalance}
                    >
                      {isUpdatingBalance ? "Updating..." : "Update Balance"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Tier Management Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tier Management</CardTitle>
                  <CardDescription>
                    Change the user`s access level and benefits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current Tier Display */}
                  <div
                    className={`p-4 rounded-lg border ${
                      tierInfo[selectedUser.tier ?? "1"]?.borderColor ||
                      "border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Extract Icon safely */}
                      {(() => {
                        const Icon =
                          tierInfo[selectedUser.tier ?? "1"]?.icon || Shield;
                        return <Icon className="h-6 w-6" />;
                      })()}

                      <div>
                        <h3 className="font-semibold text-sm">
                          Current Tier:{" "}
                          {tierInfo[selectedUser.tier ?? "1"]?.name ||
                            "No Tier"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          User has access to features for this tier
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tier Selection Cards */}
                  <div>
                    <Label>Select New Tier</Label>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {Object.entries(tierInfo).map(([tierNum, info]) => {
                        const isSelected = newTier === tierNum;
                        const Icon = info.icon;

                        return (
                          <div
                            key={tierNum}
                            onClick={() => setNewTier(tierNum as ITierString)}
                            className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center
                    ${
                      isSelected
                        ? `${info.borderColor} ${info.color} bg-opacity-20 shadow-md`
                        : "border-gray-200 hover:border-gray-400 hover:shadow-sm"
                    }`}
                          >
                            <Icon className="h-6 w-6 mx-auto mb-3" />
                            <p className="font-semibold text-base">
                              {info.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Button
                    onClick={handleTierUpdate}
                    className="w-full mt-6"
                    disabled={
                      isUpdatingTier ||
                      newTier === (selectedUser.tier?.toString() as ITierString)
                    }
                  >
                    {isUpdatingTier ? "Updating Tier..." : "Update Tier"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
