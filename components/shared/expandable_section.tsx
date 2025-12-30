// components/ui/expandable-section.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export function ExpandableSection({
  id,
  title,
  children,
  defaultExpanded = false,
  className,
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={cn(
        "border border-gray-200 rounded-lg overflow-hidden",
        className
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 bg-gray-50 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
        aria-expanded={isExpanded}
        aria-controls={`section-content-${id}`}
      >
        <h2 className="text-xl font-semibold text-primary-foreground">
          {title}
        </h2>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-500 transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      <div
        id={`section-content-${id}`}
        className={cn(
          "px-6 overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "py-4 max-h-screen" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}
