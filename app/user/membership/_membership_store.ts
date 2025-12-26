import { create } from "zustand";
import { axiosError, baseAxios } from "@/network/axios";

interface IMembershipCard {
  _id: string;
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

interface ICurrentMembership {
  membership: {
    id: string;
    user: string;
    card: {
      id: string;
      name: string;
      tier: number;
      requiredDeposit: number;
      benefits: string[];
      isActive: boolean;
    };
    status: string;
    activatedAt: string;
  };
  currentTier: number;
}

interface IMembershipBenefits {
  benefits: string[];
  tier: number;
  name: string;
  requiredDeposit: number;
}

interface IMembershipHistoryItem {
  id: string;
  user: string;
  card: {
    id: string;
    name: string;
    tier: number;
    requiredDeposit: number;
    benefits: string[];
    isActive: boolean;
  };
  status: string;
  activatedAt: string;
}

interface IMembershipHistory {
  memberships: IMembershipHistoryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface MembershipStore {
  membershipCards: IMembershipCard[];
  currentMembership: ICurrentMembership | null;
  membershipBenefits: IMembershipBenefits | null;
  membershipHistory: IMembershipHistory | null;
  isActivated: boolean;
  loading: {
    cards: boolean;
    current: boolean;
    benefits: boolean;
    history: boolean;
    activating: boolean;
  };
  error: string | null;
  getMembershipCards: () => Promise<void>;
  getCurrentMembership: () => Promise<void>;
  getMembershipBenefits: () => Promise<void>;
  setIsActivated: (activated:boolean) => Promise<void>;
  getMembershipHistory: (page?: number, limit?: number) => Promise<void>;
  activateMembership: (cardId: string) => Promise<boolean>;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const useMembershipStore = create<MembershipStore>((set, get) => ({
  membershipCards: [],
  currentMembership: null,
  membershipBenefits: null,
  isActivated:false,
  membershipHistory: null,
  loading: {
    cards: false,
    current: false,
    benefits: false,
    history: false,
    activating: false,
  },
  error: null,
  setIsActivated: async (activated) => {
     set({isActivated:activated})
   },
  getMembershipCards: async () => {
    set({ loading: { ...get().loading, cards: true }, error: null });
    try {
      const res = await baseAxios.get("/membership/cards", {
        withCredentials: true,
      });
      if (res.data.success) {
        set({ membershipCards: res.data.data });
      }
    } catch (error) {
      console.error("Failed to get membership cards:", error);
      const errorMessage = axiosError(error);
      set({ error: errorMessage });
    } finally {
      set({ loading: { ...get().loading, cards: false } });
    }
  },

  getCurrentMembership: async () => {
    set({ loading: { ...get().loading, current: true }, error: null });
    try {
      const res = await baseAxios.get("/membership/current", {
        withCredentials: true,
      });
    //   if (res.data.success) {
        set({ currentMembership: res.data.data });
        console.log(res.data.data);
    //   }
    } catch (error) {
      console.error("Failed to get current membership:", error);
      const errorMessage = axiosError(error);
      set({ error: errorMessage });
    } finally {
      set({ loading: { ...get().loading, current: false } });
    }
  },

  getMembershipBenefits: async () => {
    set({ loading: { ...get().loading, benefits: true }, error: null });
    try {
      const res = await baseAxios.get("/membership/benefits", {
        withCredentials: true,
      });
      if (res.data.success) {
        set({ membershipBenefits: res.data.data });
      }
    } catch (error) {
      console.error("Failed to get membership benefits:", error);
      const errorMessage = axiosError(error);
      set({ error: errorMessage });
    } finally {
      set({ loading: { ...get().loading, benefits: false } });
    }
  },

  getMembershipHistory: async (page = 1, limit = 10) => {
    set({ loading: { ...get().loading, history: true }, error: null });
    try {
      const res = await baseAxios.get("/membership/history", {
        params: { page, limit },
        withCredentials: true,
      });
      if (res.data.success) {
        set({ membershipHistory: res.data.data });
      }
    } catch (error) {
      console.error("Failed to get membership history:", error);
      const errorMessage = axiosError(error);
      set({ error: errorMessage });
    } finally {
      set({ loading: { ...get().loading, history: false } });
    }
  },

  activateMembership: async (cardId: string) => {
    set({ loading: { ...get().loading, activating: true }, error: null });
    try {
      const res = await baseAxios.post(
        "/membership/activate",
        { cardId },
        { withCredentials: true }
      );
      if (res.data.success) {
        // Refresh cards and current membership after activation
        await Promise.all([
          get().getMembershipCards(),
          get().getCurrentMembership(),
        ]);
        set({isActivated:true})
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to activate membership:", error);
      const errorMessage = axiosError(error);
      set({ error: errorMessage });
      return false;
    } finally {
      set({ loading: { ...get().loading, activating: false } });
    }
  },

  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
}));

export default useMembershipStore;
