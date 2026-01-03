// components/settings/ProfileSettings.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import useSettingsStore from "@/app/user/settings/_settings_store";
import { countries } from "@/components/shared/data/countrie";
import { useTranslate } from "@/hooks/use_translate";

export function ProfileSettings() {
  const {
    profile,
    updateUserDetail,
    updatePassword,
    isUpdateLoading,
    isPasswordLoading,
  } = useSettingsStore();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const { t } = useTranslate();

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [accountData, setAccountData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (profile && profile.profile) {
      setAccountData({
        firstName: profile.profile.firstName || "",
        lastName: profile.profile.lastName || "",
        phone: profile.profile.phone || "",
        country: profile.profile.country || "",
        dateOfBirth: profile.profile.dateOfBirth || "",
      });
    }
  }, [profile]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // Handle password mismatch error
      return;
    }
    updatePassword(
      passwordData.currentPassword,
      passwordData.newPassword,
      passwordData.confirmPassword
    );
  };

  const handleAccountUpdate = () => {
    updateUserDetail(accountData);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Account Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {t.admin.settings.profile.accountInformation}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                {t.admin.settings.profile.firstName}
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={accountData.firstName}
                onChange={handleAccountChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                {t.admin.settings.profile.lastName}
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={accountData.lastName}
                onChange={handleAccountChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t.admin.settings.profile.phone}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={accountData.phone}
              onChange={handleAccountChange}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">
                {t.admin.settings.profile.country}
              </Label>
              <select
                id="country"
                name="country"
                value={accountData.country}
                onChange={handleAccountChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="">
                  {t.admin.settings.profile.selectCountry}
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">
                {t.admin.settings.profile.dateOfBirth}
              </Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={accountData.dateOfBirth}
                onChange={handleAccountChange}
              />
            </div>
          </div>

          <Button
            onClick={handleAccountUpdate}
            disabled={isUpdateLoading}
            className="w-full md:w-auto"
          >
            {isUpdateLoading
              ? t.admin.settings.profile.updating
              : t.admin.settings.profile.updateProfile}
          </Button>
        </div>

        {/* Password Change */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {t.admin.settings.profile.changePassword}
          </h3>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">
                {t.admin.settings.profile.currentPassword}
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder={t.admin.settings.profile.enterCurrentPassword}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">
                {t.admin.settings.profile.newPassword}
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder={t.admin.settings.profile.enterNewPassword}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t.admin.settings.profile.confirmPassword}
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showRetypePassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder={t.admin.settings.profile.confirmNewPassword}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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
              type="submit"
              disabled={isPasswordLoading}
              className="w-full"
            >
              {isPasswordLoading
                ? t.admin.settings.profile.updating
                : t.admin.settings.profile.updatePassword}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
