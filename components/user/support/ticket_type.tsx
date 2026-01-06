import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "../../ui/button";
import { useSupportStore } from "@/app/user/support/_support";
import { Mail, Clock, CheckCircle, XCircle } from "lucide-react";
import { useTranslate } from "@/hooks/use_translate";

// Define the ticket status type
type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

type TicketTypeProps = {
  setActiveTabs: Dispatch<SetStateAction<"messages" | "compose">>;
};

const TicketType = ({ setActiveTabs }: TicketTypeProps) => {
  const { t } = useTranslate();
  const { activeTab, setActiveTab, tickets, fetchTickets, setShowTicketDetails } = useSupportStore();

  useEffect(() => {
    fetchTickets({ status: activeTab, page: 1, limit: 100 });
  }, [activeTab, fetchTickets]);

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
      label: t.admin.support.ticketStatus.open,
      icon: <Mail className="w-5 h-5" />,
      bgColor: "bg-blue-500",
      textColor: "text-white",
      badgeBg: "bg-white",
      badgeText: "text-blue-500",
    },
    in_progress: {
      label: t.admin.support.ticketStatus.inProgress,
      icon: <Clock className="w-5 h-5" />,
      bgColor: "bg-amber-500",
      textColor: "text-white",
      badgeBg: "bg-white",
      badgeText: "text-amber-500",
    },
    resolved: {
      label: t.admin.support.ticketStatus.resolved,
      icon: <CheckCircle className="w-5 h-5" />,
      bgColor: "bg-green-500",
      textColor: "text-white",
      badgeBg: "bg-white",
      badgeText: "text-green-500",
    },
    closed: {
      label: t.admin.support.ticketStatus.closed,
      icon: <XCircle className="w-5 h-5" />,
      bgColor: "bg-gray-500",
      textColor: "text-white",
      badgeBg: "bg-white",
      badgeText: "text-gray-500",
    },
  };

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
                setShowTicketDetails(false);
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
            
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TicketType;