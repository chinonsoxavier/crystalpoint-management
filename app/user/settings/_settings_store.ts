"use client";
import { create } from "zustand";
import { axiosError, baseAxios, baseAxiosDelete } from "@/network/axios";
import { enqueueSnackbar } from "notistack";
import { isAxiosError } from "axios";
import useUserStore from "../user_store";

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
  id: string;
  profile: IProfile;
  preferences: IPreferences;
}

interface IProfile {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  dateOfBirth: string;
}

interface IPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  twoFactorEnabled: boolean;
  language: string;
  currency: string;
}

interface ILoginHistory {
   ipAddress:string;
   timestamp:string
}
interface ISecuritySettings {
  twoFactorEnabled: boolean;
  lastLogin: string;
  loginHistory: ILoginHistory[];
  accountCreated: string;
}

interface ISettingsStore {
  profile: IUserProfile;
  securitySettings: ISecuritySettings;
  isLoading: boolean;
  isUpdateLoading: boolean;
  isPasswordLoading: boolean;
  isPreferencesLoading: boolean;
  isSecurityLoading: boolean;
  isTwoFactorLoading: boolean;

  // Profile methods
  getUserDetails: () => Promise<void>;
  updateUserDetail: (data: IProfile) => Promise<void>;
  updatePassword: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<void>;

  // Preferences methods
  updatePreferences: (preferences: Partial<IPreferences>) => Promise<void>;

  // Security methods
  getSecuritySettings: () => Promise<void>;
  toggleTwoFactor: (enabled: boolean) => Promise<void>;

}

const useSettingsStore = create<ISettingsStore>((set, get) => ({
  profile: {} as IUserProfile,
  securitySettings: {} as ISecuritySettings,
  isLoading: false,
  isUpdateLoading: false,
  isPasswordLoading: false,
  isPreferencesLoading: false,
  isSecurityLoading: false,
  isTwoFactorLoading: false,
  isDeleteAccountLoading: false,

  // Profile methods
  getUserDetails: async () => {
    try {
      set({ isLoading: true });
      const res = await baseAxios.get("/settings/profile", {
        withCredentials: true,
      });
      set({ profile: res.data.data.user });
      return res.data.data.user;
    } catch (error) {
      axiosError(error);
      console.log("Failed to get user details:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserDetail: async ({
    firstName,
    lastName,
    phone,
    dateOfBirth,
    country,
  }: IProfile) => {
    try {
      set({ isUpdateLoading: true });
      const res = await baseAxios.patch(
        "/settings/profile",
        { firstName, lastName, phone, country, dateOfBirth },
        { withCredentials: true }
      );
      enqueueSnackbar(res.data.message, { variant: "success" });
      set({ profile: res.data.data.user });
    } catch (error) {
      axiosError(error);
      console.log("Failed to update user details:", error);
    } finally {
      set({ isUpdateLoading: false });
    }
  },

  updatePassword: async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      set({ isPasswordLoading: true });
      const res = await baseAxios.put(
        "/settings/password",
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      enqueueSnackbar("Password updated successfully", { variant: "success" });
    } catch (error) {
      axiosError(error);
      console.log("Failed to update password:", error);
    } finally {
      set({ isPasswordLoading: false });
    }
  },

  // Preferences methods
  updatePreferences: async (preferences: Partial<IPreferences>) => {
    try {
      set({ isPreferencesLoading: true });
      const res = await baseAxios.patch("/settings/preferences", preferences, {
        withCredentials: true,
      });
      enqueueSnackbar("Preferences updated successfully", {
        variant: "success",
      });
      set({ profile: res.data.data.user });
    } catch (error) {
      axiosError(error);
      console.log("Failed to update preferences:", error);
    } finally {
      set({ isPreferencesLoading: false });
    }
  },

  // Security methods
  getSecuritySettings: async () => {
    try {
      set({ isSecurityLoading: true });
      const res = await baseAxios.get("/settings/security", {
        withCredentials: true,
      });
      set({ securitySettings: res.data.data });
      console.log(res.data);
    } catch (error) {
      axiosError(error);
      console.log("Failed to get security settings:", error);
    } finally {
      set({ isSecurityLoading: false });
    }
  },

  toggleTwoFactor: async (enabled: boolean) => {
    try {
      set({ isTwoFactorLoading: true });
      const res = await baseAxios.patch(
        "/settings/two-factor",
        { enabled },
        { withCredentials: true }
      );
      enqueueSnackbar(res.data.message, { variant: "success" });

      // Update both profile and security settings
      const currentProfile = get().profile;
      const currentSecurity = get().securitySettings;

      set({
        profile: {
          ...currentProfile,
          preferences: {
            ...currentProfile.preferences,
            twoFactorEnabled: enabled,
          },
        },
        securitySettings: {
          ...currentSecurity,
          twoFactorEnabled: enabled,
        },
      });
    } catch (error) {
      axiosError(error);
      console.log("Failed to toggle two-factor authentication:", error);
    } finally {
      set({ isTwoFactorLoading: false });
    }
  },


}));

export default useSettingsStore;
