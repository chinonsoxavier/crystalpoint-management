import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosError, baseAxios, baseAxiosPatch } from "@/network/axios";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

interface IUserProfile {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  tier: number;
}
// Add these new state variables to your store
interface AdPrompt {
  key: string;
  label: string;
  enabled: boolean;
}

interface UserAdPrompts {
  user: {
    id: string;
    username: string;
    email: string;
    showAdPrompt: boolean;
  };
  adPrompts: Record<string, AdPrompt>;
}

interface MembershipCard {
  _id: string;
  name: string;
  tier: number;
  requiredDeposit: number;
  benefits: string[];
  isActive: boolean;
}

interface ActivatedMembership {
  id: string;
  user: string;
  card: MembershipCard;
  status: string;
  activatedAt: string;
}

interface IUserBalance {
  deposit: number;
  profile: number;
  bonus: number;
}

interface IAdminUser {
  _id: string;
  email: string;
  username: string;
  tier: "1" | "2" | "3" | undefined;
  profile: IUserProfile;
  balance: IUserBalance;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface IFinancialSummary {
  balances: {
    activeDeposit: number;
    profit: number;
    bonus: number;
    promotionalBonus: number;
    totalWithdrawn: number;
    pendingWithdrawals: number;
  };
  totals: {
    totalDeposit?: number;
    totalWithdrawals?: number;
    totalProfit?: number;
    totalBonus?: number;
    totalPromotionalBonus?: number;
  };
}

interface ICurrentMembershipCard {
  id: string;
  name: string;
  tier: number;
  requiredDeposit: number;
  benefits: string[];
  isActive: boolean;
}

interface ICurrentMembership {
  membership: {
    id: string;
    user: string;
    card: ICurrentMembershipCard;
    status: string;
    activatedAt: string;
  };
  currentTier: number;
}

interface AdminUsersStore {
  // State
  users: IAdminUser[];
  currentMembership: ICurrentMembership | null;
  selectedUser: IAdminUser | null;
  pagination: IPagination | null;
  isLoadingUsers: boolean;
  isLoadingUserDetails: boolean;
  isUpdatingBalance: boolean;
  isUpdatingStatus: boolean;
  isUpdatingTier: boolean;
  userFinancialSumary: IFinancialSummary;
  isLoadingReferrals: boolean;
  referrals: [];
  userAdPrompts: UserAdPrompts | null;
  membershipCards: MembershipCard[];
  isFetchingAdPrompts: boolean;
  isUpdatingAdPrompts: boolean;
  isActivatingMembership: boolean;
  // Actions

  fetchMembershipCards: () => Promise<void>;
  fetchUserAdPrompts: (userId: string) => Promise<void>;
  toggleAdPrompt: (
    userId: string,
    promptKey: string,
    enabled: boolean,
    notes?: string
  ) => Promise<void>;
  bulkUpdateAdPrompts: (
    userId: string,
    prompts: Record<string, boolean>,
    notes?: string
  ) => Promise<void>;
  activateMembership: (userId: string, cardId: string) => Promise<void>;
  deActivateMembership: (userId: string, cardId: string) => Promise<void>;
  getCurrentMembership: (userId: string) => Promise<void>;

  fetchFinancialSummary: (userId: string) => Promise<void>;
  fetchUsers: (params: {
    page?: number;
    limit?: number;
    search?: string;
    tier?: undefined | "1" | "2" | "3";
  }) => Promise<void>;
  fetchUserDetails: (userId: string) => Promise<void>;
  updateUserBalance: (
    userId: string,
    type:
      | "deposit"
      | "profit"
      | "bonus"
      | "promotionalBonus"
      | "totalWithdrawn"
      | "pendingWithdrawals"
      | "activeDeposit",
    amount: number,
    reason: string
  ) => Promise<void>;
  updateUserStatus: (userId: string, isActive: boolean) => Promise<void>;
  updateUserTier: (userId: string, tier: number) => Promise<void>;
  fetchUserReferrals: (
    userId: string,
    page?: number,
    limit?: number
  ) => Promise<void>;
  setSelectedUser: (user: IAdminUser | null) => void;
}

export const useAdminUsersStore = create<AdminUsersStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      users: [],
      selectedUser: null,
      userFinancialSumary: {},
      pagination: null,
      isLoadingUsers: false,
      isLoadingUserDetails: false,
      isUpdatingBalance: false,
      isUpdatingStatus: false,
      isUpdatingTier: false,
      isLoadingReferrals: false,
      referrals: [],
      userAdPrompts: null,
      membershipCards: [
        {
          _id: "6954ec68efdeac275a25a1b3",
          name: "Silver Member",
          tier: 1,
          requiredDeposit: 10,
          benefits: [
            "Basic support",
            "Access to Starter Plan",
            "5% referral bonus",
          ],
          isActive: true,
          createdAt: "2025-12-31T09:27:04.878Z",
          updatedAt: "2025-12-31T09:27:04.878Z",
          isEligible: false,
          userTotalDeposit: 0,
          canUpgrade: false,
          currentTier: 1,
        },
        {
          _id: "6954ec68efdeac275a25a1b4",
          name: "Gold Member",
          tier: 2,
          requiredDeposit: 50,
          benefits: [
            "Priority support",
            "Access to all investment plans",
            "7% referral bonus",
            "Weekly market insights",
          ],
          isActive: true,
          createdAt: "2025-12-31T09:27:04.878Z",
          updatedAt: "2025-12-31T09:27:04.878Z",
          isEligible: false,
          userTotalDeposit: 0,
          canUpgrade: false,
          currentTier: 1,
        },
        {
          _id: "6954ec68efdeac275a25a1b5",
          name: "Platinum Member",
          tier: 3,
          requiredDeposit: 100,
          benefits: [
            "24/7 dedicated support",
            "Early access to new plans",
            "10% referral bonus",
            "Personal account manager",
            "Exclusive investment opportunities",
          ],
          isActive: true,
          createdAt: "2025-12-31T09:27:04.878Z",
          updatedAt: "2025-12-31T09:27:04.878Z",
          isEligible: false,
          userTotalDeposit: 0,
          canUpgrade: false,
          currentTier: 1,
        },
      ],
      isFetchingAdPrompts: false,
      isUpdatingAdPrompts: false,
      isActivatingMembership: false,

      // Actions
      fetchMembershipCards: async () => {
        try {
          const response = await baseAxios.get("/admin/membership/cards", {
            withCredentials: true,
          });
          // if (response.data.success) {
            set({ membershipCards: response.data.data });
          // };
          // console.log("fetched membership cards", response.data.data);
          return response.data;
        } catch (error) {
          axiosError(error);
          console.error("Error fetching membership cards:", error);
        }
      },
      fetchUserAdPrompts: async (userId: string) => {
        set({ isFetchingAdPrompts: true });
        try {
          const response = await baseAxios.get(
            `/admin/users/${userId}/ad-prompts`,
            { withCredentials: true }
          );
          if (response.data.success) {
            set({ userAdPrompts: response.data.data });
            enqueueSnackbar(response.data.message, { variant: "success" });
          }
          return response.data;
        } catch (error) {
          axiosError(error);
          console.error("Error fetching user ad prompts:", error);
          throw error;
        } finally {
          set({ isFetchingAdPrompts: false });
        }
      },

      toggleAdPrompt: async (
        userId: string,
        promptKey: string,
        enabled: boolean,
        notes?: string
      ) => {
        set({ isUpdatingAdPrompts: true });
        try {
          const response = await baseAxiosPatch.patch(
            `/admin/users/${userId}/ad-prompts/toggle`,
            {
              promptKey,
              enabled,
              notes,
            }
          );
          if (response.data.success) {
            // Update the local state
            const currentPrompts = get().userAdPrompts;
            if (
              currentPrompts &&
              currentPrompts.user &&
              currentPrompts.adPrompts
            ) {
              const updatedPrompts: UserAdPrompts = {
                user: currentPrompts.user,
                adPrompts: { ...currentPrompts.adPrompts },
              };
              if (updatedPrompts.adPrompts[promptKey]) {
                updatedPrompts.adPrompts[promptKey].enabled = enabled;
                updatedPrompts.user.showAdPrompt =
                  response.data.data.showAdPrompt;
                set({ userAdPrompts: updatedPrompts });
                enqueueSnackbar(response.data.message, { variant: "success" });
              }
            }
          }

          return response.data;
        } catch (error) {
          axiosError(error);
          console.error("Error toggling ad prompt:", error);
          throw error;
        } finally {
          set({ isUpdatingAdPrompts: false });
        }
      },

      bulkUpdateAdPrompts: async (
        userId: string,
        prompts: Record<string, boolean>,
        notes?: string
      ) => {
        set({ isUpdatingAdPrompts: true });
        try {
          const response = await baseAxiosPatch.patch(
            `/admin/users/${userId}/ad-prompts/bulk`,
            {
              prompts,
              notes,
            }
          );
          if (response.data.success) {
            // Update the local state
            const currentPrompts = get().userAdPrompts;
            if (currentPrompts) {
              Object.keys(prompts).forEach((key) => {
                if (currentPrompts.adPrompts[key]) {
                  currentPrompts.adPrompts[key].enabled = prompts[key];
                }
              });
              currentPrompts.user.showAdPrompt =
                response.data.data.showAdPrompt;
              enqueueSnackbar(response.data.message, { variant: "success" });
              set({ userAdPrompts: currentPrompts });
            }
          }
          return response.data;
        } catch (error) {
          axiosError(error);
          console.error("Error bulk updating ad prompts:", error);
          throw error;
        } finally {
          set({ isUpdatingAdPrompts: false });
        }
      },

      activateMembership: async (userId: string, cardId: string) => {
        set({ isActivatingMembership: true });
        console.log("cardId=" + cardId + "," + "userId = " + userId);
        const { updateUserTier } = get();
        try {
          const response = await baseAxios.post(
            `/admin/users/${userId}/membership/activate`,
            { cardId, forceActivate: true },
            { withCredentials: true }
          );
          if (response.data.success) {
            // Update user tier if needed
            const newTier = response.data.data.newTier;
            if (newTier) {
              await updateUserTier(userId, newTier);
            }
          }
          enqueueSnackbar(response.data.message, { variant: "success" });
          return response.data;
        } catch (error) {
          axiosError(error);
          console.error("Error activating membership:", error);
          // throw error;
        } finally {
          set({ isActivatingMembership: false });
        }
      },
      deActivateMembership: async (userId: string, cardId: string) => {
        set({ isActivatingMembership: true });
        try {
          const response = await baseAxios.post(
            `/admin/users/${userId}/membership/deactivate`,
            { cardId },
            { withCredentials: true }
          );

          enqueueSnackbar(response.data.message, { variant: "success" });
          return response.data;
        } catch (error) {
          axiosError(error);
          console.error("Error activating membership:", error);
          // throw error;
        } finally {
          set({ isActivatingMembership: false });
        }
      },
      getCurrentMembership: async (userId: string) => {
        try {
          const res = await baseAxios.get(`/admin/users/${userId}/membership`, {
            withCredentials: true,
          });
          console.log("membership", res.data.data);
          set({ currentMembership: res.data.data });
          console.log("membership", res.data.data);
          return res.data.data;
        } catch (error) {
          console.error("Failed to get current membership:", error);
        }
      },

      fetchUsers: async (params) => {
        set({ isLoadingUsers: true });
        try {
          const queryString = new URLSearchParams({
            page: String(params.page || 1),
            limit: String(params.limit || 10),
            ...(params.search && { search: params.search }),
            ...(params.tier && { tier: String(params.tier) }),
          }).toString();

          const response = await baseAxios.get(`/admin/users?${queryString}`, {
            withCredentials: true,
          });
          console.log("Fetched Users:", response.data?.data);

          set({
            users: response.data?.data?.users || [],
            pagination: response.data?.data?.pagination,
            isLoadingUsers: false,
          });
        } catch (error) {
          set({ isLoadingUsers: false });
          console.log("Failed to fetch users:", error);
          enqueueSnackbar("Failed to fetch users", { variant: "error" });
        }
      },
      fetchFinancialSummary: async (userId) => {
        try {
          const response = await baseAxios.get(
            "/admin/users/" + userId + "/financial-summary",
            {
              withCredentials: true,
            }
          );
          console.log("User Financial Summary:", response.data?.data);
          set({
            userFinancialSumary: response.data?.data || {},
          });
        } catch (error) {
          console.log("Failed to fetch user financial summary:", error);
          axiosError(error);
        }
      },

      fetchUserDetails: async (userId) => {
        set({ isLoadingUserDetails: true });
        try {
          const response = await baseAxios.get(`/admin/users/${userId}`, {
            withCredentials: true,
          });

          set({
            selectedUser: response.data?.data?.user,
            isLoadingUserDetails: false,
          });
        } catch (error) {
          set({ isLoadingUserDetails: false });
          console.log("Failed to fetch user details:", error);
          enqueueSnackbar("Failed to fetch user details", { variant: "error" });
        }
      },

      updateUserBalance: async (userId, type, amount, reason) => {
        set({ isUpdatingBalance: true });
        console.log("Update User Balance Response:", amount, type);
        console.log("Sending Payload:", JSON.stringify(type)); // Stringify to see exact format

        try {
          const response = await baseAxios.patch(
            `/admin/users/${userId}/balance/edit`,
            {
              type: type,
              amount: amount,
              action: "set",
              reason: reason,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );

          enqueueSnackbar(response.data.message, {
            variant: "success",
          });

          // Refresh user details
          await useAdminUsersStore.getState().fetchUsers({});
          get().fetchUserDetails(userId);
          set({ isUpdatingBalance: false });
        } catch (error) {
          set({ isUpdatingBalance: false });
          console.log("Failed to update user balance:", error);
          axiosError(error);
        }
      },

      updateUserStatus: async (userId, isActive) => {
        set({ isUpdatingStatus: true });
        try {
          const response = await baseAxios.patch(
            `/admin/users/${userId}/status`,
            { isActive },
            { withCredentials: true }
          );

          enqueueSnackbar(response.data.message, {
            variant: "success",
          });

          // Update local state
          set((state) => ({
            users: state.users.map((user) =>
              user._id === userId ? { ...user, isActive } : user
            ),
            isUpdatingStatus: false,
          }));

          await useAdminUsersStore.getState().fetchUsers({});
          get().fetchUserDetails(userId);
        } catch (error) {
          set({ isUpdatingStatus: false });
          console.log("Failed to update user status:", error);
          axiosError(error);
        }
      },

      updateUserTier: async (userId, tier) => {
        set({ isUpdatingTier: true });
        try {
          const response = await baseAxios.patch(
            `/admin/users/${userId}/tier`,
            { tier },
            { withCredentials: true }
          );

          enqueueSnackbar(response.data.message, {
            variant: "success",
          });

          // Update local state
          set((state) => ({
            users: state.users.map((user) =>
              user._id === userId
                ? { ...user, profile: { ...user.profile, tier } }
                : user
            ),
            isUpdatingTier: false,
          }));

          await useAdminUsersStore.getState().fetchUsers({});
          get().fetchUserDetails(userId);
        } catch (error) {
          set({ isUpdatingTier: false });
          console.log("Failed to update user tier:", error);
          axiosError(error);
        }
      },

      fetchUserReferrals: async (userId, page = 1, limit = 10) => {
        set({ isLoadingReferrals: true });
        try {
          const response = await baseAxios.get(
            `/admin/users/${userId}/referrals?page=${page}&limit=${limit}`,
            {
              withCredentials: true,
            }
          );

          set({
            referrals: response.data?.data || [],
            isLoadingReferrals: false,
          });
        } catch (error) {
          set({ isLoadingReferrals: false });
          console.log("Failed to fetch user referrals:", error);
          enqueueSnackbar("Failed to fetch user referrals", {
            variant: "error",
          });
        }
      },

      setSelectedUser: (user) => set({ selectedUser: user }),
    }),
    { name: "admin-users-store" }
  )
);
