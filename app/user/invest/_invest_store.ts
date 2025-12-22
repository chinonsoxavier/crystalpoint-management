"use client";
import { create } from "zustand";
import { axiosError, baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";

interface IInvestPlans {
  _id: string;
  name: string;
  description: string;
  roiPercentage: number;
  durationDays: number;
  minAmount: number;
  maxAmount: number;
  isActive: true;
  isFetchingMethods: boolean;
}

interface IInvestmentStats {
  totalInvested: number;
  totalProfit: number;
  activeCount: number;
  completedCount: number;
}

export interface IInvestLog {
  _id: string;
  plan: {
    _id: string;
    name: string;
    description: string;
    roiPercentage: number;
    durationDays: number;
    minAmount: number;
    maxAmount: number;
    isActive: true;
  };
  amount: number;
  expectedReturn: number;
  status: string;
  startDate:string;
  endDate:string;
}

interface IInvestStore {
  investPlans: IInvestPlans[];
  investmentSuccessfull: boolean;
  investmentStats: IInvestmentStats;
  investHistory: IInvestLog[];
  completedInvestment: [];
  activeInvestment: IInvestPlans[];
  isFetchingInvestPlans: boolean;
  isActivatingInvestment: boolean;
  isFetchingInvestHistory: boolean;
  isFetchingInvestStats: boolean;
  resetInvestmentSuccessfull: () => void;
  fetchInvestPlans: () => Promise<void>;
  fetchInvestStats: () => Promise<void>;
  fetchActiveInvestments: () => Promise<void>;

  activateInvestment: (params: {
    planId: string;
    amount: number;
  }) => Promise<void>;
  fetchInvestHistory: (page: number) => Promise<void>;
}

const useInvestStore = create<IInvestStore>((set) => ({
  investPlans: [] as IInvestPlans[],
  investmentStats: {} as IInvestmentStats,
  investmentSuccessfull: false,
  isActivatingInvestment: false,
  investHistory: [],
  completedInvestment: [],
  activeInvestment: [],
  isFetchingInvestPlans: false,
  isFetchingInvestStats: false,
  isFetchingInvestHistory: false,

  resetInvestmentSuccessfull: () => {
    set({ investmentSuccessfull: false });
  },
  activateInvestment: async (params) => {
    set({ isActivatingInvestment: true });
    try {
      const res = baseAxios.post(
        "/investment/activate",
        { planId: params.planId, amount: params.amount },
        { withCredentials: true }
      );
      console.log(params.planId);
      enqueueSnackbar((await res).data.message, { variant: "success" });
      set({ investmentSuccessfull: true });
    } catch (error) {
      console.log("failed to activate investment plan", error);
      axiosError(error);
    } finally {
      set({ isActivatingInvestment: false });
    }
  },
  fetchInvestPlans: async () => {
    try {
      set({ isFetchingInvestPlans: true });
      const res = await baseAxios.get("/investment/plans", {
        withCredentials: true,
      });
      set({ investPlans: res.data?.data || [] });
      console.log("Invest Plans:", res.data.data);
    } catch (error) {
      console.log("Error loading invest plans:", error);
    } finally {
      set({ isFetchingInvestPlans: false });
    }
  },
  fetchInvestHistory: async (page: number) => {
    set({ isFetchingInvestHistory: true });
    try {
      const res = await baseAxios.get(
        `/investment/logs?page=${page}&limit=${20}`,
        {
          withCredentials: true,
        }
      );
      set({ investHistory: res.data?.data?.investments || [] });
      console.log("Invest History:", res.data.data);
    } catch (error) {
      console.log("Error loading invest history:", error);
    } finally {
      set({ isFetchingInvestHistory: false });
    }
  },
  fetchInvestStats: async () => {
    set({ isFetchingInvestStats: true });
    try {
      const res = await baseAxios.get(`/investment/stats`, {
        withCredentials: true,
      });
      set({ investmentStats: res.data?.data || [] });
      console.log("Invest Stats:", res.data.data);
    } catch (error) {
      console.log("Error loading invest stats:", error);
    } finally {
      set({ isFetchingInvestStats: false });
    }
  },
  fetchActiveInvestments: async () => {
    try {
      const res = await baseAxios.get("/investment/active", {
        withCredentials: true,
      });
      set({ activeInvestment: res.data?.data || [] });
      console.log("Active Investments:", res.data.data);
    } catch (error) {
      console.log("failed to get active investments:", error);
    }
  },
}));

export default useInvestStore;
