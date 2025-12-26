// components/settings/SettingsTabs.tsx
"use client";

import { cn } from "@/lib/utils";
import {
  User,
  Bell,
  Shield,
  Settings as SettingsIcon,
  Trash2,
} from "lucide-react";

interface SettingsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "preferences", label: "Preferences", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "account", label: "Account", icon: SettingsIcon },
];

export function SettingsTabs({ activeTab, setActiveTab }: SettingsTabsProps) {
  return (
    <>
      {/* Desktop & Tablet: Horizontal Tabs */}
      <div className="hidden sm:flex border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 -mb-px",
                isActive
                  ? "text-primary border-primary bg-primary/5"
                  : "text-muted-foreground border-transparent hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile: Bottom Navigation Bar */}
      <div className="inset-x-0  z-50 flex sm:hidden bg-background border-t border-border shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-6 w-6 mb-1 transition-transform",
                  isActive && "scale-110"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive && "font-semibold"
                )}
              >
                {tab.label}
              </span>
              {/* Active Indicator Dot */}
              {isActive && (
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="h-20 sm:hidden" />
    </>
  );
}
