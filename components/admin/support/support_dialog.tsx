import { ISupportTicket } from "@/app/admin/(routes)/support/admin_support_store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAdminSupportStore } from "@/app/admin/(routes)/support/admin_support_store";

interface ISupportTicketDialog {
  setSelectedTicket: Dispatch<SetStateAction<ISupportTicket | null>>;
  ticket: ISupportTicket;
  selectedTicket: ISupportTicket | null;
}

const SupportDialog = ({
  setSelectedTicket,
  ticket,
  selectedTicket,
}: ISupportTicketDialog) => {
  const [reply, setReply] = useState<string>("");
  const [status, setStatus] = useState<
    "open" | "in_progress" | "resolved" | "closed" | undefined
  >(selectedTicket?.status);

  const {
    replyToTicket,
    replies,
    isReplyingToTicket,
    updateTicketStatus, 
    isUpdatingTicketStatus
  } = useAdminSupportStore();



  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicket?._id && reply.trim() !== "") {
      replyToTicket(selectedTicket._id, reply);
      setReply(""); 
    }
  };

  const handleStatusUpdate = () => {
    if (selectedTicket?._id && status && statusChanged) {
      updateTicketStatus(selectedTicket._id, status);
    }
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as "open" | "in_progress" | "resolved" | "closed");
  };

  const statusChanged = selectedTicket?.status !== status;
  const replyDisabled = isReplyingToTicket || reply.trim() === "";

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedTicket(ticket);
            }}
          >
            <Eye size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
            <DialogDescription>View and manage ticket</DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="flex grid-cols-2 gap-4">
                <div className="w-min">
                  <p className="text-sm text-muted-foreground">Ticket ID</p>
                  <p className="font-mono font-semibold">
                    {selectedTicket?._id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(selectedTicket.status)}>
                    {selectedTicket.status.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <Badge className={getPriorityColor(selectedTicket.priority)}>
                    {selectedTicket.priority}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Subject</p>
                <p className="font-semibold">{selectedTicket.subject}</p>
              </div>

              <div className="scrollbar_hidden max-h-50">
                <p className="text-sm text-muted-foreground mb-2">Messages</p>
                <div className="bg-accent-foreground p-4 rounded-md space-y-3 max-h-48 overflow-y-auto">
                  <div className="bg-accent p-3 rounded">
                    <p className="text-xs text-muted-foreground">
                      User Message
                    </p>
                    <p className="text-sm">{selectedTicket?.description}</p>
                  </div>
                  {replies.map((reply, index) => (
                    <div key={index} className="bg-primary/10 p-3 rounded ml-4">
                      <p className="text-xs text-muted-foreground">
                        Admin Reply
                      </p>
                      <p className="text-sm">{reply.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleReply} className="space-y-2">
                <div>
                  <label
                    htmlFor="reply-textarea"
                    className="text-sm font-medium"
                  >
                    Add Reply
                  </label>
                  <Textarea
                    id="reply-textarea"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your response..."
                    className="mt-2 h-20 bg-accent"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={replyDisabled}>
                    {isReplyingToTicket ? "Sending..." : "Send Reply"}
                  </Button>
                </div>
              </form>

              <div className="space-y-2 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium">Update Status</label>
                  <Select onValueChange={handleStatusChange} value={status}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 justify-end">
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                  <Button
                    onClick={handleStatusUpdate}
                    disabled={!statusChanged || !status}
                    variant="secondary" // Optional: use a different variant for status
                  >
                    {isUpdatingTicketStatus
                      ? "Saving status change..."
                      : "Save Status Change"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupportDialog;
