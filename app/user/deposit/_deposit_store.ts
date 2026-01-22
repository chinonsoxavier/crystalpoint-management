"use client";
import { create } from "zustand";
import { axiosError, baseAxios, baseAxiosPatch } from "@/network/axios";
import { enqueueSnackbar } from "notistack";

export interface IDepositMethod {
  _id: string;
  method: string;
  amount: number;
  transactionHarsh: string;
  status:
    | "awaiting_payment"
    | "pending_approval"
    | "confirmed"
    | "failed"
    | "cancelled";
  walletAddress: string;
  createdAt: string;
}

interface IDepositMethods {
  _id: string;
  name: string;
  network: string;
  walletAddress: string;
}
interface IDepositInstructions {
  method: string;
  walletAddress: string;
  instructions: string;
  qrCodeUrl: string;
  network: string;
  minimumAmount: number;
  estimatedConfirmationTime: string;
  importantNotes: string[];
}

interface DepositStore {
  depositRequestSuccessful: boolean;
  isDepositLoading: boolean;
  isDepositCancelLoading: boolean;
  selectedDepositMethod?: IDepositMethods;
  depositMethods: IDepositMethods[];
  depositMethod: IDepositMethod;
  depositHistory: IDepositMethod[];
  depositInstructions: IDepositInstructions | null;
  setSelectedDepositMethod: (method: IDepositMethods) => void;
  fetchDepositMethods: () => Promise<void>;
  fetchDepositHistory: (page?: number, limit?: number) => Promise<void>;
  cancelPendingDeposit: (id: string) => Promise<void>;
  getDepositIntructions: (method: string) => Promise<void>;
  resetDepositState:()=>void;
  createDepositRequest: (params: {
    method?: string;
    amount?: number;
    transactionHash?: string;
  }) => Promise<void>;
}



const useDepositStore = create<DepositStore>((set) => ({
  isDepositLoading: false,
  depositRequestSuccessful: false,
  isDepositCancelLoading:false,
  depositInstructions: null,
  depositMethods: [
      {
        _id: "BTC",
        name: "Bitcoin",
        network: "BTC",
        walletAddress: "bc1q00tpy9axmflknpxhuqafuf9dj62pdenc5h3pwr",
      },
      {
        _id: "USDT-TRC20",
        name: "USDT (TRC20)",
        network: "TRON",
        walletAddress: "TCi5CsQnzDCfZdRp9jYZoGpe1qD6Zpy6Je",
      },
      {
        _id: "USDT-ERC20",
        name: "USDT (ERC20)",
        network: "USDT-ERC20",
        walletAddress: "0x79fbF12Dc6BB71262Cb640c63641B4A6531E7138",
      },
      {
        _id: "BNB",
        name: "Binance Coin",
        network: "BNB",
        walletAddress: "0x79fbF12Dc6BB71262Cb640c63641B4A6531E7138",
      },
      {
        _id: "ETH",
        name: "Ethereum",
        network: "Ethereum",
        walletAddress: "0x79fbF12Dc6BB71262Cb640c63641B4A6531E7138",
      },
  ],
  depositMethod: undefined as unknown as IDepositMethod,
  depositHistory:[],  


  cancelPendingDeposit :async (id)=>{
    set({isDepositCancelLoading:true});
   try {
      const res = await baseAxiosPatch.patch(`/deposit/${id}/cancel`,{withCredentials:true});
      console.log(res.data);
      enqueueSnackbar(res.data.message,{variant:'success'});
   } catch (error) {
      console.log("failed to cancel deposit", error);
   }finally{  
    set({ isDepositCancelLoading: false });

   }
  },
  resetDepositState:()=>{
    set({depositInstructions:null,isDepositLoading:false,depositRequestSuccessful:false})
  },
  getDepositIntructions: async (method) => {
    console.log("deposit instructions", method);
    try {
      const res = await baseAxios.get(`/deposit/instructions/${method}`,{withCredentials:true});
      set({ depositInstructions: res.data.data });
    } catch (error) {
      console.log("failed to fetch deposit intructions", error);
    }
  },

  setSelectedDepositMethod: (method: IDepositMethods) => {
    set({ selectedDepositMethod: method });
  },

  fetchDepositHistory: async (page?: number,limit?:number) => {
    try {
      const res = await baseAxios.get(
        `/deposit/logs?page=${page}`,
        {
          withCredentials: true,
        }
      );
      set({ depositHistory: res.data?.data.deposits || [] });
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
      // set({ depositMethods: res.data?.data || [] });
      console.log("Deposit Methods:", res.data.data);
    } catch (error) {
      console.log("Error loading deposit depositMethods:", error);
    }
  },

  createDepositRequest: async (params) => {
    set({ isDepositLoading: true });
    console.log(params);
    try {
      const res = await baseAxios.post(
        "/deposit/create",
        {
          method: params.method,
          amount: params.amount,
          transactionHash: params.transactionHash,
        },
        {
          withCredentials: true,
        }
      );
      enqueueSnackbar(res.data.message,{variant:"success"})
      console.log("Create Deposit Response:", res.data);
      set({ depositRequestSuccessful: true });
    } catch (error) {
      axiosError(error)
      console.log("Error creating deposit:", error);
    } finally {
      set({ isDepositLoading: false });
    }
  },
  getDepositById: async (_id: string) => {
    try {
      const res = await baseAxios.get(`/deposit/${_id}`, {
        withCredentials: true,
      });
      set({ depositMethod: res.data?.data || "" });
      console.log("Deposit Method by ID:", res.data.data);
    } catch (error) {
      console.log("Error loading deposit method by ID:", error);
    }
  },
}));

export default useDepositStore;
