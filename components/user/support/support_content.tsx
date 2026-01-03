// components/SupportContent.tsx
import { useSupportStore } from "@/app/user/support/_support";
import { ArrowLeft } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { useTranslate } from "@/hooks/use_translate";

interface SupportContentProps {
  activeSection: "messages" | "compose";
  showTicketDetails: boolean;
  setShowTicketDetails: (show: boolean) => void;
  children: ReactNode;
}

export default function SupportContent({
  activeSection,
  showTicketDetails,
  setShowTicketDetails,
  children,
}: SupportContentProps) {
  const { fetchTickets, fetchTicketById } = useSupportStore();
  const { t } = useTranslate();

  useEffect(() => {
    fetchTickets();
  }, [showTicketDetails]);

  return (
    <div className="bg-accent-foreground rounded-lg p-4 md:p-6 border border-border">
      {showTicketDetails && (
        <button
          onClick={() => setShowTicketDetails(false)}
          className="mb-4 text-center font-semibold flex items-center gap-2"
        >
          <ArrowLeft /> {t.admin.support.backToList}
        </button>
      )}
      {children}
    </div>
  );
}
