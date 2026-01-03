// components/TicketList.tsx
import { useSupportStore } from "@/app/user/support/_support";
import formatTimeAgo from "@/utility/format_time";
import { getPriorityColor, getStatusColor } from "@/utility/ticket_helpers";
import { useTranslate } from "@/hooks/use_translate";

export default function TicketList() {
  const { tickets, handleTicketClick } = useSupportStore();
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
    <div className="space-y-3 h-full rounded-md">
      {tickets.map((ticket, index) => (
        <button
          key={index}
          onClick={() => handleTicketClick(ticket._id)}
          className="w-full bg-accent-foreground border border-border rounded-lg p-4 hover:border-accent transition text-left"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className={`font-semibold text-accent-foreground`}>
              {ticket.subject}
            </h3>
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(ticket.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(
                ticket.status
              )}`}
            >
              {translateStatus(ticket.status)}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${getPriorityColor(
                ticket.priority
              )}`}
            >
              {translatePriority(ticket.priority)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {t.admin.support.subject}: {ticket.subject}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {ticket.description}
          </p>
        </button>
      ))}
    </div>
  );
}
