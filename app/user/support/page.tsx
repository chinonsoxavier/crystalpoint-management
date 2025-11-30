"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Star, CheckCircle, Send, X, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
  const [activeTab, setActiveTab] = useState<"messages" | "open" | "resolved" | "compose">(
    "messages"
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState<Message | Ticket | null>(
    null
  );

  const handleSend = () => {
    if (subject.trim() && message.trim()) {
      setSubject("");
      setMessage("");
      setShowCompose(false);
      alert("Your message has been sent successfully!");
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
    <div className="h-full bg-accent">
      <div className="flex gap-6 p-4 md:p-6 pt-15 md:pt-20">
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-3">
              <Button
                onClick={() =>{setActiveTab("compose"); setShowCompose(!showCompose)}}
                className="w-full font-semibold py-6 text-lg"
              >
                Compose
              </Button>

              {/* Navigation Tabs */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setActiveTab("messages");
                    setSelectedItem(null);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg  ${
                    activeTab === "messages"
                      ? "bg-primary text-accent-foreground"
                      : "bg-accent-foreground text-card-foreground hover:bg-accent-foreground/80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    <span className="font-semibold">Messages</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      activeTab === "messages"
                        ? "bg-white text-accent"
                        : "bg-accent text-white"
                    }`}
                  >
                    {mockMessages.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("open");
                    setSelectedItem(null);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                    activeTab === "open"
                      ? "bg-primary text-accent-foreground"
                      : "bg-accent-foreground text-card-foreground hover:bg-accent-foreground/80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    <span className="font-semibold">Open tickets</span>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                    {mockOpenTickets.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("resolved");
                    setSelectedItem(null);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition ${
                    activeTab === "resolved"
                      ? "bg-primary text-accent-foreground"
                      : "bg-accent-foreground text-card-foreground hover:bg-accent-foreground/80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Resolved tickets</span>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                    {mockResolvedTickets.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              { activeTab === 'compose' ? (
                <div className="bg-accent-foreground rounded-lg p-4 md:p-6 border border-border">
                  <h2 className="text-xl font-bold text-black dark:text-white mb-4">
                    Create New Support Ticket
                  </h2>
                  <div className="space-y-4">
                    <Input
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
                      onChange={(e) => setMessage(e.target.value)}
                      className={cn(
                        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-accent border-input  w-full min-w-0 rounded-md border bg-accent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive w-full border bg-accent border-border rounded-lg px-4 p-3 resize-none"
                      )}
                    />
                    <div className="flex gap-3">
                      <Button
                        onClick={handleSend}
                        className="flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" /> Send
                      </Button>
                      <Button
                        onClick={handleDiscard}
                        className="bg-destructive hover:bg-destructive/90 text-white flex items-center gap-2"
                      >
                        <X className="w-4 h-4" /> Discard
                      </Button>
                    </div>
                  </div>
                </div>
              ) : selectedItem ? (
                <div className="bg-accent-foreground rounded-lg p-6 border border-border">
                  <Button variant="link"
                    onClick={() => setSelectedItem(null)}
                    className=" mb-4 text-center font-semibold"
                  >
                    <ArrowLeft/> Back to list
                  </Button>
                  {activeTab === "messages" && (
                    <div>
                      <h2 className="text-2xl font-bold text-card-foreground mb-2">
                        {"subject" in selectedItem
                          ? selectedItem.subject
                          : "Message"}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        From:{" "}
                        {"sender" in selectedItem
                          ? selectedItem.sender
                          : "Support Team"}{" "}
                        •{" "}
                        {"timestamp" in selectedItem
                          ? selectedItem.timestamp
                          : "Date"}
                      </p>
                      <p className="text-card-foreground">
                        {"preview" in selectedItem ? selectedItem.preview : ""}
                      </p>
                    </div>
                  )}
                  {(activeTab === "open" || activeTab === "resolved") && (
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-card-foreground mb-2">
                            {"subject" in selectedItem
                              ? selectedItem.subject
                              : "Ticket"}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Ticket ID: #
                            {"id" in selectedItem ? selectedItem.id : "000"}
                          </p>
                        </div>
                        {activeTab === "open" && "priority" in selectedItem && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getPriorityColor(
                              selectedItem.priority
                            )}`}
                          >
                            {selectedItem.priority} Priority
                          </span>
                        )}
                        {activeTab === "resolved" && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">
                            Resolved
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div>
                          <p className="text-muted-foreground">Created</p>
                          <p className="text-card-foreground font-semibold">
                            {"createdAt" in selectedItem
                              ? selectedItem.createdAt
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Updated</p>
                          <p className="text-card-foreground font-semibold">
                            {"lastUpdated" in selectedItem
                              ? selectedItem.lastUpdated
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-2">
                          Description
                        </p>
                        <p className="text-card-foreground">
                          {"description" in selectedItem
                            ? selectedItem.description
                            : "No description available"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {activeTab === "messages" &&
                    mockMessages.map((msg) => (
                      <button
                        key={msg.id}
                        onClick={() => setSelectedItem(msg)}
                        className="w-full bg-accent-foreground border border-border rounded-lg p-4 hover:border-accent transition text-left"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3
                            className={`font-semibold ${
                              msg.read
                                ? "text-muted-foreground"
                                : "text-card-foreground"
                            }`}
                          >
                            {msg.subject}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {msg.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {msg.sender}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {msg.preview}
                        </p>
                      </button>
                    ))}

                  {activeTab === "open" &&
                    mockOpenTickets.map((ticket) => (
                      <button
                        key={ticket.id}
                        onClick={() => setSelectedItem(ticket)}
                        className="w-full bg-accent-foreground border border-border rounded-lg p-4 hover:border-accent transition text-left"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-card-foreground">
                            {ticket.subject}
                          </h3>
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded ${getPriorityColor(
                              ticket.priority
                            )}`}
                          >
                            {ticket.priority}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Ticket ID: #{ticket.id} • Created: {ticket.createdAt}
                        </p>
                      </button>
                    ))}

                  {activeTab === "resolved" &&
                    mockResolvedTickets.map((ticket) => (
                      <button
                        key={ticket.id}
                        onClick={() => setSelectedItem(ticket)}
                        className="w-full bg-accent-foreground border border-border rounded-lg p-4 hover:border-accent transition text-left"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-card-foreground line-through text-muted-foreground">
                            {ticket.subject}
                          </h3>
                          <span className="text-xs font-bold px-2 py-1 rounded bg-green-500/20 text-green-400">
                            Resolved
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Ticket ID: #{ticket.id} • Resolved:{" "}
                          {ticket.lastUpdated}
                        </p>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
