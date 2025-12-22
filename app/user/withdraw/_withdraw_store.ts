"use client";
import { create } from "zustand";
import { axiosError, baseAxios } from "@/network/axios";

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
  approvedWithdrawals: [];
  pendingWithdrawals: [];
  loadingWithdrawal:boolean;
  withdrawalHistory: IWithdrawals[];
  fetchWithdrawalsHistory: () => Promise<void>;
  fetchWithdrawalsApproved: () => Promise<void>;
  fetchWithdrawalsPending: () => Promise<void>;
  requestWithdrawal: (walletAddress: string, amount: number) => Promise<void>;
}

const useWithdrawStore = create<IWithdrawStore>((set) => ({
  approvedWithdrawals: [],
  loadingWithdrawal:false,
  withdrawalHistory:[] as IWithdrawals[],
    pendingWithdrawals: [],
    fetchWithdrawalsHistory:async()=>{
      try {
        const res = baseAxios.get("/withdraw/logs",{withCredentials:true})
      } catch (error) {
        console.log("failed to fetch withdrawal history",error);
      }
    },
    requestWithdrawal: async (walletAddress, amount)=> {
      set({ loadingWithdrawal :true});
try {
  const res = await baseAxios.post("/withdraw/create",{
    amount:amount,
    walletAddress:walletAddress
  },
{
  withCredentials:true
})
} catch (error) {
  axiosError(error);
}finally{
  set({ loadingWithdrawal :false});
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