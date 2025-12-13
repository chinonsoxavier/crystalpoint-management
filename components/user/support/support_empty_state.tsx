// components/SupportEmptyState.tsx
import { ArchiveX } from "lucide-react";

interface SupportEmptyStateProps {
  activeTab: string;
}

export default function SupportEmptyState({
  activeTab,
}: SupportEmptyStateProps) {
  const getEmptyStateMessage = () => {
    switch (activeTab) {
      case "in_progress":
        return "ticket in progress";
      case "open":
        return "open tickets";
      case "resolved":
        return "resolved tickets";
      case "closed":
        return "closed tickets";
      default:
        return "tickets";
    }
  };

  return (
    <div className="center-col md:text-lg h-full py-10 space-y-3">
      <p className="">You do not have any {getEmptyStateMessage()}.</p>
      <ArchiveX className="bg-[r]" />
    </div>
  );
}
