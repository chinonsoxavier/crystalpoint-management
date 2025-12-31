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
  CreditCard,
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
    fetchUserAdPrompts,
    toggleAdPrompt,
    bulkUpdateAdPrompts,
    activateMembership,
    fetchMembershipCards,
    userAdPrompts,
    membershipCards,
    isFetchingAdPrompts,
    isUpdatingAdPrompts,
    isActivatingMembership,
  } = useAdminUsersStore();

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null
  );
  const [tierFilter, setTierFilter] = useState<ITierFilter>("all");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAdPromptsModal, setShowAdPromptsModal] = useState(false);
  const [page, setPage] = useState(1);

  // State for balance update
  const [balanceAmount, setBalanceAmount] = useState<number>(0);
  const [balanceReason, setBalanceReason] = useState<string>("");
  const [depositType, setDepositType] = useState<IDepositType>("deposit");

  // State for tier update
  const [newTier, setNewTier] = useState<ITierString>("1");

  // State for membership activation
  const [selectedMembershipCard, setSelectedMembershipCard] =
    useState<string>("");
  const [membershipNotes, setMembershipNotes] = useState<string>("");

  // State for ad prompts notes
  const [adPromptNotes, setAdPromptNotes] = useState<string>("");

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
      setSelectedMembershipCard("");
      setMembershipNotes("");
      setAdPromptNotes("");
    }
  }, [selectedUser]);

  // Fetch membership cards on component mount
  useEffect(() => {
    fetchMembershipCards();
  }, []);

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
      toast.error("Invalid amount");
      return;
    }

    try {
      await updateUserBalance(
        selectedUser._id,
        depositType,
        amount,
        balanceReason || "Balance adjustment"
      );
      toast.success("Balance updated successfully");
    } catch (error) {
      toast.error("Failed to update balance");
    }
  };

  // Handler for updating tier
  const handleTierUpdate = async () => {
    if (!selectedUser || !newTier) return;

    try {
      await updateUserTier(selectedUser._id, parseInt(newTier));
      toast.success("Tier updated successfully");
    } catch (error) {
      toast.error("Failed to update tier");
    }
  };

  // Handler for toggling user activation status
  const handleToggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      await updateUserStatus(userId, isActive ? true : false);
      toast.success(
        `User ${isActive ? "activated" : "deactivated"} successfully`
      );
    } catch (error) {
      toast.error(`Failed to ${isActive ? "activate" : "deactivate"} user`);
    }
  };

  // Handler for toggling ad prompt
  const handleToggleAdPrompt = async (promptKey: string, enabled: boolean) => {
    if (!selectedUser) return;

    try {
      await toggleAdPrompt(selectedUser._id, promptKey, enabled, adPromptNotes);
      toast.success(
        `Ad prompt ${enabled ? "enabled" : "disabled"} successfully`
      );
    } catch (error) {
      toast.error(`Failed to ${enabled ? "enable" : "disable"} ad prompt`);
    }
  };

  // Handler for bulk updating ad prompts
  const handleBulkUpdateAdPrompts = async () => {
    if (!selectedUser || !userAdPrompts) return;

    const prompts: Record<string, boolean> = {};
    Object.keys(userAdPrompts.adPrompts).forEach((key) => {
      prompts[key] = userAdPrompts.adPrompts[key].enabled;
    });

    try {
      await bulkUpdateAdPrompts(selectedUser._id, prompts, adPromptNotes);
      toast.success("Ad prompts updated successfully");
      setShowAdPromptsModal(false);
    } catch (error) {
      toast.error("Failed to update ad prompts");
    }
  };

  // Handler for activating membership
  const handleActivateMembership = async () => {
    if (!selectedUser || !selectedMembershipCard) {
      toast.error("Please select a membership card");
      return;
    }

    try {
      await activateMembership(selectedUser._id, selectedMembershipCard);
      toast.success("Membership activated successfully");
      setSelectedMembershipCard("");
      setMembershipNotes("");
    } catch (error) {
      toast.error("Failed to activate membership");
    }
  };

  // Open ad prompts modal for a specific user
  const openAdPromptsModal = async (user: (typeof users)[0]) => {
    setSelectedUser(user);
    setAdPromptNotes("");
    try {
      await fetchUserAdPrompts(user._id);
      setShowAdPromptsModal(true);
    } catch (error) {
      toast.error("Failed to fetch ad prompts");
    }
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
                  <SelectItem key="all" value="all">
                    All Tiers
                  </SelectItem>
                  <SelectItem key="tier1" value="1">
                    Tier 1
                  </SelectItem>
                  <SelectItem key="tier2" value="2">
                    Tier 2
                  </SelectItem>
                  <SelectItem key="tier3" value="3">
                    Tier 3
                  </SelectItem>
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
                                onClick={() => openAdPromptsModal(user)}
                              >
                                <MessageSquare size={16} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Manage ad prompts</p>
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
                Update user balance, status, tier, or membership
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid grid-cols-1 w-full gap-6">
                <Tabs defaultValue="balance" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="balance">Balance</TabsTrigger>
                    <TabsTrigger value="tier">Tier</TabsTrigger>
                    <TabsTrigger value="membership">Membership</TabsTrigger>
                  </TabsList>

                  <TabsContent value="balance" className="w-full">
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
                                  <SelectItem key="deposit" value="deposit">
                                    Deposit
                                  </SelectItem>
                                  <SelectItem key="bonus" value="bonus">
                                    Bonus
                                  </SelectItem>
                                  <SelectItem key="profit" value="profit">
                                    Profit
                                  </SelectItem>
                                  <SelectItem
                                    key="promotionalBonus"
                                    value="promotionalBonus"
                                  >
                                    Promotional Bonus
                                  </SelectItem>
                                  <SelectItem
                                    key="totalWithdrawn"
                                    value="totalWithdrawn"
                                  >
                                    Total Withdrawn
                                  </SelectItem>
                                  <SelectItem
                                    key="pendingWithdrawals"
                                    value="pendingWithdrawals"
                                  >
                                    Pending Withdrawals
                                  </SelectItem>
                                  <SelectItem
                                    key="activeDeposit"
                                    value="activeDeposit"
                                  >
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

                  <TabsContent value="membership">
                    {/* Membership Activation Section */}
                    <Card className="bg-transparent shadow-none border-none">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Membership Activation
                        </CardTitle>
                        <CardDescription>
                          Activate a membership plan for this user
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="membership-card">
                            Select Membership
                          </Label>

                          <Select
                            value={selectedMembershipCard}
                            onValueChange={setSelectedMembershipCard}
                          >
                            <SelectTrigger id="membership-card">
                              <SelectValue placeholder="Choose a membership plan" />
                            </SelectTrigger>
                            <SelectContent position="popper" className="z-50">
                              {membershipCards.map((card) => (
                                <SelectItem key={card._id} value={card._id}>
                                  <div className="flex flex-col">
                                    <p className="font-medium">{card.name}</p>
                                    
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="membership-notes">
                            Notes (Optional)
                          </Label>
                          <Textarea
                            id="membership-notes"
                            value={membershipNotes}
                            onChange={(e) => setMembershipNotes(e.target.value)}
                            placeholder="Add any notes about this membership activation"
                            rows={3}
                          />
                        </div>

                        <Button
                          onClick={handleActivateMembership}
                          className="w-full mt-4"
                          disabled={
                            !selectedMembershipCard || isActivatingMembership
                          }
                        >
                          {isActivatingMembership
                            ? "Activating..."
                            : "Activate Membership"}
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Ad Prompts Modal */}
        <Dialog open={showAdPromptsModal} onOpenChange={setShowAdPromptsModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Ad Prompts Management
              </DialogTitle>
              <DialogDescription>
                Configure ad prompts to display on {selectedUser?.username}`s
                dashboard
              </DialogDescription>
            </DialogHeader>
            {isFetchingAdPrompts ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : userAdPrompts ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                  <div>
                    <p className="font-medium text-sm">Show Ad Prompts</p>
                    <p className="text-xs text-muted-foreground">
                      Toggle to enable/disable all ad prompts for this user
                    </p>
                  </div>
                  <Switch
                    checked={userAdPrompts.user.showAdPrompt}
                    onCheckedChange={(checked) => {
                      // Create a prompts object with all prompts set to the same value
                      const prompts: Record<string, boolean> = {};
                      Object.keys(userAdPrompts.adPrompts).forEach((key) => {
                        prompts[key] = checked;
                      });
                      bulkUpdateAdPrompts(
                        selectedUser!._id,
                        prompts,
                        adPromptNotes
                      );
                    }}
                  />
                </div>

                <div className="space-y-3">
                  {Object.values(userAdPrompts.adPrompts).map((prompt) => (
                    <div
                      key={prompt.key}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <p className="text-sm font-medium">{prompt.label}</p>
                      <Switch
                        checked={prompt.enabled}
                        onCheckedChange={(checked) =>
                          handleToggleAdPrompt(prompt.key, checked)
                        }
                        disabled={isUpdatingAdPrompts}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ad-prompt-notes">Notes (Optional)</Label>
                  <Textarea
                    id="ad-prompt-notes"
                    value={adPromptNotes}
                    onChange={(e) => setAdPromptNotes(e.target.value)}
                    placeholder="Add any notes about these ad prompt changes"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleBulkUpdateAdPrompts}
                    className="flex-1"
                    disabled={isUpdatingAdPrompts}
                  >
                    {isUpdatingAdPrompts ? "Updating..." : "Update All Prompts"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAdPromptsModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Failed to load ad prompts
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
