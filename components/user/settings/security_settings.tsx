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

export function SecuritySettings() {
  const {
    securitySettings,
    getSecuritySettings,
    toggleTwoFactor,
    isSecurityLoading,
    isTwoFactorLoading,
  } = useSettingsStore();

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
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <Badge
                      variant={
                        securitySettings.twoFactorEnabled
                          ? "default"
                          : "secondary"
                      }
                    >
                      {securitySettings.twoFactorEnabled
                        ? "Enabled"
                        : "Disabled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {securitySettings.twoFactorEnabled
                      ? "Your account is protected with 2FA"
                      : "Enable 2FA to add an extra layer of security"}
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
