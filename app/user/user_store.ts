// stores/useUserStore.ts
import { create } from "zustand";
import { baseAxios } from "@/network/axios";
import { AxiosResponse, isAxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { NextResponse } from "next/server";

interface IUserProfile {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  tier: number;
}

interface IUserBalance {
  deposit: number;
  profile: number;
  bonus: number;
}
// Types
interface IUser {
  email: string;
  username: string;
  profile: IUserProfile;
  balance: IUserBalance;
  id: string;
}

interface ILogin {
  username: string;
  password: string;
}

interface IResetPassword {
  username: string;
  email: string;
}

interface UserStore {
  // State
  user: IUser | null;
  authStatus: "idle" | "loading" | "authenticated" | "error" | "email-sent";
  errorMessage?: string;
  sideMenuOpen: boolean;
  showBalance: boolean;

  // Actions
  loadUser: () => Promise<void>;
  toggleSideMenuOpen: () => void;
  closeSideMenu: () => void;
  toggleShowBalance: () => void;
  resetPassword: ({username,email}: IResetPassword) => Promise<void>;

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
  sideMenuOpen: false,
  showBalance: true,

  toggleSideMenuOpen: () =>
    set((state) => ({ sideMenuOpen: !state.sideMenuOpen })),

  closeSideMenu: () => set({ sideMenuOpen: false }),

  toggleShowBalance: () =>
    set((state) => ({ showBalance: !state.showBalance })),

   resetPassword: async ({username,email}:IResetPassword) => {
    try {
      const res = await baseAxios.post("/auth/reset-password", {
        withCredentials: true,
      });
      enqueueSnackbar("Password reset link sent to your email.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to send password reset link.", { variant: "error" });
      console.log("Reset password error:", error);
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

      if (res.status === 409 || res.data?.message?.includes("exists")) {
        enqueueSnackbar("Email already registered. Please login.", {
          variant: "info",
        });
        return "email-exists";
      }

      enqueueSnackbar("Account created! Please log in.", {
        variant: "success",
      });
      set({ authStatus: "email-sent" });
      return "success";
    } catch (error) {
      set({ authStatus: "error" });

      if (isAxiosError(error) && error.response) {
        const msg = error.response.data?.error || "Registration failed";
        console.log(error.response.data);
        enqueueSnackbar(msg, { variant: "error" });
        set({ errorMessage: msg });
      } else {
        enqueueSnackbar("Network error. Please try again.", {
          variant: "error",
        });
        set({ errorMessage: "Network error" });
      }
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

      enqueueSnackbar(`Welcome back, ${user?.username}!`, {
        variant: "success",
      });

      console.log("Login response:", res.data);
      return "success";
    } catch (error) {
      set({ authStatus: "error" });

      if (isAxiosError(error) && error.response) {
        const msg =
          error.response.data?.error || "Invalid username or password";
        set({ errorMessage: msg });
        enqueueSnackbar(msg, { variant: "error" });
      } else {
        enqueueSnackbar("Login failed. Check your connection.", {
          variant: "error",
        });
      }
    }
  },

  // LOGOUT
  logout:async () => {
    try {

      await baseAxios.post("/auth/logout", {}, { withCredentials: true });
      delete baseAxios.defaults.headers.common["Authorization"];
      set({
        user: null,
        authStatus: "idle",
        sideMenuOpen: false,
      });
      enqueueSnackbar("Logged out successfully", { variant: "info" });
      return "success";
    } catch (error) {
      enqueueSnackbar("Logout failed. Please try again.", { variant: "error" });
      console.log("Logout error:", error);
    }
  },
loadUser: async () => {
  const { authStatus } = useUserStore.getState();

  // Prevent parallel fetching
  if (authStatus === "loading") return;

  set({ authStatus: "loading" });

  try {
    const res = await baseAxios.get("/auth/me", { withCredentials: true });

    const user = res.data?.data?.user;

    if (user) {
      set({
        user,
        authStatus: "authenticated",
      });
    } else {
      // Gracefully handle "user not found"
      set({
        user: null,
        authStatus: "idle",
      });
    }
  } catch (error: unknown) {
    // Expected UNAUTH states (e.g. 401, 404)
    if (isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 404)) {
      set({
        user: null,
        authStatus: "idle",
      });
      return;
    }

    // Unexpected errors only
    console.error("Unexpected error loading user:", error);
    set({
      user: null,
      authStatus: "idle",
    });
  }
},

}));

export default useUserStore;
