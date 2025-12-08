"use client";
import { create } from "zustand";
import { baseAxios } from "@/network/axios";

interface IDepositMethod {
  id: string;
  method: string;
  amount: number;
  transactionHarsh: string;
  status: "pending" | "processing" | "success" | "failed";
  walletAddress: string;
}

interface IDepositMethods {
  id: string;
  name: string;
  network: string;
  walletAddress: string;
}

interface DepositStore {
  selectedDepositMethod?: IDepositMethods;
  depositMethods: IDepositMethods[];
  depositMethod: IDepositMethod;
  depositHistory: IDepositMethod[];
  pendingDeposits: [];
  approvedDeposits: [];
  setSelectedDepositMethod: (method: IDepositMethods) => void;
  fetchDepositMethods: () => Promise<void>;
  fetchDepositHistory: (page: number) => Promise<void>;
  createDepositMethods: () => Promise<void>;
}



const useDepositStore = create<DepositStore>((set) => ({
  depositMethods: [] as IDepositMethods[],
  approvedDeposits:[],
  pendingDeposits:[],
  depositMethod: undefined as unknown as IDepositMethod,
  depositHistory: [
    {
      id: "728ed52f",
      method: "Btc",
      amount: 100,
      status: "pending",
      transactionHarsh: "nc jhc",
      walletAddress: "bbcuhc gh hckdgh",
    },

    {
      id: "728ed52f",
      method: "Btc",
      amount: 100,
      status: "pending",
      transactionHarsh: "nc jhc",
      walletAddress: "bbcuhc gh hckdgh",
    },

    {
      id: "728ed52f",
      method: "Btc",
      amount: 100,
      status: "pending",
      transactionHarsh: "nc jhc",
      walletAddress: "bbcuhc gh hckdgh",
    },

    {
      id: "728ed52f",
      method: "Btc",
      amount: 100,
      status: "pending",
      transactionHarsh: "nc jhc",
      walletAddress: "bbcuhc gh hckdgh",
    },

    {
      id: "728ed52f",
      method: "Btc",
      amount: 100,
      status: "pending",
      transactionHarsh: "nc jhc",
      walletAddress: "bbcuhc gh hckdgh",
    },

    {
      id: "728ed52f",
      method: "Btc",
      amount: 100,
      status: "pending",
      transactionHarsh: "nc jhc",
      walletAddress: "bbcuhc gh hckdgh",
    },

    // ...
  ],

  setSelectedDepositMethod: (method: IDepositMethods) => {
    set({ selectedDepositMethod: method });
  },

  fetchDepositHistory: async (page: number) => {
    try {
      const res = await baseAxios.get(
        `/deposit/logs?page=${page}&limit=${20}`,
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

  getDepositById: async (id: string) => {
    try {
      const res = await baseAxios.get(`/deposit/${id}`, {
        withCredentials: true,
      });
      set({ depositMethod: res.data?.data || "" });
      console.log("Deposit Method by ID:", res.data.data);
    } catch (error) {
      console.log("Error loading deposit method by ID:", error);
    }
  },
  fetchApprovedDeposits: async () => {
    try {
      const res = await baseAxios.get("/deposit/approved", {
        withCredentials: true,
      });
      set({ approvedDeposits: res.data?.data || [] });
      // console.log("Approved Withdrawals:", res.data.data);
    } catch (error) {
      console.log("Error loading approved deposits:", error);
    }
  },
  fetchPendingWithdrawals: async () => {
    try {
      const res = await baseAxios.get("/deposit/pending", {
        withCredentials: true,
      });
      set({ pendingDeposits: res.data?.data || [] });
      // console.log("Pending Withdrawals:", res.data.data);
    } catch (error) {
      console.log("Error loading pending deposits:", error);
    }
  },
}));

export default useDepositStore;
