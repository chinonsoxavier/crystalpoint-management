"use client";
import { create } from "zustand";
import { baseAxios } from "@/network/axios";

interface IUserProfile {
  total_deposit: number;
  profit_balance: number;
  total_withdrawals: number;
  active_deposit: number;
  pending_withdrawals: number;
  promotional_balance: number;
  ledger_balance: number;
}

interface DashboardStore {
  profile: IUserProfile | null;
  referralLink?: string;
  loadProfile: () => Promise<void>;
  getRefferalLink: () => Promise<void>;
}

const useDashboardStore = create<DashboardStore>((set) => ({
  profile: null,
  referralLink: undefined,
  loadProfile: async () => {
    try {
      const res = await baseAxios.get("/dashboard/summary",{withCredentials:true});
      set({ profile: res.data?.data });
      await useDashboardStore.getState().getRefferalLink();
      console.log(res.data);
    } catch (error) {
      console.log("Error loading profile:", error);
    }
  },
  getRefferalLink: async () => {
    const res = await baseAxios.get("/dashboard/referral-link",{withCredentials:true});
    try {
      set({ referralLink: res.data?.data?.referral_link });
      console.log("Referral Link:", res.data.data);
      console.log("Referral Link link:", res.data.data.referral_link);
    } catch (error) {
      console.log("Error :", error);
    }
  },
}));

export default useDashboardStore;
