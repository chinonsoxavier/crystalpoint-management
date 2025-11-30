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

interface DepositStore {
  // Define your state and actions here
  methods: string[];
  depositMethod: IDepositMethod;
  depositHistory: IDepositMethod[];
  fetchDepositMethods: () => Promise<void>;
  fetchDepositHistory: ({page,limit}:IDepositHistory) => Promise<void>;
  createDepositMethods: () => Promise<void>;
}

const useDepositStore = create<DepositStore>((set) => ({
    methods: [""],
    depositMethod:undefined as unknown as IDepositMethod,
    depositHistory: [] as IDepositMethod[],

    fetchDepositHistory: async ({page,limit}:IDepositHistory) => {
        try {
            const res = await baseAxios.get(`/deposit/logs?page=${page}&limit=${limit}`, {
                withCredentials: true,
            });
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
            set({ methods: res.data?.data || [] });
            console.log("Deposit Methods:", res.data.data);
        } catch (error) {
            console.log("Error loading deposit methods:", error);
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
    }

}));

export default useDepositStore;