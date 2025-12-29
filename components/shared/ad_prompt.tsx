// components/dashboard/DashboardAdPrompt.tsx
"use client";

import { cn } from "@/lib/utils";

const DashboardAdPrompt = () => {
  const adItems = [
    { color: "bg-red-500", text: "Card ID required" },
    // { color: "bg-yellow-500", text: "Active membership" },
    // { color: "bg-green-500", text: "Tier 2 upgrade" },
    // { color: "bg-purple-500", text: "Tier 3 upgrade" },
    // { color: "bg-amber-600", text: "Security levy" },
    // { color: "bg-orange-500", text: "Promotional bonus" },
    // { color: "bg-gray-500", text: "VIP upgrade" },
    // { color: "bg-orange-600", text: "Premium upgrade" },
  ];

  return (
    <div className="w-full rounded-lg h-full">
      <div className="grid grid-cols-1 gap-3 h-full overflow-x-auto">
        {adItems.map((item, index) => (
          <div
            key={index}
            className={`${item.color} h-full flex p-4 border rounded-lg shadow-sm items-center gap-2 whitespace-nowrap text-center`}
          >
            <span className="text-lg text-center font-bold mx-auto text-white">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAdPrompt;
