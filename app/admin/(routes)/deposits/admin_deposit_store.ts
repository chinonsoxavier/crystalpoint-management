import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosError, baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";

export interface IDeposit {
    // deposits:{
  _id: string;
  user: {
    id:string;
    username:string;
    email:string
  };
  amount: number;
  status: "pending" | "confirmed" | "failed";
  method: string;
  transactionHash?: string;
  createdAt: string;
  updatedAt: string;
    // },
  // pagination:[]
}

interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface IDepositStats {
  period: string;
  daily_stats: {
    confirmedCount: number;
    count: number;
    pendingCount: number;
    totalAmount: number;
    _id: string;
  }[];
  stats: {
    average_amount:number;
    confirmed_deposits: number;
    pending_deposits: number;
    total_amount: number;
    total_deposits: number;
  };
  //   [key: string]: any;
}

interface AdminDepositsStore {
  // State
  deposits: IDeposit[];
  pagination: IPagination | null;
  depositStats: IDepositStats | null;
  isLoadingDeposits: boolean;
  isLoadingStats: boolean;
  isConfirmingDeposit: boolean;
  isRejectingDeposit: boolean;

  // Actions
  fetchDeposits: (params: {
    page?: number;
    limit?: number;
    status?: "pending" | "confirmed" | "failed";
  }) => Promise<void>;
  fetchDepositStats: (period: "7d" | "30d" | "90d" | "1y") => Promise<void>;
  confirmDeposit: (depositId: string) => Promise<void>;
  rejectDeposit: (depositId: string) => Promise<void>;
}

export const useAdminDepositsStore = create<AdminDepositsStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      deposits: [],
      pagination: null,
      depositStats: null,
      isLoadingDeposits: false,
      isLoadingStats: false,
      isConfirmingDeposit: false,
      isRejectingDeposit: false,

      // Actions
      fetchDeposits: async (params) => {
        set({ isLoadingDeposits: true });
        try {
          const queryString = new URLSearchParams({
            page: String(params.page || 1),
            limit: String(params.limit || 10),
            ...(params.status && { status: params.status }),
          }).toString();

          const response = await baseAxios.get(
            `/admin/deposits?${queryString}`,
            { withCredentials: true }
          );

          set({
            deposits: response.data?.data?.deposits || [],
            pagination: response.data?.data?.pagination,
            isLoadingDeposits: false,
          });
          console.log(response.data.data)
        } catch (error) {
          set({ isLoadingDeposits: false });
          console.log("Failed to fetch deposits:", error);
        }
      },

      fetchDepositStats: async (period) => {
        set({ isLoadingStats: true });
        try {
          const response = await baseAxios.get(
            `/admin/deposits/stats?period=${period}`,
            { withCredentials: true }
          );

          set({
            depositStats: response.data?.data,
            isLoadingStats: false,
          });

        } catch (error) {
          set({ isLoadingStats: false });
          console.log("Failed to fetch deposit stats:", error);
        }
      },

      confirmDeposit: async (depositId) => {
        set({ isConfirmingDeposit: true });
        try {
          const response = await baseAxios.patch(
            `/admin/deposits/${depositId}/confirm`,
            {},
            { withCredentials: true }
          );

          enqueueSnackbar(response.data.message, {
            variant: "success",
          });

          // Update local state
          set((state) => ({
            deposits: state.deposits.map((deposit) =>
              deposit._id === depositId
                ? { ...deposit, status: "confirmed" }
                : deposit
            ),
            isConfirmingDeposit: false,
          }));

          get().fetchDeposits({ page: 1 });
        } catch (error) {
          set({ isConfirmingDeposit: false });
          console.log("Failed to confirm deposit:", error);
          axiosError(error);
        }
      },

      rejectDeposit: async (depositId) => {
        set({ isRejectingDeposit: true });
        try {
          const response = await baseAxios.patch(
            `/admin/deposits/${depositId}/reject`,
            {},
            { withCredentials: true }
          );

          enqueueSnackbar(response.data.message, {
            variant: "success",
          });

          // Update local state
          set((state) => ({
            deposits: state.deposits.map((deposit) =>
              deposit._id === depositId
                ? { ...deposit, status: "failed" }
                : deposit
            ),
            isRejectingDeposit: false,
          }));

          get().fetchDeposits({ page: 1 });
        } catch (error) {
          set({ isRejectingDeposit: false });
          console.log("Failed to reject deposit:", error);
          axiosError(error);
        }
      },
    }),
    { name: "admin-deposits-store" }
  )
);
