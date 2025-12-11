import { create } from "zustand";
import { devtools } from "zustand/middleware";
// import { Ticket, Reply, SupportStats, PaginationInfo } from "@/types/support";
import { enqueueSnackbar } from "notistack";
import { baseAxios } from "@/network/axios";

interface ITicket {
  id: string;
  user: string;
  subject: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}

interface IReply {
  message:string
}

interface ISupportStats {
  total_tickets: number;
  open_tickets: number;
  response_time: string;
}

// interface IPaginationInfo {}
interface SupportState {
  // State
  activeTab: "open" | "in_progress" | "resolved" | "closed";
  tickets: ITicket[];
  currentTicket: ITicket | null;
  replies: IReply[];
  stats: ISupportStats | null;
  // pagination: IPaginationInfo | null;

  // Loading States
  isLoading: boolean;
  isCreatingTicket: boolean;
  isReplying: boolean;
  isUpdatingTicket: boolean;

  // Actions
  setActiveTab: (tab: "open" | "in_progress" | "resolved" | "closed") => void;
  fetchTickets: (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) => Promise<void>;
  fetchTicketById: (id: string) => Promise<void>;
  createNewTicket: (data: {
    subject: string;
    description: string;
    priority: string;
  }) => Promise<void>;
  replyToCurrentTicket: (message: string) => Promise<void>;
  closeCurrentTicket: () => Promise<void>;
  reopenCurrentTicket: (reason: string) => Promise<void>;
  fetchStats: () => Promise<void>;
  setCurrentTicket: (ticket: ITicket | null) => void;
}

export const useSupportStore = create<SupportState>()(
  devtools(
    (set, get) => ({
      // Initial State
      tickets: [],
      activeTab: "open",
      currentTicket: null,
      replies: [],
      stats: null,
      // pagination: null,
      isLoading: false,
      isCreatingTicket: false,
      isReplying: false,
      isUpdatingTicket: false,

      // Actions
      setActiveTab: (tab: "open" | "in_progress" | "resolved" | "closed") => {
        set({ activeTab: tab });
      },
      fetchTickets: async (params) => {
        set({ isLoading: true });
        try {
          const response = await baseAxios.get(
            `/support/tickets?page=${params?.page}&limit=${params?.limit}&status=${params?.status}`,
            { withCredentials: true }
          );
          set({
            tickets: response.data.data.tickets,
            // pagination: response.data.data.pagination,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          console.log("failed too fetch tickets", error);
        }
      },

      fetchTicketById: async (id) => {
        set({ isLoading: true });
        try {
          const response = await baseAxios.get(`/support/${id}`,{withCredentials:true});
          set({
            currentTicket: response.data.data.ticket,
            replies: response.data.data.replies,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          console.log("failed to get ticket details", error);
        }
      },

      createNewTicket: async (data) => {
        set({ isCreatingTicket: true });
        try {
          const res = await baseAxios.post(
            "/support/create-ticket",
            { data },
            { withCredentials: true }
          );
          enqueueSnackbar(res.data.message, {
            variant: "success",
          });

          set({ isCreatingTicket: false });
          // Refetch tickets to show the new one
          get().fetchTickets();
        } catch (error) {
          set({ isCreatingTicket: false });
          console.log("failed to create new ticket", error);
        }
      },

      replyToCurrentTicket: async (message) => {
        if (!get().currentTicket) return;
        set({ isReplying: true });
        try {
          const res = await baseAxios.post(
            `/support/ticket/${get().currentTicket!.id}/${message}/reply`,
            { withCredentials: true }
          );
          enqueueSnackbar(res.data.message, { variant: "success" });
          // Refetch to show the new reply
          get().fetchTicketById(get().currentTicket!.id);
          set({ isReplying: false });
        } catch (error) {
          set({ isReplying: false });
          console.log("failed to send reply to ticket", error);
        }
      },

      closeCurrentTicket: async () => {
        if (!get().currentTicket) return;
        set({ isUpdatingTicket: true });
        try {
          const res = await baseAxios.patch(
            `/support/ticket/${get().currentTicket!.id}/close`,
            { withCredentials: true }
          );
          enqueueSnackbar(res.data.message, { variant: "success" });
          // Update the local state to reflect the change
          set({
            currentTicket: { ...get().currentTicket!, status: "closed" },
            isUpdatingTicket: false,
          });
          get().fetchTickets(); // Update the list
        } catch (error) {
          set({ isUpdatingTicket: false });
          console.log("failed to close current ticket", error);
        }
      },

      reopenCurrentTicket: async (reason) => {
        if (!get().currentTicket) return;
        set({ isUpdatingTicket: true });
        try {
          const res = await baseAxios(
            `/support/ticket/${get().currentTicket!.id}, ${reason}`,
            { withCredentials: true }
          );
          enqueueSnackbar(res.data.message, { variant: "success" });
          set({
            currentTicket: { ...get().currentTicket!, status: "open" },
            isUpdatingTicket: false,
          });
          get().fetchTickets(); // Update the list
        } catch (error) {
          set({ isUpdatingTicket: false });
          console.log("Failed to reopen ticket.", error);
        }
      },

      fetchStats: async () => {
        try {
          const response = await baseAxios.get(`/support/stats`, {
            withCredentials: true,
          });
          set({ stats: response.data.data });
        } catch (error) {
          console.log("Failed to fetch stats.", error);
        }
      },

      setCurrentTicket: (ticket) => set({ currentTicket: ticket, replies: [] }),
    }),
    { name: "support-store" }
  )
);
