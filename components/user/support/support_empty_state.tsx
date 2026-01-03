// components/SupportEmptyState.tsx
import { ArchiveX } from "lucide-react";
import { useTranslate } from "@/hooks/use_translate";

interface SupportEmptyStateProps {
  activeTab: string;
}

export default function SupportEmptyState({
  activeTab,
}: SupportEmptyStateProps) {
  const { t } = useTranslate();

  const getEmptyStateMessage = () => {
    switch (activeTab) {
      case "in_progress":
        return t.admin.support.noTickets.inProgress;
      case "open":
        return t.admin.support.noTickets.open;
      case "resolved":
        return t.admin.support.noTickets.resolved;
      case "closed":
        return t.admin.support.noTickets.closed;
      default:
        return t.admin.support.noTickets.default;
    }
  };

  return (
    <div className="center-col text-center md:text-lg h-full py-10 space-y-3">
      <p className="">You do not have any {getEmptyStateMessage()}.</p>
      <ArchiveX className="bg-[r]" />
    </div>
  );
}
