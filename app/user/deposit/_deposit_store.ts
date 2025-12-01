"use client";
import { create } from "zustand";
import { baseAxios } from "@/network/axios";

interface IDepositMethod {
  id: string;
  method: string;
  amount: number;
  transactionHash: string;
  status: string;
}

interface IDepositHistory {
  page: number;
  limit: number;
}

interface IDepositMethods {
  id: string;
  name: string;
  network: string;
}

interface DepositStore {
  // Define your state and actions here
  depositMethods: IDepositMethods[];
  depositMethod: IDepositMethod;
  depositHistory: IDepositMethod[];
  fetchDepositMethods: () => Promise<void>;
  fetchDepositHistory: ({ page, limit }: IDepositHistory) => Promise<void>;
  createDepositMethods: () => Promise<void>;
}

const useDepositStore = create<DepositStore>((set) => ({
  depositMethods: [] as IDepositMethods[],
  depositMethod: undefined as unknown as IDepositMethod,
  depositHistory: [] as IDepositMethod[],

  fetchDepositHistory: async ({ page, limit }: IDepositHistory) => {
    try {
      const res = await baseAxios.get(
        `/deposit/logs?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      set({ depositHistory: res.data?.data || [] });
      console.log("Deposit History:", res.data.data);
    } catch (error) {
      console.log("Error loading deposit history:", error);
    }
  },
  fetchDepositMethods: async () => {
    try {
      const res = await baseAxios.get("/deposit/methods", {
        withCredentials: true,
      });
      set({ depositMethods: res.data?.data || [] });
      console.log("Deposit Methods:", res.data.data);
    } catch (error) {
      console.log("Error loading deposit depositMethods:", error);
    }
  },

  createDepositMethods: async () => {
    try {
      const res = await baseAxios.post("/deposit/create", {
        withCredentials: true,
      });
      set({ depositMethod: res.data?.data?.deposit || "" });
      console.log("Create Deposit Response:", res.data);
    } catch (error) {
      console.log("Error creating deposit:", error);
    }
  },

  getDepositById :async (id: string) => { 
    try {
      const res = await baseAxios.get(`/deposit/${id}`, {
        withCredentials: true,
      });
      set({ depositMethod: res.data?.data || "" });
      console.log("Deposit Method by ID:", res.data.data);
    }catch (error) {
      console.log("Error loading deposit method by ID:", error);
    }
  }
}));

export default useDepositStore;
