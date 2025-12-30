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
  MessageSquare,
  Power,
  PowerOff,
} from "lucide-react";
import { useAdminUsersStore } from "./admin_users_store";
import { formatDate } from "@/utility/format_date";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type IDepositType =
  | "deposit"
  | "profit"
  | "bonus"
  | "promotionalBonus"
  | "totalWithdrawn"
  | "pendingWithdrawals"
  | "activeDeposit";
type ITierFilter = "all" | "1" | "2" | "3";
type ITierString = "1" | "2" | "3" | undefined;

// Define promotional messages
const promotionalMessages = [
  {
    id: "membershipCard",
    text: "Membership Card ID number required.",
    enabled: false,
  },
  {
    id: "activateMembership",
    text: "Activate membership card.",
    enabled: false,
  },
  { id: "tier2Upgrade", text: "Tier2 Upgrade required.", enabled: false },
  { id: "tier3Upgrade", text: "Tier3 Upgrade required.", enabled: false },
  { id: "securityLevy", text: "Security levy.", enabled: false },
  { id: "promotionalBonus", text: "Promotional bonus!!!.", enabled: false },
  { id: "vipUpgrade", text: "Vip Upgrade required.", enabled: false },
  { id: "premiumUpgrade", text: "Premium Upgrade required.", enabled: false },
];

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
    userFinancialSumary,
    fetchFinancialSummary,
    fetchUsers,
  } = useAdminUsersStore();

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null
  );
  const [tierFilter, setTierFilter] = useState<ITierFilter>("all");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPromotionalModal, setShowPromotionalModal] = useState(false);
  const [page, setPage] = useState(1);

  // State for balance update
  const [balanceAmount, setBalanceAmount] = useState<number>(0);
  const [balanceReason, setBalanceReason] = useState<string>("");
  const [depositType, setDepositType] = useState<IDepositType>("deposit");

  // State for tier update
  const [newTier, setNewTier] = useState<ITierString>("1");

  // State for promotional messages
  const [userPromotionalMessages, setUserPromotionalMessages] = useState(
    promotionalMessages.map((msg) => ({ ...msg }))
  );

  useEffect(() => {
    fetchUsers({
      page,
      limit: 100,
      tier: tierFilter === "all" ? undefined : tierFilter,
      search: search || undefined,
    });
  }, [page, tierFilter, selectedUser, search]);

  useEffect(() => {
    if (showEditModal && selectedUser) {
      fetchFinancialSummary(selectedUser?._id || "");
    }
  }, [showEditModal, selectedUser]);

  useEffect(() => {
    switch (depositType) {
      case "promotionalBonus":
        setBalanceAmount(userFinancialSumary?.balances?.promotionalBonus ?? 0);
        return;
      case "totalWithdrawn":
        setBalanceAmount(userFinancialSumary?.balances?.totalWithdrawn ?? 0);
        return;
      case "pendingWithdrawals":
        setBalanceAmount(
          userFinancialSumary?.balances?.pendingWithdrawals ?? 0
        );
        return;
      case "activeDeposit":
        setBalanceAmount(userFinancialSumary?.balances?.activeDeposit ?? 0);
        return;
      case "deposit":
        setBalanceAmount(selectedUser?.balance?.deposit ?? 0);
        return;
      case "profit":
        setBalanceAmount(userFinancialSumary?.balances?.profit ?? 0);
        return;
      case "bonus":
        setBalanceAmount(userFinancialSumary?.balances?.bonus ?? 0);
        return;
      default:
    }
  }, [depositType, selectedUser, users]);

  // Reset form when a new user is selected
  useEffect(() => {
    if (selectedUser) {
      setBalanceAmount(selectedUser.balance?.deposit ?? 0);
      setBalanceReason("");
      setDepositType("deposit");
      setNewTier(selectedUser.tier?.toString() as ITierString);

      // Reset promotional messages to default
      setUserPromotionalMessages(
        promotionalMessages.map((msg) => ({
          ...msg,
          enabled: false, // Reset to false when selecting a new user
        }))
      );
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
  };

  // Handler for updating tier
  const handleTierUpdate = async () => {
    if (!selectedUser || !newTier) return;

    await updateUserTier(selectedUser._id, parseInt(newTier));
  };

  // Handler for toggling user activation status
  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    await updateUserStatus(userId, isActive ? true : false);
  };

  // Toggle promotional message
  const togglePromotionalMessage = (id: string) => {
    setUserPromotionalMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, enabled: !msg.enabled } : msg
      )
    );
  };

  // Handler for updating promotional messages (UI only for now)
  const handlePromotionalMessagesUpdate = () => {
    // This would typically call an API to update the user's promotional messages
    console.log("Updating promotional messages:", userPromotionalMessages);
    console.log("For user:", selectedUser?._id);
    // You can add a toast notification here to show success
    alert("Promotional messages updated successfully!");
    setShowPromotionalModal(false);
  };

  // Open promotional messages modal for a specific user
  const openPromotionalMessagesModal = (user: (typeof users)[0]) => {
    setSelectedUser(user);
    // Reset promotional messages to default
    setUserPromotionalMessages(
      promotionalMessages.map((msg) => ({
        ...msg,
        enabled: false, // Reset to false when selecting a new user
      }))
    );
    setShowPromotionalModal(true);
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
    <TooltipProvider>
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
                    <TableHead>Status</TableHead>
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
                            user.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
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
                          <Tooltip>
                            <TooltipTrigger asChild>
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
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View user details</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
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
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit user balance and tier</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  openPromotionalMessagesModal(user)
                                }
                              >
                                <MessageSquare size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Manage promotional messages</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant={user.isActive ? "default" : "outline"}
                                className={
                                  user.isActive
                                    ? "bg-green-600 hover:bg-green-700"
                                    : ""
                                }
                                onClick={() =>
                                  handleToggleUserStatus(
                                    user._id,
                                    user.isActive !== true
                                  )
                                }
                                disabled={isUpdatingStatus}
                              >
                                {user.isActive ? (
                                  <Power size={16} />
                                ) : (
                                  <PowerOff size={16} />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {user.isActive
                                  ? "Deactivate user"
                                  : "Activate user"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
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
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    className={
                      selectedUser.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {selectedUser.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tier</p>
                  <Badge
                    className={
                      tierInfo[selectedUser.tier ?? 1]?.color ||
                      "bg-gray-100 text-gray-800"
                    }
                  >
                    {selectedUser.tier
                      ? `Tier ${selectedUser.tier}`
                      : "No Tier"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deposited</p>
                  <p className="font-semibold">
                    ${selectedUser.balance.deposit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Deposits
                  </p>
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
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user balance, status, or tier
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid grid-cols-1 w-full gap-6">
                <Tabs defaultValue="balance?" className="w-full">
                  <TabsList>
                    <TabsTrigger value="balance?">
                      Balance Management
                    </TabsTrigger>
                    <TabsTrigger value="tier">Tier Management</TabsTrigger>
                  </TabsList>

                  <TabsContent value="balance?" className="w-full">
                    {/* Balance Management Section */}
                    <Card className="bg-transparent border-none shadow-none">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Balance Management
                        </CardTitle>
                        <CardDescription>
                          Add or remove funds from the user`s account
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form
                          onSubmit={handleBalanceUpdate}
                          className="space-y-4"
                        >
                          <div className="flex gap-4 w-full">
                            <div className="w-full space-y-2">
                              <Label htmlFor="deposit-type">
                                Transaction Type
                              </Label>
                              <Select
                                value={depositType}
                                onValueChange={(value: IDepositType) =>
                                  setDepositType(value)
                                }
                              >
                                <SelectTrigger
                                  className="w-full"
                                  id="deposit-type"
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="deposit">
                                    Deposit
                                  </SelectItem>
                                  <SelectItem value="bonus">Bonus</SelectItem>
                                  <SelectItem value="profit">Profit</SelectItem>
                                  <SelectItem value="promotionalBonus">
                                    Promotional Bonus
                                  </SelectItem>
                                  <SelectItem value="totalWithdrawn">
                                    Total Withdrawn
                                  </SelectItem>
                                  <SelectItem value="pendingWithdrawals">
                                    Pending Withdrawals
                                  </SelectItem>
                                  <SelectItem value="activeDeposit">
                                    Active Deposit
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="w-full space-y-2">
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
                          <div className="w-full space-y-2">
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
                            {isUpdatingBalance
                              ? "Updating..."
                              : "Update Balance"}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tier">
                    {/* Tier Management Section */}
                    <Card className="bg-transparent shadow-none border-none">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Tier Management
                        </CardTitle>
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
                                tierInfo[selectedUser.tier ?? "1"]?.icon ||
                                Shield;
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
                                  onClick={() =>
                                    setNewTier(tierNum as ITierString)
                                  }
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
                            newTier ===
                              (selectedUser.tier?.toString() as ITierString)
                          }
                        >
                          {isUpdatingTier ? "Updating Tier..." : "Update Tier"}
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Promotional Messages Modal */}
        <Dialog
          open={showPromotionalModal}
          onOpenChange={setShowPromotionalModal}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Promotional Messages
              </DialogTitle>
              <DialogDescription>
                Select messages to display on {selectedUser?.username}`s
                dashboard
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-3">
                {userPromotionalMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <p className="text-sm font-medium">{message.text}</p>
                    <Switch
                      checked={message.enabled}
                      onCheckedChange={() =>
                        togglePromotionalMessage(message.id)
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handlePromotionalMessagesUpdate}
                  className="flex-1"
                >
                  Update Messages
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPromotionalModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
