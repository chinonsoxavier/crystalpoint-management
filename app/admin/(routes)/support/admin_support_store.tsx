import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosError, baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";

export interface ISupportTicket {
  _id: string;
  user: string;
  subject: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

interface ISupportReply {
  id: string;
  message: string;
  createdBy: string;
  createdAt: string;
}

interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface ISupportStats {
  overview: {
    total_tickets: number;
    open_tickets: number;
    response_time: string;
  };
}

interface AdminSupportStore {
  // State
  tickets: ISupportTicket[];
  openTickets: number;
  closedTickets: number;
  resolvedTickets: number;
  inProgressTickets: number;
  selectedTicket: ISupportTicket | null;
  replies: ISupportReply[];
  pagination: IPagination | null;
  supportStats: ISupportStats | null;
  isLoadingTickets: boolean;
  isLoadingTicketDetails: boolean;
  isLoadingStats: boolean;
  isReplyingToTicket: boolean;
  isUpdatingTicketStatus: boolean;
  isAssigningTicket: boolean;

  // Actions
  fetchTickets: (params: {
    page?: number;
    limit?: number;
    status?: "open" | "in_progress" | "resolved" | "closed";
    priority?: "low" | "medium" | "high" | "urgent";
  }) => Promise<void>;
  fetchTicketDetails: (ticketId: string | undefined) => Promise<void>;
  replyToTicket: (
    ticketId: string | undefined,
    message: string
  ) => Promise<void>;
  updateTicketStatus: (
    ticketId: string,
    status: "open" | "in_progress" | "resolved" | "closed"
  ) => Promise<void>;
  assignTicket: (ticketId: string, adminId: string) => Promise<void>;
  fetchSupportStats: () => Promise<void>;
  setSelectedTicket: (ticket: ISupportTicket | null) => void;
  fetchTicketCounts: () => Promise<void>;
}

export const useAdminSupportStore = create<AdminSupportStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      tickets: [],
      openTickets: 0,
      closedTickets: 0,
      resolvedTickets: 0,
      inProgressTickets: 0,
      selectedTicket: null,
      replies: [],
      pagination: null,
      supportStats: null,
      isLoadingTickets: false,
      isLoadingTicketDetails: false,
      isLoadingStats: false,
      isReplyingToTicket: false,
      isUpdatingTicketStatus: false,
      isAssigningTicket: false,

      // Actions
      fetchTickets: async (params) => {
        set({ isLoadingTickets: true });
        try {
          const queryString = new URLSearchParams({
            page: String(params.page || 1),
            limit: String(params.limit || 10),
            ...(params.status && { status: params.status }),
            ...(params.priority && { priority: params.priority }),
          }).toString();

          const response = await baseAxios.get(
            `/admin/support/tickets?${queryString}`,
            { withCredentials: true }
          );

          const ticketsData: ISupportTicket[] =
            response.data?.data?.tickets || [];

          // Count tickets by status
          const statusCounts = ticketsData.reduce(
            (acc, ticket: ISupportTicket) => {
              const status = ticket.status;
              if (status === "open") acc.open++;
              else if (status === "closed") acc.closed++;
              else if (status === "resolved") acc.resolved++;
              else if (status === "in_progress") acc.inProgress++;
              return acc;
            },
            { open: 0, closed: 0, resolved: 0, inProgress: 0 }
          );

          set({
            tickets: ticketsData,
            pagination: response.data?.data?.pagination,
            openTickets: statusCounts.open,
            closedTickets: statusCounts.closed,
            resolvedTickets: statusCounts.resolved,
            inProgressTickets: statusCounts.inProgress,
            isLoadingTickets: false,
          });

          console.log(response.data.data);
          return response.data.data.length;
        } catch (error) {
          set({ isLoadingTickets: false });
          console.log("Failed to fetch support tickets:", error);
        }
      },

      fetchTicketDetails: async (ticketId:string | undefined) => {
        set({ isLoadingTicketDetails: true });
        try {
          const response = await baseAxios.get(
            `/admin/support/tickets/${ticketId}`,
            { withCredentials: true }
          );

          set({
            selectedTicket: response.data?.data?.ticket,
            replies: response.data?.data?.replies || [],
            isLoadingTicketDetails: false,
          });
          console.log(response.data.data);
        } catch (error) {
          set({ isLoadingTicketDetails: false });
          console.log("Failed to fetch ticket details:", error);
        }
      },

      replyToTicket: async (ticketId, message) => {
        set({ isReplyingToTicket: true });
        try {
          const response = await baseAxios.post(
            `/admin/support/tickets/${ticketId}/reply`,
            { message },
            { withCredentials: true }
          );

          enqueueSnackbar(response.data.message, { variant: "success" });

          // Refresh ticket details to show new reply
          get().fetchTicketDetails(ticketId);
          set({ isReplyingToTicket: false });
        } catch (error) {
          set({ isReplyingToTicket: false });
          console.log("Failed to reply to ticket:", error);
          axiosError(error);
        }
      },

      updateTicketStatus: async (ticketId, status) => {
        set({ isUpdatingTicketStatus: true });
        try {
          const response = await baseAxios.patch(
            `/admin/support/tickets/${ticketId}/status`,
            { status },
            { withCredentials: true }
          );
          console.log(status);

          enqueueSnackbar(response.data.message, {
            variant: "success",
          });

          // Update local state
          set((state) => {
            const updatedTickets: ISupportTicket[] = state.tickets.map(
              (ticket) =>
                ticket._id === ticketId ? { ...ticket, status } : ticket
            );

            // Recalculate status counts
            const statusCounts = updatedTickets.reduce(
              (acc, ticket: ISupportTicket) => {
                const ticketStatus = ticket.status;
                if (ticketStatus === "open") acc.open++;
                else if (ticketStatus === "closed") acc.closed++;
                else if (ticketStatus === "resolved") acc.resolved++;
                else if (ticketStatus === "in_progress") acc.inProgress++;
                return acc;
              },
              { open: 0, closed: 0, resolved: 0, inProgress: 0 }
            );

            return {
              tickets: updatedTickets,
              openTickets: statusCounts.open,
              closedTickets: statusCounts.closed,
              resolvedTickets: statusCounts.resolved,
              inProgressTickets: statusCounts.inProgress,
              isUpdatingTicketStatus: false,
            };
          });

          get().fetchTicketDetails(ticketId);
        } catch (error) {
          set({ isUpdatingTicketStatus: false });
          console.log("Failed to update ticket status:", error);
          axiosError(error);
        }
      },

      assignTicket: async (ticketId, adminId) => {
        set({ isAssigningTicket: true });
        try {
          const response = await baseAxios.patch(
            `/admin/support/tickets/${ticketId}/assign`,
            { assignedTo: adminId },
            { withCredentials: true }
          );

          enqueueSnackbar(response.data.message, {
            variant: "success",
          });

          // Update local state
          set((state) => ({
            tickets: state.tickets.map((ticket) =>
              ticket._id === ticketId
                ? { ...ticket, assignedTo: adminId }
                : ticket
            ),
            isAssigningTicket: false,
          }));

          get().fetchTicketDetails(ticketId);
        } catch (error) {
          set({ isAssigningTicket: false });
          console.log("Failed to assign ticket:", error);
          axiosError(error);
        }
      },

      fetchSupportStats: async () => {
        set({ isLoadingStats: true });
        try {
          const response = await baseAxios.get(`/admin/support/stats`, {
            withCredentials: true,
          });

          set({
            supportStats: response.data?.data,
            isLoadingStats: false,
          });
          console.log('stats',response.data.data);
        } catch (error) {
          set({ isLoadingStats: false });
          console.log("Failed to fetch support stats:", error);
        }
      },

      // New function to fetch all tickets and count them by status
      fetchTicketCounts: async () => {
        try {
          // Fetch all tickets regardless of status
          const response = await baseAxios.get(
            `/admin/support/tickets?limit=1000`, // Set a high limit to get all tickets
            { withCredentials: true }
          );

          const ticketsData: ISupportTicket[] =
            response.data?.data?.tickets || [];

          // Count tickets by status
          const statusCounts = ticketsData.reduce(
            (acc, ticket: ISupportTicket) => {
              const status = ticket.status;
              if (status === "open") acc.open++;
              else if (status === "closed") acc.closed++;
              else if (status === "resolved") acc.resolved++;
              else if (status === "in_progress") acc.inProgress++;
              return acc;
            },
            { open: 0, closed: 0, resolved: 0, inProgress: 0 }
          );

          set({
            openTickets: statusCounts.open,
            closedTickets: statusCounts.closed,
            resolvedTickets: statusCounts.resolved,
            inProgressTickets: statusCounts.inProgress,
          });
        } catch (error) {
          console.log("Failed to fetch ticket counts:", error);
        }
      },

      setSelectedTicket: (ticket) =>
        set({ selectedTicket: ticket, replies: [] }),
    }),
    { name: "admin-support-store" }
  )
);
