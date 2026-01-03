// components/TicketDetails.tsx
import { useState } from "react";
import { useSupportStore } from "@/app/user/support/_support";
import { getPriorityColor, getStatusColor } from "@/utility/ticket_helpers";
import TicketReplies from "./ticket_reply";
import TicketActions from "./ticket_action";
import { useTranslate } from "@/hooks/use_translate";

interface TicketDetailsProps {
  setShowTicketDetails: (show: boolean) => void;
}

export default function TicketDetails({
  setShowTicketDetails,
}: TicketDetailsProps) {
  const { currentTicket } = useSupportStore();
  const [showReopenForm, setShowReopenForm] = useState(false);
  const { t } = useTranslate();

  // Helper function to translate priority
  const translatePriority = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "low":
        return t.admin.support.ticketPriority.low;
      case "medium":
        return t.admin.support.ticketPriority.medium;
      case "high":
        return t.admin.support.ticketPriority.high;
      case "urgent":
        return t.admin.support.ticketPriority.urgent;
      default:
        return priority;
    }
  };

  // Helper function to translate status
  const translateStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return t.admin.support.ticketStatus.open;
      case "in_progress":
        return t.admin.support.ticketStatus.inProgress;
      case "resolved":
        return t.admin.support.ticketStatus.resolved;
      case "closed":
        return t.admin.support.ticketStatus.closed;
      default:
        return status.replace("_", " ");
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground mb-2">
            {currentTicket?.subject}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t.admin.support.ticketId}: #{currentTicket?._id}
          </p>
        </div>
        <div className="flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getPriorityColor(
              currentTicket?.priority || ""
            )}`}
          >
            {translatePriority(currentTicket?.priority || "")}{" "}
            {t.admin.support.priority}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(
              currentTicket?.status || ""
            )}`}
          >
            {translateStatus(currentTicket?.status || "")}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground mb-2">
          {t.admin.support.description}
        </p>
        <p className="text-card-foreground">{currentTicket?.description}</p>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground mb-2">{t.admin.support.subject}</p>
        <p className="text-card-foreground">{currentTicket?.subject}</p>
      </div>

      <TicketReplies />

      <TicketActions
        showReopenForm={showReopenForm}
        setShowReopenForm={setShowReopenForm}
      />
    </div>
  );
}
