import { create } from "zustand";
import { axiosError, baseAxios, baseAxiosDelete } from "@/network/axios";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

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
  membership_card_id: boolean;
  activate_membership: boolean;
  tier2_upgrade: boolean;
  tier3_upgrade: boolean;
  security_levy: boolean;
  promotional_bonus: boolean;
  vip_upgrade: boolean;
  premium_upgrade: boolean;
}

export interface IUser {
  email: string;
  username: string;
  profile: IUserProfile;
  balance: IUserBalance;
  _id: string;
  adPrompts: IAdPrompt;
  showAdPrompt: boolean;
  isActive: boolean;
}

interface ILogin {
  username: string;
  password: string;
}

type AuthStatus =
  | "idle" // Initial state, not checked yet
  | "loading" // Login/register in progress
  | "checking" // Checking existing session (initial load)
  | "authenticated" // Logged in and active
  | "inactive" // Logged in but account deactivated
  | "unauthenticated" // Not logged in
  | "error"; // Error state

interface UserStore {
  // State
  user: IUser | null;
  authStatus: AuthStatus;
  isInitialized: boolean; // Track if we've done initial auth check
  errorMessage?: string;
  sideMenuOpen: boolean;
  showBalance: boolean;
  isDeleteAccountLoading: boolean;

  // Actions
  initializeAuth: () => Promise<void>; // For initial app load
  loadUser: () => Promise<void>; // For refreshing user data
  toggleSideMenuOpen: () => void;
  closeSideMenu: () => void;
  toggleShowBalance: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  deleteAccount: (confirmation: string) => Promise<void>;
  clearAuth: () => void; // Reset to initial state

  register: (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    country: string;
    phone: string;
    confirmPassword: string;
  }) => Promise<boolean>;

  login: ({ username, password }: ILogin) => Promise<boolean>;
  // logout: () => Promise<void>;
    logout: () => Promise<string | undefined>;

}

// Create store
const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  authStatus: "idle",
  isInitialized: false,
  errorMessage: undefined,
  sideMenuOpen: true,
  showBalance: true,
  isDeleteAccountLoading: false,

  toggleSideMenuOpen: () =>
    set((state) => ({ sideMenuOpen: !state.sideMenuOpen })),

  closeSideMenu: () => set({ sideMenuOpen: false }),

  toggleShowBalance: () =>
    set((state) => ({ showBalance: !state.showBalance })),

  clearAuth: () =>
    set({
      user: null,
      authStatus: "unauthenticated",
      isInitialized: true,
      errorMessage: undefined,
    }),

  // INITIAL AUTH CHECK - Call this once when app loads
  initializeAuth: async () => {
    // Prevent multiple simultaneous checks
    if (get().authStatus === "checking") return;

    set({ authStatus: "checking" });

    try {
      const res = await baseAxios.get("/auth/me", { withCredentials: true });
      const user = res.data?.data?.user;

      if (user) {
        if (user.isActive === false) {
          set({
            user,
            authStatus: "inactive",
            isInitialized: true,
          });
        } else {
          set({
            user,
            authStatus: "authenticated",
            isInitialized: true,
          });
        }
      } else {
        set({
          user: null,
          authStatus: "unauthenticated",
          isInitialized: true,
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error?.response?.data?.message;

        if (message === "Account is deactivated.") {
          set({
            user: null,
            authStatus: "inactive",
            isInitialized: true,
          });
        } else {
          set({
            user: null,
            authStatus: "unauthenticated",
            isInitialized: true,
          });
        }
      } else {
        set({
          user: null,
          authStatus: "unauthenticated",
          isInitialized: true,
        });
      }
    }
  },

  // REFRESH USER DATA - Call this to update user info without changing auth status
  loadUser: async () => {
    // Skip if already loading
    if (get().authStatus === "loading" || get().authStatus === "checking") {
      return;
    }

    const currentStatus = get().authStatus;

    try {
      const res = await baseAxios.get("/auth/me", { withCredentials: true });
      const user = res.data?.data?.user;

      if (user) {
        set({
          user,
          authStatus: user.isActive === false ? "inactive" : "authenticated",
        });
      } else {
        set({
          user: null,
          authStatus: "unauthenticated",
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error?.response?.data?.message;

        if (message === "Account is deactivated.") {
          set({
            user: null,
            authStatus: "inactive",
          });
        }
        // Don't change status on other errors to preserve current state
      }
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ authStatus: "loading" });
      await baseAxios.post("/auth/forgot-password", { email });
      enqueueSnackbar("Password reset link sent to your email.", {
        variant: "success",
      });
      set({ authStatus: "idle" });
      return true;
    } catch (error) {
      enqueueSnackbar("Failed to send password reset link.", {
        variant: "error",
      });
      console.log(error);
      set({ authStatus: "error" });
      return false;
    }
  },

  register: async (data) => {
    try {
      set({ authStatus: "loading", errorMessage: undefined });

      if (data.password.length < 8) {
        enqueueSnackbar("Password must be at least 8 characters", {
          variant: "error",
        });
        set({ errorMessage: "Password too short", authStatus: "idle" });
        return false;
      }

      const res = await baseAxios.post("/auth/register", data);
      enqueueSnackbar(res.data.message, { variant: "success" });
      set({ authStatus: "idle" });
            window.location.href = "/sign-in";

      return true;
    } catch (error) {
      set({ errorMessage: axiosError(error), authStatus: "error" });
      return false;
    }
  },

  login: async ({ username, password }) => {
    try {
      set({ authStatus: "loading", errorMessage: undefined });

      const res = await baseAxios.post(
        "/auth/login",
        { username, password },
        { withCredentials: true },
      );

      const user = res.data?.data?.user;

      if (user) {
        console.log(user);
        await useUserStore.getState().loadUser();
        set({
          user,
          authStatus: 'authenticated',
          isInitialized: true,
        });
            window.location.href = "/user";
      }

      enqueueSnackbar(res.data.message, { variant: "success" });
      return true;
    } catch (error) {
      set({ errorMessage: axiosError(error), authStatus: "error" });
      return false;
    }
  },

  logout: async () => {
    try {
      set({authStatus:"checking"});
      await baseAxios.post("/auth/logout", {}, { withCredentials: true });
      return "success";
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      delete baseAxios.defaults.headers.common["Authorization"];
      set({
        user: null,
        authStatus: "unauthenticated",
        sideMenuOpen: false,
        isInitialized: true,
      });
      enqueueSnackbar("Logged out successfully", { variant: "success" });
    }
  },

  deleteAccount: async (confirmation: string) => {
    try {
      set({ isDeleteAccountLoading: true });
      const res = await baseAxiosDelete.delete("/settings/account", {
        data: { confirmation },
      });
      enqueueSnackbar(res.data.message, { variant: "success" });

      // Clear auth state after deletion
      delete baseAxios.defaults.headers.common["Authorization"];
      set({
        user: null,
        authStatus: "unauthenticated",
        sideMenuOpen: false,
      });

      // Redirect to login
      window.location.href = "/sign-in";
    } catch (error) {
      axiosError(error);
      console.log("Failed to delete account:", error);
    } finally {
      set({ isDeleteAccountLoading: false });
    }
  },
}));

export default useUserStore;
