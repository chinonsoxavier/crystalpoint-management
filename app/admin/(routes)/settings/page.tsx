"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { enqueueSnackbar } from "notistack";
import useAdminStore from "../../_admin_store";
import useAdminSettingsStore from "./admin_settings_store";

export default function SettingsPage() {
  const {
    updatePassword,
    isLoading,
    profile,
    getAdminDetails,
    updateAdminDetail,
    isUpdateLoading,
  } = useAdminSettingsStore();
  const { authStatus,admin,updateAdminEmail,updateAdminUsername ,loadUser} = useAdminStore();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [accountData, setAccountData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
  loadUser();
  }, [])
  

  useEffect(() => {
    if (admin) {
      const loadUserData = async () => {
        if (authStatus === "authenticated") {
          // setIsProfileLoading(true);
          try {
            await getAdminDetails();
          } catch (error) {
            console.error("Failed to load admin details:", error);
          } finally {
            // setIsProfileLoading(false);
          }
        }
      };
      loadUserData();
      console.log(admin);
    }
  }, [authStatus, getAdminDetails, admin]);
  useEffect(() => {
    // if (admin && admin.admin) {
      console.log(admin);
      setAccountData({
        email: admin?.email || "",
        username: admin?.username || "",
      });
    // }
  }, [admin]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      enqueueSnackbar("New password and confirm password do not match!", {
        variant: "error",
      });
      return;
    }
    updatePassword(
      passwordData.currentPassword,
      passwordData.newPassword,
      passwordData.confirmPassword
    );
  };

  const handleAccountUpdate = async () => {
    try {
      const { username, email } = admin;

      await updateAdminDetail({
        username,
        email,
      });
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <div className="flex bg-accent p-4 md:p-6">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <div className="flex flex-wrap gap-4 md:gap-6">
            {/* Left Column - Change Password */}
            <div className="flex-2 min-w-[280px]">
              <div className="bg-accent-foreground h-full flex-col flex items-start justify-start rounded-lg p-4 md:p-6">
                <h3 className="text-foreground font-semibold text-lg mb-6">
                  Change Password
                </h3>

                <form
                  onSubmit={handlePasswordUpdate}
                  className="space-y-4 flex-col flex h-min w-full"
                >
                  <div>
                    <Label className="block text-foreground text-base font-medium mb-2">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        required
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-foreground text-base font-medium mb-2">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        required
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-foreground text-base font-medium mb-2">
                      Retype Password
                    </Label>
                    <div className="relative">
                      <Input
                        required
                        type={showRetypePassword ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowRetypePassword(!showRetypePassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showRetypePassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full mt-6"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        CHANGING...
                      </>
                    ) : (
                      "CHANGE"
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Column - Account Setup */}
            <div className="md:min-w-[560px] flex-5">
              <div className="bg-accent-foreground rounded-lg p-4 md:p-6 lg:p-8">
                <h3 className="text-foreground font-semibold text-xl mb-8 border-b border-border pb-4">
                  Account Setup
                </h3>

                <div className="space-y-6">
                  {/* First Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="block text-foreground text-sm font-medium mb-2">
                        Username
                      </Label>
                      <Input
                        type="text"
                        name="user"
                        value={accountData.username}
                        onChange={(e) =>
                          setAccountData((prev) => ({
                            ...prev,
                            username: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label className="block text-foreground text-sm font-medium mb-2">
                        Email
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        value={accountData.email}
                        onChange={(e) =>
                          setAccountData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAccountUpdate}
                  className="w-full max-w-xs mt-8"
                  disabled={isUpdateLoading}
                >
                  {isUpdateLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      UPDATING...
                    </>
                  ) : (
                    "UPDATE"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
