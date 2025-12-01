"use client";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

const updateProgress = () => {
  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  // Prevent division by zero on short pages
  if (totalHeight <= 0) {
    setScrollProgress(0);
    return;
  }

  const progress = (window.pageYOffset / totalHeight) * 100;

  // Ensure progress stays 0–100
  setScrollProgress(Math.min(Math.max(progress, 0), 100));
};


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("scroll", updateProgress);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full shadow-2xl transition-all duration-500 ease-in-out transform",
        "bg-[#0A8A9F] hover:bg-[#0A8A9F]/90 text-white border border-[#0A8A9F]/20",
        "hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0A8A9F] focus:ring-offset-2 focus:ring-offset-gray-900",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      {/* Progress Circle */}
      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          className="text-white/20"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="283"
          strokeDashoffset={283 - (283 * scrollProgress) / 100}
          className="text-white transition-all duration-300"
        />
      </svg>
      
      {/* Chevron Icon */}
      <ChevronUp className="w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </button>
  );
};

export default BackToTop;