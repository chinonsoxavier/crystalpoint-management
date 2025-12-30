// components/ui/table-of-contents.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const headings = items.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 100;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading.element && heading.element.offsetTop <= scrollPosition) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("sticky top-20 space-y-2", className)}>
      <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-3">
        On this page
      </h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-left text-sm w-full py-1 px-2 rounded transition-colors",
                activeId === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-600 hover:text-gray-900"
              )}
              style={{
                paddingLeft: item.level
                  ? `${(item.level + 1) * 0.5}rem`
                  : "0.5rem",
              }}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
