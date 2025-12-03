"use client";
import { create } from "zustand";
import { baseAxios } from "@/network/axios";

interface IInvestPlans {
      id: string,
      name: string,
      description: string,
      roiPercentage: number,
      durationDays: number,
      minAmount: number,
      maxAmount: number,
      isActive: true,
      isFetchingMethods: boolean,
}

interface IInvestStore {
  investPlans: IInvestPlans[];
  investHistory: [];
  isFetchingInvestPlans: boolean;
  isFetchingInvestHistory: boolean;
  fetchInvestPlans: () => Promise<void>;
  fetchInvestHistory: (page: number) => Promise<void>;
}

const useInvestStore = create<IInvestStore>((set) => ({
  investPlans: [] as IInvestPlans[],
  investHistory: [],
  isFetchingInvestPlans: false,
  isFetchingInvestHistory: false,
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
        `/invest/history?page=${page}&limit=${20}`,
        {
          withCredentials: true,
        }
      );
      set({ investHistory: res.data?.data || [] });
      console.log("Invest History:", res.data.data);
    } catch (error) {
      console.log("Error loading invest history:", error);
    }finally {
      set({ isFetchingInvestHistory: false });
    }
  },
}));

export default useInvestStore;