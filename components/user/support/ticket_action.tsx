// components/TicketActions.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSupportStore } from "@/app/user/support/_support";

interface TicketActionsProps {
  showReopenForm: boolean;
  setShowReopenForm: (show: boolean) => void;
}

export default function TicketActions({
  showReopenForm,
  setShowReopenForm,
}: TicketActionsProps) {
  const {
    currentTicket,
    closeCurrentTicket,
    reopenCurrentTicket,
    isUpdatingTicket,
  } = useSupportStore();
  const [reopenReason, setReopenReason] = useState("");

  const handleCloseTicket = async () => {
    await closeCurrentTicket();
  };

  const handleReopenTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    await reopenCurrentTicket(reopenReason);
    setShowReopenForm(false);
    setReopenReason("");
  };

  return (
    <div className="flex gap-3">
      {currentTicket?.status === "open" && (
        <Button
          onClick={handleCloseTicket}
          className="bg-orange-500 hover:bg-orange-600 text-white"
          disabled={isUpdatingTicket}
        >
          {isUpdatingTicket ? (
            <div className="center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              PROCESSING...
            </div>
          ) : (
            "Close Ticket"
          )}
        </Button>
      )}

      {currentTicket?.status !== "open" && !showReopenForm && (
        <Button
          onClick={() => setShowReopenForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reopen Ticket
        </Button>
      )}

      {showReopenForm && (
        <form onSubmit={handleReopenTicket} className="w-full">
          <div className="space-y-3">
            <textarea
              placeholder="Reason for reopening..."
              value={reopenReason}
              onChange={(e) => setReopenReason(e.target.value)}
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-accent border-input w-full min-w-0 rounded-md border bg-accent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full border bg-accent border-border rounded-lg px-4 p-3 resize-none min-h-[100px]"
              )}
            />
            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                disabled={isUpdatingTicket || !reopenReason.trim()}
              >
                {isUpdatingTicket ? (
                  <div className="center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    PROCESSING...
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowReopenForm(false);
                  setReopenReason("");
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
