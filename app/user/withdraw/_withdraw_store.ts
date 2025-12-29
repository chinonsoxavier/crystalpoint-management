"use client";
import { create } from "zustand";
import { axiosError, baseAxios, baseAxiosPatch } from "@/network/axios";
import { enqueueSnackbar } from "notistack";

interface IWithdrawals {
  id: string;
  amount: number;
  user: string;
  status: string;
  walletAddress: string;
  createdAt: string;
  updatedAt?: string;
}

interface IWithdrawalBalance {
  ledger_balance: 0;
  available_balance: 0;
  breakdown: {
    deposit_balance: 0;
    profit_balance: 0;
    bonus_balance: 0;
  };
  pending_withdrawals: 0;
  can_withdraw: true;
  minimum_withdrawal: 0;
}

interface IWithdrawStore {
  approvedWithdrawals: [];
  pendingWithdrawals: [];
  withdrawalBalance?: IWithdrawalBalance;
  loadingWithdrawal: boolean;
  withdrawalHistory: IWithdrawals[];
  fetchWithdrawalBalance: () => Promise<void>;
  fetchWithdrawalsHistory: () => Promise<void>;
  fetchWithdrawalsApproved: () => Promise<void>;
  fetchWithdrawalsPending: () => Promise<void>;
  requestWithdrawal: (walletAddress: string, amount: number) => Promise<void>;
}

const useWithdrawStore = create<IWithdrawStore>((set) => ({
  withdrawalBalance: undefined,
  approvedWithdrawals: [],
  loadingWithdrawal: false,
  withdrawalHistory: [] as IWithdrawals[],
  pendingWithdrawals: [],
  fetchWithdrawalBalance: async () => {
    try {
      const res = await baseAxiosPatch.get("/withdraw/balance", {
        withCredentials: true,
      });
      set({ withdrawalBalance: res.data?.data || [] });
      enqueueSnackbar(res.data.message, { variant: "success" });
      console.log("Withdrawal Balance:", res.data.data);
    } catch (error) {
      axiosError(error);
      console.log("failed to fetch withdrawal balance", error);
    }
  },
  fetchWithdrawalsHistory: async () => {
    try {
      const res = baseAxios.get("/withdraw/logs", { withCredentials: true });
    } catch (error) {
      console.log("failed to fetch withdrawal history", error);
    }
  },
  requestWithdrawal: async (walletAddress, amount) => {
    set({ loadingWithdrawal: true });
    try {
      const res = await baseAxios.post(
        "/withdraw/create",
        {
          amount: amount,
          walletAddress: walletAddress,
        },
        {
          withCredentials: true,
        }
      );
      enqueueSnackbar(res.data.message, { variant: "success" });
    } catch (error) {
      console.log("failed to request withdrawal", error);
      axiosError(error);
    } finally {
      set({ loadingWithdrawal: false });
    }
  },
  fetchWithdrawalsApproved: async () => {
    try {
      const res = await baseAxios.get("/withdraw/approved", {
        withCredentials: true,
      });
      set({ approvedWithdrawals: res.data?.data || [] });
      // console.log("Approved Withdrawals:", res.data.data);
    } catch (error) {
      console.log("Error loading approved withdrawals:", error);
    }
  },
  fetchWithdrawalsPending: async () => {
    try {
      const res = await baseAxios.get("/withdraw/pending", {
        withCredentials: true,
      });
      set({ pendingWithdrawals: res.data?.data || [] });
      // console.log("Pending Withdrawals:", res.data.data);
    } catch (error) {
      console.log("Error loading pending withdrawals:", error);
    }
  },
}));

export default useWithdrawStore;
