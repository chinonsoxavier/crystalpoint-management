import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "../../ui/button";
import { useSupportStore } from "@/app/user/support/_support";
import { Mail, Clock, CheckCircle, XCircle } from "lucide-react";

// Define the ticket status type
type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

type TicketTypeProps = {
  setActiveTabs: Dispatch<SetStateAction<"messages" | "compose">>;
};

// Define the status configuration with icons and labels
const statusConfig: Record<
  TicketStatus,
  {
    label: string;
    icon: React.ReactNode;
    bgColor: string;
    textColor: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  open: {
    label: "Open",
    icon: <Mail className="w-5 h-5" />,
    bgColor: "bg-blue-500",
    textColor: "text-white",
    badgeBg: "bg-white",
    badgeText: "text-blue-500",
  },
  in_progress: {
    label: "In Progress",
    icon: <Clock className="w-5 h-5" />,
    bgColor: "bg-amber-500",
    textColor: "text-white",
    badgeBg: "bg-white",
    badgeText: "text-amber-500",
  },
  resolved: {
    label: "Resolved",
    icon: <CheckCircle className="w-5 h-5" />,
    bgColor: "bg-green-500",
    textColor: "text-white",
    badgeBg: "bg-white",
    badgeText: "text-green-500",
  },
  closed: {
    label: "Closed",
    icon: <XCircle className="w-5 h-5" />,
    bgColor: "bg-gray-500",
    textColor: "text-white",
    badgeBg: "bg-white",
    badgeText: "text-gray-500",
  },
};

const TicketType = ({ setActiveTabs }: TicketTypeProps) => {
  const { activeTab, setActiveTab, tickets, fetchTickets } = useSupportStore();

  useEffect(() => {
    fetchTickets({ status: activeTab, page: 1, limit: 100 });
  }, [activeTab, fetchTickets]);

  // Get ticket count for each status
  const getTicketCount = (status: TicketStatus) => {
    return tickets.filter((ticket) => ticket.status === status).length;
  };

  return (
    <div className="lg:col-span-1 space-y-4">
      <div className="space-y-2">
        {Object.entries(statusConfig).map(([status, config]) => {
          const isActive = activeTab === status;
          const count = getTicketCount(status as TicketStatus);

          return (
            <Button
              key={status}
              onClick={() => {
                setActiveTab(status as TicketStatus);
                setActiveTabs("messages");
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? `${config.bgColor} ${config.textColor} shadow-md`
                  : "bg-card/40 text-card-foreground hover:bg-accent hover:border"
              }`}
              aria-label={`Show ${config.label} tickets (${count})`}
            >
              <div className="flex items-center gap-3">
                {config.icon}
                <span className="font-medium">{config.label}</span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? `${config.badgeBg} ${config.badgeText}`
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {count}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TicketType;
