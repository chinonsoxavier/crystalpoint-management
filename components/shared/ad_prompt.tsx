"use client";

import useUserStore from "@/app/user/user_store";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Star,
  Shield,
  Gift,
  Crown,
  Gem,
} from "lucide-react";
import { useTranslate } from "@/hooks/use_translate";
import { LucideIcon } from "lucide-react";

// Define the shape of ad prompts from backend
interface AdPrompts {
  membership_card_id?: boolean;
  activate_membership?: boolean;
  tier2_upgrade?: boolean;
  tier3_upgrade?: boolean;
  security_levy?: boolean;
  promotional_bonus?: boolean;
  vip_upgrade?: boolean;
  premium_upgrade?: boolean;
}

// Extend your user type if needed, or use this minimal one
interface User {
  adPrompts?: AdPrompts;
  // ... other user fields
}

const DashboardAdPrompt = () => {
  const { user } = useUserStore() as { user: User | null };
  const { t } = useTranslate();

  // Configuration for each ad prompt
  const adPromptConfig = [
    {
      key: "membership_card_id" as const,
      color: "bg-red-500",
      textKey: t.admin.dashboard.adPrompts.membershipCardId,
      priority: 1,
    },
    {
      key: "activate_membership" as const,
      color: "bg-yellow-500",
      textKey: t.admin.dashboard.adPrompts.activateMembership,
      priority: 2,
    },
    {
      key: "tier2_upgrade" as const,
      color: "bg-green-500",
      textKey: t.admin.dashboard.adPrompts.tier2Upgrade,
      priority: 3,
    },
    {
      key: "tier3_upgrade" as const,
      color: "bg-purple-500",
      textKey: t.admin.dashboard.adPrompts.tier3Upgrade,
      priority: 4,
    },
    {
      key: "security_levy" as const,
      color: "bg-amber-600",
      textKey: t.admin.dashboard.adPrompts.securityLevy,
      icon: Shield,
      priority: 5,
    },
    {
      key: "promotional_bonus" as const,
      color: "bg-orange-500",
      textKey: t.admin.dashboard.adPrompts.promotionalBonus,
      icon: Gift,
      priority: 6,
    },
    {
      key: "vip_upgrade" as const,
      color: "bg-gray-500",
      textKey: t.admin.dashboard.adPrompts.vipUpgrade,
      icon: Crown,
      priority: 7,
    },
    {
      key: "premium_upgrade" as const,
      color: "bg-orange-600",
      textKey: t.admin.dashboard.adPrompts.premiumUpgrade,
      icon: Gem,
      priority: 8,
    },
  ] as const;

  // Safely get nested translation value
  const getTranslation = (path: string): string => {
    const value = path
      .split(".")
      .reduce<unknown>(
        (obj, key) => (obj as Record<string, unknown>)?.[key],
        t
      );
    return typeof value === "string" ? value : path; // fallback if missing
  };

  // Filter active prompts and sort by priority (highest first)
  const activeAdPrompts = adPromptConfig
    .filter((item) => user?.adPrompts?.[item.key] === true)
    .sort((a, b) => b.priority - a.priority); // Higher priority = show first

  if (activeAdPrompts.length === 0) {
    return null; // or return a placeholder if you prefer
  }

  return (
    <div className="w-full h-full rounded-lg">
      <div className="grid h-full grid-cols-1 gap-3 overflow-x-auto">
        {activeAdPrompts.map((item) => {
          const text = getTranslation(item.textKey);

          return (
            <div
              key={item.key}
              className={`${item.color} flex items-center h-full gap-4 rounded-lg p-4 shadow-sm transition-all hover:shadow-md`}
            >
              <span className="text-base md:text-lg font-bold text-white text-center flex-1">
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardAdPrompt;