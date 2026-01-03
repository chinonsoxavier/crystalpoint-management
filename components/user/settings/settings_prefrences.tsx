// components/settings/PreferencesSettings.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSettingsStore from "@/app/user/settings/_settings_store";
import { useTranslate } from "@/hooks/use_translate";

export function PreferencesSettings() {
  const { profile, updatePreferences, isPreferencesLoading } =
    useSettingsStore();

  const [preferences, setPreferences] = useState({
    emailNotifications: false,
    smsNotifications: false,
    twoFactorEnabled: false,
    language: "",
    currency: "",
  });

  const { t } = useTranslate();

  useEffect(() => {
    if (profile && profile.preferences) {
      setPreferences(profile.preferences);
    }
  }, [profile]);

  const handleToggle = (key: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelect = (key: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updatePreferences(preferences);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium mb-4">
          {t.admin.settings.preferences.notificationPreferences}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotifications">
                {t.admin.settings.preferences.emailNotifications}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t.admin.settings.preferences.emailNotificationsDesc}
              </p>
            </div>
            <Switch
              id="emailNotifications"
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) =>
                handleToggle("emailNotifications", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="smsNotifications">
                {t.admin.settings.preferences.smsNotifications}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t.admin.settings.preferences.smsNotificationsDesc}
              </p>
            </div>
            <Switch
              id="smsNotifications"
              checked={preferences.smsNotifications}
              onCheckedChange={(checked: boolean) =>
                handleToggle("smsNotifications", checked)
              }
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">
          {t.admin.settings.preferences.displayPreferences}
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">
              {t.admin.settings.preferences.language}
            </Label>
            <Select
              value={preferences.language}
              onValueChange={(value) => handleSelect("language", value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={t.admin.settings.preferences.selectLanguage}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">
              {t.admin.settings.preferences.currency}
            </Label>
            <Select
              value={preferences.currency}
              onValueChange={(value) => handleSelect("currency", value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={t.admin.settings.preferences.selectCurrency}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button onClick={handleSave} disabled={isPreferencesLoading}>
          {isPreferencesLoading
            ? t.admin.settings.preferences.saving
            : t.admin.settings.preferences.savePreferences}
        </Button>
      </div>
    </div>
  );
}
