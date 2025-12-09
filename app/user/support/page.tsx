"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { TicketList } from "@/components/support/ticket-list";
import { TicketDetail } from "@/components/support/ticket-detail";
import { CreateTicketDialog } from "@/components/support/create-ticket-dialog";
import { SupportStats } from "@/components/support/support-stats";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Enhanced type definitions with more detailed properties
export type Ticket = {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  category: string;
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  lastReplyAt?: string;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    size: number;
  }>;
  tags?: string[];
};

export type TicketFilter = {
  status?: string;
  priority?: string;
  category?: string;
  assignedTo?: string;
  search?: string;
};

// API service for ticket operations
const ticketService = {
  async fetchTickets(filter: TicketFilter = {}): Promise<Ticket[]> {
    const url = new URL("/api/support/tickets", window.location.origin);

    // Add filter parameters
    Object.entries(filter).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch tickets: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data?.tickets || [];
  },

  async createTicket(ticketData: Partial<Ticket>): Promise<Ticket> {
    const response = await fetch("/api/support/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create ticket: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data?.ticket;
  },

  async updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket> {
    const response = await fetch(`/api/support/tickets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ticket: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data?.ticket;
  },
};

export default function SupportPage() {
  // State management
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [filter, setFilter] = useState<TicketFilter>({});

  // Memoized filtered tickets to avoid unnecessary recalculations
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      // Apply filters here if needed
      return true;
    });
  }, [tickets]);

  // Fetch tickets from API
  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ticketService.fetchTickets(filter);
      setTickets(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // Initial fetch and refetch when filter changes
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Handle ticket creation
  const handleTicketCreated = useCallback(
    async (ticketData: Partial<Ticket>) => {
      try {
        await ticketService.createTicket(ticketData);
        setCreateDialogOpen(false);
        fetchTickets();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create ticket"
        );
      }
    },
    [fetchTickets]
  );

  // Handle ticket updates
  const handleTicketUpdated = useCallback(
    async (id: string, updates: Partial<Ticket>) => {
      try {
        await ticketService.updateTicket(id, updates);
        fetchTickets();
        setSelectedTicketId(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update ticket"
        );
      }
    },
    [fetchTickets]
  );

  // Handle filter changes
  const handleFilterChange = useCallback((newFilter: TicketFilter) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  }, []);

  // Handle ticket selection
  const handleSelectTicket = useCallback((ticketId: string) => {
    setSelectedTicketId(ticketId);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Support Tickets
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your support requests and conversations
            </p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Ticket
          </Button>
        </header>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <SupportStats className="mb-8" tickets={tickets} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket List */}
          <div className="lg:col-span-1">
            <TicketList
              tickets={filteredTickets}
              selectedTicketId={selectedTicketId}
              onSelectTicket={handleSelectTicket}
              onFilterChange={handleFilterChange}
              loading={loading}
              filter={filter}
            />
          </div>

          {/* Ticket Detail */}
          <div className="lg:col-span-2">
            {selectedTicketId ? (
              <TicketDetail
                ticketId={selectedTicketId}
                onTicketUpdated={handleTicketUpdated}
              />
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <p className="text-muted-foreground">
                  Select a ticket to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Dialog */}
      <CreateTicketDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreate={handleTicketCreated}
      />
    </main>
  );
}
