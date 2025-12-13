// components/CreateTicketForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSupportStore } from "@/app/user/support/_support";

export default function CreateTicketForm() {
  const { createNewTicket, isCreatingTicket } = useSupportStore();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createNewTicket({
      subject: subject,
      description: message,
      priority: "low",
    });
    if (success) {
      setSubject("");
      setMessage("");
      // This would need to be passed down from the parent
      // setActiveSection("messages");
    }
  };

  const handleDiscard = () => {
    setSubject("");
    setMessage("");
    // This would need to be passed down from the parent
    // setActiveSection("messages");
  };

  return (
    <form onSubmit={handleSend} className="space-y-4">
      <h2 className="text-xl font-bold text-black dark:text-white mb-4">
        Create New Support Ticket
      </h2>

      <Input
        required
        type="text"
        placeholder="Subject:"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-accent border-input w-full h-10 min-w-0 rounded-md border bg-accent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        )}
      />

      <textarea
        placeholder="Enter text ..."
        value={message}
        required
        onChange={(e) => setMessage(e.target.value)}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-accent border-input w-full min-w-0 rounded-md border bg-accent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full border bg-accent border-border rounded-lg px-4 p-3 resize-none min-h-[150px]"
        )}
      />

      <div className="flex gap-3">
        <Button
          type="submit"
          className="flex text-white md:min-w-[150px] min-w-[120px] max-w-xs flex-1 items-center gap-2"
          disabled={isCreatingTicket}
        >
          {isCreatingTicket ? (
            <div className="center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              SENDING...
            </div>
          ) : (
            <div className="center gap-2">SEND</div>
          )}
        </Button>

        <Button
          onClick={handleDiscard}
          className="bg-destructive flex-1 hover:bg-destructive/90 min-w-[100px] text-white md:min-w-[150px] max-w-xs flex items-center gap-2"
        >
          Discard
        </Button>
      </div>
    </form>
  );
}
