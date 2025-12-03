"use client";
import { create } from "zustand";
import { baseAxios } from "@/network/axios";

interface IWithdrawals {
  id: string;
  amount: number;
  user: string;
  status: string;
  walletAddress: string;
  createdAt: string;
  updatedAt?: string;
}

interface IWithdrawStore {
  approvedWithdrawals: IWithdrawals[];
    pendingWithdrawals: IWithdrawals[];
    fetchWithdrawalsApproved: () => Promise<void>;
    fetchWithdrawalsPending: () => Promise<void>;
}

const useWithdrawStore = create<IWithdrawStore>((set) => ({
  approvedWithdrawals: [],
    pendingWithdrawals: [],
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