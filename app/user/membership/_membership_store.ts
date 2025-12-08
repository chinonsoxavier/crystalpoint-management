// stores/useUserStore.ts
import { create } from "zustand";
import { axiosError, baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";

interface IMembershipCards {
  id: string;
  name: string;
  tier: number;
  requiredDeposit: number;
  benefits: string[];
  isActive: boolean;
  isEligible: boolean;
  userTotalDeposit: number;
  canUpgrade: boolean;
  currentTier: number;
}

interface MembershipStore {
    membershipCards:IMembershipCards[],
    getMembershipCards:()=>Promise<void>
}

const useMembershipStore = create<MembershipStore>((set) => ({
    membershipCards:[],
    getMembershipCards:async()=> {
        try {
            const res = await baseAxios.get("/membership/cards",{withCredentials:true});
            set({membershipCards:res.data.data});
            console.log(res.data)
        } catch (error) {
            console.log('failed to get membership cards',error)
        }
    },
}))


export default useMembershipStore;