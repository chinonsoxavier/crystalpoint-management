// components/settings/SecuritySettings.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/utility/format_date";
import { Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import useSettingsStore from "@/app/user/settings/_settings_store";
import { useTranslate } from "@/hooks/use_translate";

export function SecuritySettings() {
  const {
    securitySettings,
    getSecuritySettings,
    toggleTwoFactor,
    isSecurityLoading,
    isTwoFactorLoading,
  } = useSettingsStore();

  const { t } = useTranslate();

  useEffect(() => {
    getSecuritySettings();
    console.log(securitySettings);
  }, []);

  const handleToggleTwoFactor = (enabled: boolean) => {
    toggleTwoFactor(enabled);
  };

  return (
    <div className="space-y-6">
      {isSecurityLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t.admin.settings.security.twoFactorAuthentication}
              </CardTitle>
              <CardDescription>
                {t.admin.settings.security.twoFactorAuthenticationDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="twoFactor">
                      {t.admin.settings.security.twoFactorAuthentication}
                    </Label>
                    <Badge
                      variant={
                        securitySettings.twoFactorEnabled
                          ? "default"
                          : "secondary"
                      }
                    >
                      {securitySettings.twoFactorEnabled
                        ? t.admin.settings.security.enabled
                        : t.admin.settings.security.disabled}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {securitySettings.twoFactorEnabled
                      ? t.admin.settings.security.twoFactorEnabledDesc
                      : t.admin.settings.security.twoFactorDisabledDesc}
                  </p>
                </div>
                <Switch
                  id="twoFactor"
                  checked={securitySettings.twoFactorEnabled}
                  onCheckedChange={handleToggleTwoFactor}
                  disabled={isTwoFactorLoading}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
