import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosError, baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";

interface IAdmin {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface ILogin {
  username: string;
  password: string;
}

interface UserStore {
  sideMenuOpen: boolean;
  showBalance: boolean;
  admin: IAdmin;
  authStatus: "idle" | "loading" | "authenticated" | "error" | "email-sent";
  errorMessage?: string;

  // Actions
  toggleSideMenuOpen: () => void;
  closeSideMenu: () => void;
  loadUser: () => Promise<void>;

  login: ({ username, password }: ILogin) => Promise<string | undefined>;

  logout: () => Promise<string | undefined>;
}

// Create store
const useAdminStore = create<UserStore>((set) => ({
  sideMenuOpen: true,
  admin: {} as IAdmin,
  errorMessage: undefined,
  showBalance: true,
  authStatus: "idle",

  toggleSideMenuOpen: () =>
    set((state) => ({ sideMenuOpen: !state.sideMenuOpen })),

  closeSideMenu: () => set({ sideMenuOpen: false }),
  // LOGIN
  login: async ({ username, password }: ILogin) => {
    try {
      set({ authStatus: "loading", errorMessage: undefined });

      const res = await baseAxios.post(
        "/admin/auth/login",
        { username, password },
        { withCredentials: true }
      );
      useAdminStore.getState().loadUser();
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
        "/admin/auth/logout",
        {},
        { withCredentials: true }
      );
      delete baseAxios.defaults.headers.common["Authorization"];
      set({
        admin: undefined,
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
    const { authStatus } = useAdminStore.getState();

    // Prevent parallel fetching
    if (authStatus === "loading") return;
    try {
      const res = await baseAxios.get("/admin/auth/me", {
        withCredentials: true,
      });

      const admin = res.data?.data?.admin;
      console.log(admin);
      if (admin) {
        set({
          admin,
          authStatus: "authenticated",
        });
      } else {
        // Gracefully handle "admin not found"
        set({
          admin: undefined,
          authStatus: "idle",
        });
      }
    } catch (error: unknown) {
      console.log(error);
      set({ authStatus: "idle" });
    }
  },
}));

export default useAdminStore;
