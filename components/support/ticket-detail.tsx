"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { X, RotateCcw, Send } from "lucide-react"

type Ticket = {
  id: string
  user: string
  subject: string
  description: string
  priority: "low" | "medium" | "high"
  status: "open" | "in_progress" | "resolved" | "closed"
  createdAt: string
  updatedAt: string
}

type Reply = {
  id: string
  ticket: string
  user: string
  message: string
  isAdmin: boolean
  createdAt: string
}

const statusColors = {
  open: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  in_progress: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  resolved: "bg-green-500/10 text-green-700 dark:text-green-400",
  closed: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
}

interface TicketDetailProps {
  ticketId: string
  onTicketUpdated: () => void
}

export function TicketDetail({ ticketId, onTicketUpdated }: TicketDetailProps) {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [replies, setReplies] = useState<Reply[]>([])
  const [replyMessage, setReplyMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showCloseDialog, setShowCloseDialog] = useState(false)
  const [showReopenDialog, setShowReopenDialog] = useState(false)

  useEffect(() => {
    fetchTicketDetail()
  }, [ticketId])

  const fetchTicketDetail = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/support/ticket/${ticketId}`)
      const data = await response.json()
      setTicket(data.data?.ticket)
      setReplies(data.data?.replies || [])
    } catch (error) {
      console.error("Failed to fetch ticket:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return

    try {
      setSubmitting(true)
      const response = await fetch(`/api/support/ticket/${ticketId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyMessage }),
      })
      const data = await response.json()
      setReplies([...replies, data.data?.reply])
      setReplyMessage("")
    } catch (error) {
      console.error("Failed to send reply:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCloseTicket = async () => {
    try {
      const response = await fetch(`/api/support/ticket/${ticketId}/close`, {
        method: "PATCH",
      })
      const data = await response.json()
      setTicket(data.data?.ticket)
      setShowCloseDialog(false)
    } catch (error) {
      console.error("Failed to close ticket:", error)
    }
  }

  const handleReopenTicket = async () => {
    try {
      const response = await fetch(`/api/support/ticket/${ticketId}/reopen`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: "User reopened the ticket" }),
      })
      const data = await response.json()
      setTicket(data.data?.ticket)
      setShowReopenDialog(false)
    } catch (error) {
      console.error("Failed to reopen ticket:", error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Loading ticket...</p>
        </CardContent>
      </Card>
    )
  }

  if (!ticket) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Ticket not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Ticket Header */}
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{ticket.subject}</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={statusColors[ticket.status as keyof typeof statusColors]}>{ticket.status}</Badge>
                <Badge variant="outline" className="capitalize">
                  {ticket.priority} Priority
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Created {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {ticket.status !== "closed" ? (
                <Button variant="destructive" size="sm" onClick={() => setShowCloseDialog(true)} className="gap-2">
                  <X className="w-4 h-4" />
                  Close
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowReopenDialog(true)} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reopen
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-foreground whitespace-pre-wrap">{ticket.description}</p>
        </CardContent>
      </Card>

      {/* Replies Section */}
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Conversation ({replies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 pr-4 mb-6">
            <div className="space-y-4">
              {replies.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No replies yet</p>
              ) : (
                replies.map((reply) => (
                  <div
                    key={reply.id}
                    className={`p-4 rounded-lg ${
                      reply.isAdmin ? "bg-blue-500/10 border border-blue-200 dark:border-blue-800" : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">
                        {reply.user}
                        {reply.isAdmin && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Admin
                          </Badge>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(reply.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{reply.message}</p>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Reply Input */}
          {ticket.status !== "closed" && (
            <div className="space-y-3 border-t border-border pt-4">
              <Textarea
                placeholder="Type your reply..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="resize-none"
                rows={3}
              />
              <Button onClick={handleSendReply} disabled={!replyMessage.trim() || submitting} className="w-full gap-2">
                <Send className="w-4 h-4" />
                {submitting ? "Sending..." : "Send Reply"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Close Dialog */}
      <AlertDialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Close Ticket</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to close this ticket? You can reopen it later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCloseTicket}>Close</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reopen Dialog */}
      <AlertDialog open={showReopenDialog} onOpenChange={setShowReopenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reopen Ticket</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to reopen this ticket?</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReopenTicket}>Reopen</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
