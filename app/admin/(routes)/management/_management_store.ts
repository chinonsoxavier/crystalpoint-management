import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosError, baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";

interface IAdmin {
  _id: string;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface AdminManagementStore {
  // State
  admins: IAdmin[];
  isLoadingAdmins: boolean;
  isCreatingAdmin: boolean;
  isUpdatingAdminStatus: boolean;

  // Actions
  fetchAdmins: () => Promise<void>;
  createAdmin: (data: {
    email: string;
    username: string;
    password: string;
    role: string;
  }) => Promise<void>;
  updateAdminStatus: (adminId: string, isActive: boolean) => Promise<void>;
}

export const useAdminManagementStore = create<AdminManagementStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      admins: [],
      isLoadingAdmins: false,
      isCreatingAdmin: false,
      isUpdatingAdminStatus: false,

      // Actions
      fetchAdmins: async () => {
        set({ isLoadingAdmins: true });
        try {
          const response = await baseAxios.get("/admin/auth/list", {
            withCredentials: true,
          });

          set({
            admins: response.data?.data?.admins || [],
            isLoadingAdmins: false,
          });
          console.log(response.data.data);
        } catch (error) {
          set({ isLoadingAdmins: false });
          console.log("Failed to fetch admins:", error);
        
        }
      },

      createAdmin: async (data) => {
        set({ isCreatingAdmin: true });
        console.log(data);
        try {
          const response = await baseAxios.post("/admin/auth/create", data, {
            withCredentials: true,
          });

          enqueueSnackbar(response.data.message, { variant: "success" });

          // Refresh admins list
          get().fetchAdmins();
          set({ isCreatingAdmin: false });
        } catch (error) {
          set({ isCreatingAdmin: false });
          console.log("Failed to create admin:", error);
          axiosError(error);
        }
      },

      updateAdminStatus: async (adminId, isActive) => {
        set({ isUpdatingAdminStatus: true });
        try {
          const response = await baseAxios.put(
            `/admin/auth/${adminId}/status`,
            {isActive:isActive },
            { withCredentials: true }
          );

          enqueueSnackbar(response.data.message, {
            variant: "success",
          });

          // Update local state
          set((state) => ({
            admins: state.admins.map((admin) =>
              admin._id === adminId ? { ...admin, isActive } : admin
            ),
            isUpdatingAdminStatus: false,
          }));
        } catch (error) {
          set({ isUpdatingAdminStatus: false });
          console.log("Failed to update admin status:", error);
         axiosError(error);
        }
      },
    }),
    { name: "admin-management-store" }
  )
);
