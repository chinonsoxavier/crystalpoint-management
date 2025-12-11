"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, AlertCircle } from "lucide-react"

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

const statusColors = {
  open: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  in_progress: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  resolved: "bg-green-500/10 text-green-700 dark:text-green-400",
  closed: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
}

const priorityColors = {
  low: "text-green-600 dark:text-green-400",
  medium: "text-amber-600 dark:text-amber-400",
  high: "text-red-600 dark:text-red-400",
}

interface TicketListProps {
  tickets: Ticket[]
  selectedTicketId: string | null
  onSelectTicket: (id: string) => void
  onStatusFilterChange: (status: string) => void
  loading: boolean
}

export function TicketList({
  tickets,
  selectedTicketId,
  onSelectTicket,
  onStatusFilterChange,
  loading,
}: TicketListProps) {
  const [filter, setFilter] = useState("all")

  const handleFilterChange = (value: string) => {
    setFilter(value)
    onStatusFilterChange(value)
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="border-b border-border">
        <Select value={filter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tickets</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">Loading...</div>
          ) : tickets.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No tickets found</div>
          ) : (
            <div className="divide-y divide-border">
              {tickets.map((ticket) => (
                <Button
                  key={ticket.id}
                  variant="ghost"
                  className={`w-full justify-start rounded-none p-4 h-auto flex-col items-start ${
                    selectedTicketId === ticket.id ? "bg-accent" : ""
                  }`}
                  onClick={() => onSelectTicket(ticket.id)}
                >
                  <div className="w-full flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate text-sm text-left">{ticket.subject}</p>
                    </div>
                    <Badge variant="secondary" className={statusColors[ticket.status as keyof typeof statusColors]}>
                      {ticket.status}
                    </Badge>
                  </div>
                  <div className="w-full flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <AlertCircle className={`w-3 h-3 ${priorityColors[ticket.priority]}`} />
                    <span className="capitalize">{ticket.priority} priority</span>
                  </div>
                  <div className="w-full flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  )
}
