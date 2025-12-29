// components/dashboard/DashboardAdPrompt.tsx
"use client";

import { cn } from "@/lib/utils";

const DashboardAdPrompt = () => {
  const adItems = [
    { color: "bg-red-500", text: "Card ID required" },
    { color: "bg-yellow-500", text: "Active membership" },
    { color: "bg-green-500", text: "Tier 2 upgrade" },
    { color: "bg-purple-500", text: "Tier 3 upgrade" },
    { color: "bg-amber-600", text: "Security levy" },
    { color: "bg-orange-500", text: "Promotional bonus" },
    { color: "bg-gray-500", text: "VIP upgrade" },
    { color: "bg-orange-600", text: "Premium upgrade" },
  ];

  return (
    <div className="w-full bg-amber-200 p-4 border border-amber-200 rounded-lg shadow-sm ">
      <div className="grid grid-cols-3 gap-3 overflow-x-auto">
        {adItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <div className={cn("w-2 h-2 rounded-full", item.color)} />
            <span className="text-xs text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAdPrompt;
