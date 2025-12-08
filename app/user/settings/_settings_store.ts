"use client";
import { create } from "zustand";
import { axiosError, baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";
import { isAxiosError } from "axios";

interface IUserProfile {
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
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  dateOfBirth: string;
}

interface IPrefrences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  twoFactorEnabled: boolean;
  language: string;
  currency: string;
}



interface ISettingsStore {
  profile:IUserProfile;
    isLoading:boolean;
    isUpdateLoading:boolean;
    getUserDetails:()=>Promise<void>;
    updateUserDetail:({firstName,lastName,phone,dateOfBirth,country}:IProfile)=>Promise<void>;
    updatePassword: (currentPassword:string,newPassword: string, comfirmPassword: string) => Promise<void>;
}

const useSettingsStore = create<ISettingsStore>((set) => ({
  isLoading: false,
  isUpdateLoading:false,
  profile: {} as IUserProfile,
  getUserDetails: async () => {
    try {
      console.log("works");
      const res = await baseAxios.get("/settings/profile", {
        withCredentials: true,
      });
      set({profile:res.data.data.user});
      console.log(res.data.data.user);
      return res.data.data.user;
      // enqueueSnackbar(res?.data.message, { variant: "success" });
    } catch (error) {
      console.log(error);
    }
  },
  updateUserDetail: async ({
    firstName,
    lastName,
    phone,
    dateOfBirth,
    country,
  }: IProfile) => {
    set({isUpdateLoading:true});
    try {
      console.log(dateOfBirth);
      console.log(firstName);
      console.log(lastName);
      const res = await baseAxios.patch(
        "/settings/profile",
        {firstName,lastName,phone,country,dateOfBirth},
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
      const res = await baseAxios.post(
        `/auth/change-password`,
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
export default useSettingsStore;