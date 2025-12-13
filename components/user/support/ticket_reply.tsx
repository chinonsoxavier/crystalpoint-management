// components/TicketReplies.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSupportStore } from "@/app/user/support/_support";
import formatTimeAgo from "@/utility/format_time";

export default function TicketReplies() {
  const { replies, currentTicket, replyToCurrentTicket, isReplying } =
    useSupportStore();
  const [replyMessage, setReplyMessage] = useState("");

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    await replyToCurrentTicket(replyMessage);
    setReplyMessage("");
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        Replies ({replies.length})
      </h3>

      <div className="space-y-3 mb-4">
        {replies.map((reply, index) => (
          <div
            key={index}
            className="bg-accent rounded-lg p-4 border border-border"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-muted-foreground">
                {formatTimeAgo(reply?.createdAt ?? "")}
              </p>
            </div>
            <p className="text-card-foreground">{reply.message}</p>
          </div>
        ))}
      </div>

      {currentTicket?.status === "open" && (
        <form onSubmit={handleReply}>
          <h3 className="text-lg font-semibold mb-3">Reply to this ticket</h3>
          <div className="space-y-3">
            <textarea
              placeholder="Type your reply..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-accent border-input w-full min-w-0 rounded-md border bg-accent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full border bg-accent border-border rounded-lg px-4 p-3 resize-none min-h-[100px]"
              )}
            />

            <Button
              type="submit"
              className="flex text-white items-center gap-2"
              disabled={isReplying || !replyMessage.trim()}
            >
              {isReplying ? (
                <div className="center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  SENDING...
                </div>
              ) : (
                <div className="center gap-2">SEND REPLY</div>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
