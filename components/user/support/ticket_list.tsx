// components/TicketList.tsx
import { useSupportStore } from "@/app/user/support/_support";
import formatTimeAgo from "@/utility/format_time";
import { getPriorityColor, getStatusColor } from "@/utility/ticket_helpers";

export default function TicketList() {
  const { tickets, handleTicketClick } = useSupportStore();

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
              {ticket.status.replace("_", " ")}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${getPriorityColor(
                ticket.priority
              )}`}
            >
              {ticket.priority}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            subject: {ticket.subject}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {ticket.description}
          </p>
        </button>
      ))}
    </div>
  );
}
