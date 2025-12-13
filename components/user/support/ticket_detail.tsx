// components/TicketDetails.tsx
import { useState } from "react";
import { useSupportStore } from "@/app/user/support/_support";
import { getPriorityColor, getStatusColor } from "@/utility/ticket_helpers";
import TicketReplies from "./ticket_reply";
import TicketActions from "./ticket_action";

interface TicketDetailsProps {
  setShowTicketDetails: (show: boolean) => void;
}

export default function TicketDetails({ setShowTicketDetails }: TicketDetailsProps) {
  const { currentTicket } = useSupportStore();
  const [showReopenForm, setShowReopenForm] = useState(false);

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground mb-2">
            {currentTicket?.subject}
          </h2>
          <p className="text-sm text-muted-foreground">
            Ticket ID: #{currentTicket?._id}
          </p>
        </div>
        <div className="flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getPriorityColor(
              currentTicket?.priority || ""
            )}`}
          >
            {currentTicket?.priority} Priority
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(
              currentTicket?.status || ""
            )}`}
          >
            {currentTicket?.status?.replace("_", " ")}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground mb-2">Description</p>
        <p className="text-card-foreground">{currentTicket?.description}</p>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground mb-2">Subject</p>
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