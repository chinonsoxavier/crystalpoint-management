"use client";
import { create } from "zustand";
import { axiosError, baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";
import { isAxiosError } from "axios";

interface IAdminProfile {
  username: string;
  email: string;
  tier: number;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  dateOfBirth: string;
  lastLogin: string;
  isActive: boolean;
  createdAt: string;
  id:string;
  profile:IProfile;
  prefrences:IPrefrences;
}

interface IProfile {
  username: string;
  email: string;
}

interface IPrefrences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  twoFactorEnabled: boolean;
  language: string;
  currency: string;
}



interface IAdminSettingsStore {
  profile:IAdminProfile | null;
    isLoading:boolean;
    isUpdateLoading:boolean;
    getAdminDetails:()=>Promise<void>;
    updateAdminDetail:({email,username}:IProfile)=>Promise<void>;
    updatePassword: (currentPassword:string,newPassword: string, comfirmPassword: string) => Promise<void>;
}

const useAdminSettingsStore = create<IAdminSettingsStore>((set) => ({
  isLoading: false,
  isUpdateLoading:false,
  profile: null,
  getAdminDetails: async () => {
    try {
      const res = await baseAxios.get("/admin/auth/me", {
        withCredentials: true,
      });
      set({profile:res.data.data.admin});
      console.log(res.data.data.admin);
      return res.data.data.admin;
    } catch (error) {
      console.log(error);
    }
  },
  updateAdminDetail: async ({
    email,
    username,
  }: IProfile) => {
    set({isUpdateLoading:true});
    try {
      const res = await baseAxios.put(
        "/admin/auth/profile",
        {email,username},
        { withCredentials: true }
      );
      enqueueSnackbar(res?.data.message, { variant: "success" });
      set({profile:res.data.data.user});
    } catch (error) {
            axiosError(error);
      console.log(`failed to update user details`,error);
    }finally{
      set({isUpdateLoading:false});
    }
  },
  updatePassword: async (
    currentPassword: string,
    newPassword: string,
    comfirmPassword: string
  ) => {
    set({ isLoading: true });
    try {
      const res = await baseAxios.put(
        `/admin/auth/change-password`,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: comfirmPassword,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Password updated successfully:", res.data);
      enqueueSnackbar("your password has been successfully updated!", {
        variant: "success",
      });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const msg = error.response.data?.error || "password update failed";
        enqueueSnackbar(msg, { variant: "error" });
      } else {
        enqueueSnackbar("password update failed", {
          variant: "error",
        });
      }
      console.log("Error updating password:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
export default useAdminSettingsStore;