// app/settings/page.tsx
"use client";

import { useEffect, useState } from "react";
import useSettingsStore from "./_settings_store";
import useUserStore from "../user_store";
import { ProfileSettings } from "@/components/user/settings/profile_settings";
import { PreferencesSettings } from "@/components/user/settings/settings_prefrences";
import { SecuritySettings } from "@/components/user/settings/security_settings";
import { AccountManagement } from "@/components/user/settings/account_management";
import { SettingsTabs } from "@/components/user/settings/settings_tabs";
import { useTranslate } from "@/hooks/use_translate";

export default function SettingsPage() {
  const { getUserDetails } = useSettingsStore();
  const { authStatus } = useUserStore();
  const [activeTab, setActiveTab] = useState("profile");
  const { t } = useTranslate();

  useEffect(() => {
    if (authStatus === "authenticated") {
      getUserDetails();
    }
  }, [authStatus, getUserDetails]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "preferences":
        return <PreferencesSettings />;
      case "security":
        return <SecuritySettings />;
      case "account":
        return <AccountManagement />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="py-6 px-4 md:px-6">
      <div className="pt-6 bg-accent sticky top-0">
        <div className="md:mb-8 mb-5">
          <h1 className="text-3xl font-bold">{t.admin.settings.title}</h1>
          <p className="text-muted-foreground">{t.admin.settings.subtitle}</p>
        </div>

        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="py-6">
        <div className="">{renderTabContent()}</div>
      </div>
    </div>
  );
}
