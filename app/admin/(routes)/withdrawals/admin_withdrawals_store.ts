import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosError, baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";
import { IUser } from "@/app/user/user_store";

interface IWithdrawal {
  _id: string;
  user: IUser;
  amount: number;
  status: "pending" | "approved" | "rejected" | "processed";
  // method: "bitcoin" | "ethereum" | "usdt" | "bank_transfer";
  walletAddress: string;
  transactionHash?: string;
  createdAt: string;
  processedAt: string;
  updatedAt: string;
}

interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface IWithdrawalStats {
  period: string;
 overview: {
    total_withdrawals: number,
    pending_withdrawals: number,
    approved_withdrawals: number,
    processed_withdrawals: number,
    total_processed_amount: number,
    average_withdrawal: number
}
  // [key: string]: any;
}

interface AdminWithdrawalsStore {
  // State
  withdrawals: IWithdrawal[];
  pagination: IPagination | null;
  withdrawalStats: IWithdrawalStats | null;
  isLoadingWithdrawals: boolean;
  isLoadingStats: boolean;
  isApprovingWithdrawal: boolean;
  isRejectingWithdrawal: boolean;
  isProcessingWithdrawal: boolean;

  // Actions
  fetchWithdrawals: (params: {
    page?: number;
    limit?: number;
    status?: "pending" | "approved" | "rejected" | "processed";
    method?: "bitcoin" | "ethereum" | "usdt" | "bank_transfer";
  }) => Promise<void>;
  fetchWithdrawalStats: (period: "7d" | "30d" | "90d" | "1y") => Promise<void>;
  approveWithdrawal: (withdrawalId: string) => Promise<void>;
  rejectWithdrawal: (withdrawalId: string, reason: string) => Promise<void>;
  processWithdrawal: (
    withdrawalId: string,
    transactionHash: string,
    notes: string
  ) => Promise<void>;
}

export const useAdminWithdrawalsStore = create<AdminWithdrawalsStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      withdrawals: [],
      pagination: null,
      withdrawalStats: null,
      isLoadingWithdrawals: false,
      isLoadingStats: false,
      isApprovingWithdrawal: false,
      isRejectingWithdrawal: false,
      isProcessingWithdrawal: false,

      // Actions
      fetchWithdrawals: async (params) => {
        set({ isLoadingWithdrawals: true });
        try {
          const queryString = new URLSearchParams({
            page: String(params.page || 1),
            limit: String(params.limit || 10),
            ...(params.status && { status: params.status }),
            ...(params.method && { method: params.method }),
          }).toString();

          const response = await baseAxios.get(
            `/admin/withdrawals?${queryString}`,
            { withCredentials: true }
          );

          set({
            withdrawals: response.data?.data?.withdrawals || [],
            pagination: response.data?.data?.pagination,
            isLoadingWithdrawals: false,
          });
          console.log(response.data.data);

        } catch (error) {
          set({ isLoadingWithdrawals: false });
          console.log("Failed to fetch withdrawals:", error);
         axiosError(error);
        }
      },

      fetchWithdrawalStats: async (period) => {
        set({ isLoadingStats: true });
        try {
          const response = await baseAxios.get(
            `/admin/withdrawals/stats?period=${period}`,
            { withCredentials: true }
          );

          set({
            withdrawalStats: response.data?.data,
            isLoadingStats: false,
          });
          console.log(response.data.data);
        } catch (error) {
          set({ isLoadingStats: false });
          console.log("Failed to fetch withdrawal stats:", error);
     axiosError(error)
        }
      },

      approveWithdrawal: async (withdrawalId) => {
        set({ isApprovingWithdrawal: true });
        try {
          const response = await baseAxios.patch(
            `/admin/withdrawals/${withdrawalId}/approve`,
            {},
            { withCredentials: true }
          );

          enqueueSnackbar("Withdrawal approved successfully", {
            variant: "success",
          });

          // Update local state
          set((state) => ({
            withdrawals: state.withdrawals.map((withdrawal) =>
              withdrawal._id === withdrawalId
                ? { ...withdrawal, status: "approved" }
                : withdrawal
            ),
            isApprovingWithdrawal: false,
          }));

          get().fetchWithdrawals({ page: 1 });
        } catch (error) {
          set({ isApprovingWithdrawal: false });
          console.log("Failed to approve withdrawal:", error);
          enqueueSnackbar("Failed to approve withdrawal", { variant: "error" });
        }
      },

      rejectWithdrawal: async (withdrawalId, reason) => {
        set({ isRejectingWithdrawal: true });
        try {
          const response = await baseAxios.patch(
            `/admin/withdrawals/${withdrawalId}/reject`,
            { reason },
            { withCredentials: true }
          );

          enqueueSnackbar("Withdrawal rejected successfully", {
            variant: "success",
          });

          // Update local state
          set((state) => ({
            withdrawals: state.withdrawals.map((withdrawal) =>
              withdrawal._id === withdrawalId
                ? { ...withdrawal, status: "rejected" }
                : withdrawal
            ),
            isRejectingWithdrawal: false,
          }));

          get().fetchWithdrawals({ page: 1 });
        } catch (error) {
          set({ isRejectingWithdrawal: false });
          console.log("Failed to reject withdrawal:", error);
          enqueueSnackbar("Failed to reject withdrawal", { variant: "error" });
        }
      },

      processWithdrawal: async (withdrawalId, transactionHash, notes) => {
        set({ isProcessingWithdrawal: true });
        try {
          const response = await baseAxios.patch(
            `/admin/withdrawals/${withdrawalId}/process`,
            { transactionHash, notes },
            { withCredentials: true }
          );

          enqueueSnackbar("Withdrawal processed successfully", {
            variant: "success",
          });

          // Update local state
          set((state) => ({
            withdrawals: state.withdrawals.map((withdrawal) =>
              withdrawal._id === withdrawalId
                ? { ...withdrawal, status: "processed" }
                : withdrawal
            ),
            isProcessingWithdrawal: false,
          }));

          get().fetchWithdrawals({ page: 1 });
        } catch (error) {
          set({ isProcessingWithdrawal: false });
          console.log("Failed to process withdrawal:", error);
          enqueueSnackbar("Failed to process withdrawal", { variant: "error" });
        }
      },
    }),
    { name: "admin-withdrawals-store" }
  )
);
