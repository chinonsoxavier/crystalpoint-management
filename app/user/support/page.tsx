"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, X, ArrowLeft, ArchiveX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import TicketType from "@/components/user/support/ticket_type";
import { SupportStats } from "@/components/user/support/support_stats";
import { useSupportStore } from "./_support";
import formatTimeAgo from "@/utility/format_time";

interface Message {
  id: number;
  subject: string;
  sender: string;
  preview: string;
  timestamp: string;
  read: boolean;
}

interface Ticket {
  id: number;
  subject: string;
  status: "open" | "resolved";
  priority: "high" | "medium" | "low";
  createdAt: string;
  lastUpdated: string;
  description: string;
}

const mockMessages: Message[] = [
  {
    id: 1,
    subject: "Account Verification Complete",
    sender: "Support Team",
    preview: "Your account has been successfully verified...",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    subject: "Deposit Confirmation",
    sender: "Finance Team",
    preview: "Your deposit of $500 has been received...",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: 3,
    subject: "Investment Update",
    sender: "Investment Manager",
    preview: "Your Oil & Gas portfolio has generated...",
    timestamp: "3 days ago",
    read: true,
  },
];

const mockOpenTickets: Ticket[] = [
  {
    id: 1001,
    subject: "Unable to withdraw funds",
    status: "open",
    priority: "high",
    createdAt: "2025-11-25",
    lastUpdated: "2025-11-27",
    description:
      "I have been trying to withdraw my funds but the system keeps showing an error.",
  },
  {
    id: 1002,
    subject: "Investment plan details",
    status: "open",
    priority: "medium",
    createdAt: "2025-11-26",
    lastUpdated: "2025-11-27",
    description:
      "Could you provide more information about the Real Estate investment plan?",
  },
];

const mockResolvedTickets: Ticket[] = [
  {
    id: 1003,
    subject: "Password reset assistance",
    status: "resolved",
    priority: "medium",
    createdAt: "2025-11-20",
    lastUpdated: "2025-11-22",
    description: "Successfully reset password and regained account access.",
  },
  {
    id: 1004,
    subject: "Two-factor authentication setup",
    status: "resolved",
    priority: "low",
    createdAt: "2025-11-18",
    lastUpdated: "2025-11-19",
    description: "2FA has been successfully enabled on your account.",
  },
  {
    id: 1005,
    subject: "Referral bonus credit",
    status: "resolved",
    priority: "low",
    createdAt: "2025-11-15",
    lastUpdated: "2025-11-16",
    description: "Referral bonus of $50 has been credited to your account.",
  },
];

export default function Page() {
  const {
    tickets,
    fetchTicketById,
    currentTicket,
    activeTab,
    isCreatingTicket,
    createNewTicket,
    fetchTickets,
  } = useSupportStore();
  const [activeTabs, setActiveTab] = useState<"messages" | "compose">(
    "messages"
  );
  const [showCompose, setShowCompose] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showTicketDetails, setShowTicketDetails] = useState<boolean>(false);

  useEffect(() => {
    console.log(activeTab);
    fetchTickets({ status: activeTab, page: 1, limit: 100 });
  }, [activeTab]);

  const handleTicketClick = (id: string) => {
    setShowTicketDetails(true);
    fetchTicketById(id);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createNewTicket({
      subject: subject,
      description: message,
      priority: "low",
    });
    if (res) {
      setSubject("");
      setMessage("");
      setShowCompose(false);
    }
  };

  const handleDiscard = () => {
    setSubject("");
    setMessage("");
    setShowCompose(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "low":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="h-full space-y-6 p-4 md:p-6 bg-accent">
      <div>
        <h1 className="text-3xl font-bold">Support</h1>
        <p className="text-muted-foreground">
          An overview of your support system.
        </p>
      </div>
      <SupportStats />
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div>
              <Button
                onClick={() => setActiveTab("compose")}
                className="w-full mb-3 text-white"
              >
                Create Ticket
              </Button>
              <TicketType setActiveTabs={setActiveTab} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTabs === "compose" ? (
                <form
                  onSubmit={handleSend}
                  className="bg-accent-foreground rounded-lg p-4 md:p-6 border border-border"
                >
                  <h2 className="text-xl font-bold text-black dark:text-white mb-4">
                    Create New Support Ticket
                  </h2>
                  <div className="space-y-4">
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
                        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-accent border-input  w-full min-w-0 rounded-md border bg-accent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full border bg-accent border-border rounded-lg px-4 p-3 resize-none"
                      )}
                    />
                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        // onClick={handleSend}
                        className="flex text-white md:min-w-[150px] min-w-[120px] max-w-xs flex-1 items-center gap-2"
                        disabled={isCreatingTicket}
                      >
                        {isCreatingTicket ? (
                          <div className="center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                            SENDING...
                          </div>
                        ) : (
                          <div className="center gap-2  ">
                            <Send className="w-4 h-4" />
                            SEND
                          </div>
                        )}
                      </Button>
                      <Button
                        onClick={handleDiscard}
                        className="bg-destructive flex-1 hover:bg-destructive/90 min-w-[100px] text-white md:min-w-[150px] max-w-xs flex items-center gap-2"
                      >
                        <X className="w-4 h-4" /> Discard
                      </Button>
                    </div>
                  </div>
                </form>
              ) : showTicketDetails ? (
                <div className="bg-accent-foreground rounded-lg p-6 border border-border">
                  <Button
                    variant="link"
                    onClick={() => setShowTicketDetails(false)}
                    className=" mb-4 text-center font-semibold"
                  >
                    <ArrowLeft /> Back to list
                  </Button>

                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-card-foreground mb-2">
                          {currentTicket?.subject}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Ticket ID: #{currentTicket?.id}
                        </p>
                      </div>
                      {currentTicket?.status === "open" && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getPriorityColor(
                            currentTicket?.priority
                          )}`}
                        >
                          {currentTicket.priority} Priority
                        </span>
                      )}
                      {currentTicket?.status === "resolved" && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                          Resolved
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div>
                        <p className="text-muted-foreground">Created</p>
                        <p className="text-card-foreground font-semibold">
                          {formatTimeAgo(currentTicket?.createdAt || "N/A")}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">Description</p>
                      <p className="text-card-foreground">
                        {currentTicket?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 h-full rounded-md bg-accent">
                  {tickets.length < 1 ? (
                    <div className="center-col md:text-lg h-full py-10 space-y-3">
                      <p className="">
                        You do not have any{" "}
                        {activeTab === "in_progress"
                          ? "ticket in progress"
                          : activeTab + " ticket"}
                        .
                      </p>
                      <ArchiveX className="bg-[r]" />
                    </div>
                  ) : (
                    tickets.map((msg) => (
                      <button
                        key={msg.id}
                        onClick={() => {
                          handleTicketClick(msg.id);
                        }}
                        className="w-full bg-accent-foreground border border-border rounded-lg p-4 hover:border-accent transition text-left"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3
                            className={`font-semibold text-accent-foreground`}
                          >
                            {msg.subject}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(msg.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {msg.user}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {msg.description}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
