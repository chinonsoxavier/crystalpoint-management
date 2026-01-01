import { create } from "zustand";
import { axiosError, baseAxios, baseAxiosDelete } from "@/network/axios";
import { enqueueSnackbar } from "notistack";

interface IUserProfile {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  tier: number;
}

interface IUserBalance {

  activeDeposit: number;

  bonus: number;

  deposit: number;

  pendingWithdrawals: number;

  profit: number;

  promotionalBonus: number;

  totalWithdrawn: number;
}

interface IAdPrompt {
  membership_card_id: boolean,
  activate_membership: boolean,
  tier2_upgrade: boolean,
  tier3_upgrade: boolean,
  security_levy: boolean,
  promotional_bonus: boolean,
  vip_upgrade: boolean,
  premium_upgrade: boolean
}
// Types
export interface IUser {
  email: string;
  username: string;
  profile: IUserProfile;
  balance: IUserBalance;
  _id: string;
  adPrompts: IAdPrompt;
  showAdPrompt: boolean;
  isActive:boolean
}

interface ILogin {
  username: string;
  password: string;
}


interface UserStore {
  // State
  user: IUser | null;
  authStatus: "idle" | "loading" | "authenticated" | "error" | "email-sent";
  errorMessage?: string;
  sideMenuOpen: boolean;
  showBalance: boolean;
  isDeleteAccountLoading: boolean;

  // Actions
  loadUser: () => Promise<void>;
  toggleSideMenuOpen: () => void;
  closeSideMenu: () => void;
  toggleShowBalance: () => void;
  resetPassword: (email: string) => Promise<undefined | string>;
  deleteAccount: (confirmation: string) => Promise<void>;

  register: (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    country: string;
    phone: string;
    confirmPassword: string;
  }) => Promise<string | undefined>;

  login: ({ username, password }: ILogin) => Promise<string | undefined>;

  logout: () => Promise<string | undefined>;
}

// Create store
const useUserStore = create<UserStore>((set) => ({
  user: null,
  authStatus: "idle",
  errorMessage: undefined,
  sideMenuOpen: true,
  showBalance: true,
  isDeleteAccountLoading: false,

  toggleSideMenuOpen: () =>
    set((state) => ({ sideMenuOpen: !state.sideMenuOpen })),

  closeSideMenu: () => set({ sideMenuOpen: false }),

  toggleShowBalance: () =>
    set((state) => ({ showBalance: !state.showBalance })),

  resetPassword: async (email: string) => {
    try {
      set({ authStatus: "loading" });
      console.log(email);
      const res = await baseAxios.post("/auth/forgot-password", { email });
      enqueueSnackbar("Password reset link sent to your email.", {
        variant: "success",
      });
      set({ authStatus: "email-sent" });
      return "success";
    } catch (error) {
      enqueueSnackbar("Failed to send password reset link.", {
        variant: "error",
      });
      console.log("Reset password error:", error);
      set({ authStatus: "error" });
    }
  },

  // REGISTER
  register: async ({
    email,
    password,
    country,
    username,
    firstName,
    lastName,
    phone,
    confirmPassword,
  }) => {
    try {
      set({ authStatus: "loading", errorMessage: undefined });
      if (password.length < 4) {
        enqueueSnackbar("Password must be at least 8 characters", {
          variant: "error",
        });
        set({ errorMessage: "Password too short", authStatus: "error" });
        return;
      }

      const res = await baseAxios.post("/auth/register", {
        email,
        password,
        username,
        country,
        firstName,
        lastName,
        phone,
        confirmPassword,
      });
      console.log(res.data);
      enqueueSnackbar(res.data.message, {
        variant: "success",
      });
      set({ authStatus: "email-sent" });
      return "success";
    } catch (error) {
      set({ errorMessage: axiosError(error), authStatus: "error" });
    } finally {
      set({ authStatus: "idle" });
    }
  },

  // LOGIN
  login: async ({ username, password }: ILogin) => {
    try {
      set({ authStatus: "loading", errorMessage: undefined });

      const res = await baseAxios.post(
        "/auth/login",
        { username, password },
        { withCredentials: true }
      );
      const { user } = res.data?.data;
      useUserStore.getState().loadUser();
      set({
        authStatus: "authenticated",
      });

      enqueueSnackbar(res.data.message, {
        variant: "success",
      });

      console.log("Login response:", res.data);
      return "success";
    } catch (error) {
      set({ errorMessage: axiosError(error), authStatus: "error" });
    }
  },

  // LOGOUT
  logout: async () => {
    try {
      const res = await baseAxios.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );
      delete baseAxios.defaults.headers.common["Authorization"];
      set({
        user: null,
        authStatus: "idle",
        sideMenuOpen: false,
      });
      enqueueSnackbar(res.data.message, { variant: "success" });
      return "success";
    } catch (error) {
      axiosError(error);
      console.log("Logout error:", error);
    }
  },
  loadUser: async () => {
    const { authStatus } = useUserStore.getState();

    // Prevent parallel fetching
    if (authStatus === "loading") return;
    // set({ authStatus: "loading" });

    try {
      const res = await baseAxios.get("/auth/me", { withCredentials: true });

      const user = res.data?.data?.user;

      if (user) {
        set({
          user,
          authStatus: "authenticated",
        });
        console.log(user);
      } else {
        // Gracefully handle "user not found"
        set({
          user: null,
          authStatus: "idle",
        });
      }
    } catch (error: unknown) {
      console.log(error);
    }
  },

  deleteAccount: async (confirmation: string) => {
    try {
      set({ isDeleteAccountLoading: true });
      const res = await baseAxiosDelete.delete(
        "/settings/account",
        { data: { confirmation } }
        // { withCredentials: true }
      );
      enqueueSnackbar(res.data.message, { variant: "success" });
      useUserStore.getInitialState().logout();
      // Redirect to login page or handle logout
      // window.location.href = "/login";
    } catch (error) {
      axiosError(error);
      console.log("Failed to delete account:", error);
    } finally {
      set({ isDeleteAccountLoading: false });
    }
  },
}));

export default useUserStore;
