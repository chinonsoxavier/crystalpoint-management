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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useSettingsStore from "./_settings_store";
import { enqueueSnackbar } from "notistack";

export default function SettingsPage() {
  const {updatePassword,isLoading} = useSettingsStore();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  //   const [sidebarOpen, setSidebarOpen] = useState(true);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Account setup state
  const [accountData, setAccountData] = useState({
    fullName: "user test crystalpoint",
    username: "usertestcp",
    email: "usertest@gmail.com",
    gender: "Please select",
    dob: "",
    phone: "08098787644",
    country: "Nigeria",
    address: "",
    walletType: "-- Select Wallet --",
  });

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
    updatePassword(passwordData.currentPassword,passwordData.newPassword, passwordData.confirmPassword);
  };

  const handleAccountUpdate = () => {
    alert("Account information updated successfully!");
  };

  return (
    <div className="flex bg-accent p-4 md:p-6">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <div className="">
            <div className="grid lg:grid-cols-7 gap-6">
              {/* Left Column - Change Password */}
              <div className="lg:col-span-2">
                <div className="bg-accent-foreground my-auto h- flex-col flex items-start justify-center rounded-lg p-4 md:p-6">
                  <h3 className="dark:text-white text-left text-black font-semibold text-lg mb-6">
                    Change Password
                  </h3>

                  <form
                    onSubmit={handlePasswordUpdate}
                    className="space-y-4 flex-col flex h-min w-full"
                  >
                    <div>
                      <Label className="block text-black dark:text-white text-base font-medium mb-2">
                        Current Password
                      </Label>
                      <div className="relative">
                        <Input
                          required
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className=""
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
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
                      <Label className="block text-black dark:text-white text-base font-medium mb-2">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          required
                          type={showPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className=""
                          placeholder="Enter password"
                        />
                        <button
                          type="submit"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
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
                      <Label className="block text-black dark:text-white text-base font-medium mb-2">
                        Retype Password
                      </Label>
                      <div className="relative">
                        <Input
                          required
                          type={showRetypePassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className=""
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowRetypePassword(!showRetypePassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
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
                          UPDATING...
                        </>
                      ) : (
                        "UPDATE"
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Right Column - Account Setup */}
              <div className="lg:col-span-5">
                <div className="bg-accent-foreground rounded-lg p-4 md:p-6 lg:p-8">
                  <h3 className="dark:text-white text-black font-semibold text-xl mb-8 border-b border-slate-700 pb-4">
                    Account Setup
                  </h3>

                  <div className="space-y-6">
                    {/* First Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="block text-accent-text text-sm font-medium mb-2">
                          Full Name
                        </Label>
                        <Input
                          type="text"
                          name="fullName"
                          value={accountData.fullName}
                          onChange={handleAccountChange}
                          className=""
                        />
                      </div>
                      <div>
                        <Label className="block text-accent-text text-sm font-medium mb-2">
                          Username
                        </Label>
                        <Input
                          type="text"
                          name="username"
                          value={accountData.username}
                          onChange={handleAccountChange}
                          className=""
                        />
                      </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="block text-accent-text text-sm font-medium mb-2">
                          Email
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          value={accountData.email}
                          onChange={handleAccountChange}
                          className=""
                        />
                      </div>
                      <div>
                        <Label className="block text-accent-text text-sm font-medium mb-2">
                          Gender
                        </Label>
                        <Select required>
                          <SelectTrigger className="w-full text-accent-text">
                            <SelectValue placeholder="Select a wallet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select Gender</SelectLabel>
                              <SelectItem className="" value="male">
                                Male
                              </SelectItem>
                              <SelectItem className="" value="female">
                                Female
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Third Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="block text-accent-text text-sm font-medium mb-2">
                          DOB
                        </Label>
                        <Input
                          type="date"
                          name="dob"
                          value={accountData.dob}
                          onChange={handleAccountChange}
                          className=""
                        />
                      </div>
                      <div>
                        <Label className="block text-accent-text text-base font-medium mb-2">
                          Phone
                        </Label>
                        <Input
                          type="tel"
                          name="phone"
                          value={accountData.phone}
                          onChange={handleAccountChange}
                          className=""
                        />
                      </div>
                    </div>

                    {/* Fourth Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="block text-accent-text text-base font-medium mb-2">
                          Country
                        </Label>
                        <Input
                          type="text"
                          name="country"
                          value={accountData.country}
                          onChange={handleAccountChange}
                          className=""
                        />
                      </div>
                      <div>
                        <Label className="block text-accent-text text-base font-medium mb-2">
                          Address
                        </Label>
                        <textarea
                          name="address"
                          value={accountData.address}
                          onChange={handleAccountChange}
                          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]                         
        aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Wallet Type */}
                    <div>
                      <Label className="block text-accent-text text-base font-medium mb-2">
                        Select Wallet Type
                      </Label>
                      <Select required>
                        <SelectTrigger className="w-full text-accent-text">
                          <SelectValue placeholder="-- Select wallet --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Crypto Deposit</SelectLabel>
                            <SelectItem className="" value="Bitcoin">
                              Bitcoin
                            </SelectItem>
                            <SelectItem className="" value="USDT (TRC20)">
                              USDT (TRC20)
                            </SelectItem>
                            <SelectItem className="" value="USDT (ERC20)">
                              USDT (ERC20)
                            </SelectItem>
                            <SelectItem className="" value="BNB">
                              BNB
                            </SelectItem>
                            <SelectItem className="" value="Ethereum">
                              Ethereum
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleAccountUpdate}
                    className="w-full max-w-xs mt-8"
                  >
                    UPDATE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
