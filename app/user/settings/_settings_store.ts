"use client";
import { create } from "zustand";
import { baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";
import { isAxiosError } from "axios";


interface ISettingsStore {
    isLoading:boolean;
    updatePassword: (currentPassword:string,newPassword: string, comfirmPassword: string) => Promise<void>;
}

const useSettingsStore = create<ISettingsStore>((set) => ({
    isLoading:false,
    updatePassword: async (currentPassword:string,newPassword: string, comfirmPassword: string) => {
        set({isLoading:true})
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
            enqueueSnackbar('your password has been successfully updated!',{variant:'success'});
        } catch (error) {
           if (isAxiosError(error) && error.response) {
                  const msg =
                    error.response.data?.error || "password update failed";
                  enqueueSnackbar(msg, { variant: "error" });
                } else {
                  enqueueSnackbar("password update failed", {
                    variant: "error",
                  });
                }
            console.log("Error updating password:", error);
        }finally{
            set({isLoading:false})
        }
    },
}));
export default useSettingsStore;