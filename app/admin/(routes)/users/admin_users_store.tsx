import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosError, baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";

interface IUserProfile {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  tier: number;
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

interface AdminUsersStore {
  // State
  users: IAdminUser[];
  selectedUser: IAdminUser | null;
  pagination: IPagination | null;
  isLoadingUsers: boolean;
  isLoadingUserDetails: boolean;
  isUpdatingBalance: boolean;
  isUpdatingStatus: boolean;
  isUpdatingTier: boolean;
  isLoadingReferrals: boolean;
  referrals: [];

  // Actions
  fetchUsers: (params: {
    page?: number;
    limit?: number;
    search?: string;
    tier?: undefined | "1" | "2" | "3";
  }) => Promise<void>;
  fetchUserDetails: (userId: string) => Promise<void>;
  updateUserBalance: (
    userId: string,
    type: "deposit" | "bonus",
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
      pagination: null,
      isLoadingUsers: false,
      isLoadingUserDetails: false,
      isUpdatingBalance: false,
      isUpdatingStatus: false,
      isUpdatingTier: false,
      isLoadingReferrals: false,
      referrals: [],

      // Actions
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
        try {
          const response = await baseAxios.patch(
            `/admin/users/${userId}/balance`,
            { type, amount, reason },
            { withCredentials: true }
          );

          enqueueSnackbar("User balance updated successfully", {
            variant: "success",
          });

          // Refresh user details
          await useAdminUsersStore.getState().fetchUsers({});
          get().fetchUserDetails(userId);
          set({ isUpdatingBalance: false });
        } catch (error) {
          set({ isUpdatingBalance: false });
          console.log("Failed to update user balance:", error);
          enqueueSnackbar("Failed to update user balance", {
            variant: "error",
          });
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
