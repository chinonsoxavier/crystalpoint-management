// components/dashboard/DashboardAdPrompt.tsx
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

const DashboardAdPrompt = () => {
  const { user } = useUserStore();

  // Map the ad prompts to their corresponding display information
  const adPromptMap = [
    {
      key: "membership_card_id",
      color: "bg-red-500",
      text: "Card ID required",
      icon: AlertCircle,
      priority: 1, // Higher number = higher priority
    },
    {
      key: "activate_membership",
      color: "bg-yellow-500",
      text: "Active membership",
      icon: CheckCircle,
      priority: 2,
    },
    {
      key: "tier2_upgrade",
      color: "bg-green-500",
      text: "Tier 2 upgrade",
      icon: Star,
      priority: 3,
    },
    {
      key: "tier3_upgrade",
      color: "bg-purple-500",
      text: "Tier 3 upgrade",
      icon: Gem,
      priority: 4,
    },
    {
      key: "security_levy",
      color: "bg-amber-600",
      text: "Security levy",
      icon: Shield,
      priority: 5,
    },
    {
      key: "promotional_bonus",
      color: "bg-orange-500",
      text: "Promotional bonus",
      icon: Gift,
      priority: 6,
    },
    {
      key: "vip_upgrade",
      color: "bg-gray-500",
      text: "VIP upgrade",
      icon: Crown,
      priority: 7,
    },
    {
      key: "premium_upgrade",
      color: "bg-orange-600",
      text: "Premium upgrade",
      icon: Gem,
      priority: 8,
    },
  ];

  // Filter and sort the ad prompts based on user's adPrompts
  const activeAdPrompts = adPromptMap
    .filter(
      (item) =>
        user?.adPrompts?.[item.key as keyof typeof user.adPrompts] === true
    )
    .sort((a, b) => a.priority - b.priority);



  return (
    <div className="w-full rounded-lg h-full">
      <div className="grid grid-cols-1 gap-3 h-full overflow-x-auto">
        {activeAdPrompts.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className={`${item.color} h-full flex p-4 border rounded-lg shadow-sm items-center gap-3 whitespace-nowrap text-center transition-all hover:shadow-md`}
            >
              <Icon className="h-5 w-5 text-white flex-shrink-0" />
              <span className="text-lg text-center font-bold text-white">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardAdPrompt;
