// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import { supportApi } from "@/network/support";
// import { Ticket, Reply, SupportStats, PaginationInfo } from "@/types/support";
// import { enqueueSnackbar } from "notistack";

// interface SupportState {
//   // State
//   tickets: Ticket[];
//   currentTicket: Ticket | null;
//   replies: Reply[];
//   stats: SupportStats | null;
//   pagination: PaginationInfo | null;

//   // Loading States
//   isLoading: boolean;
//   isCreatingTicket: boolean;
//   isReplying: boolean;
//   isUpdatingTicket: boolean;

//   // Actions
//   fetchTickets: (params?: {
//     page?: number;
//     limit?: number;
//     status?: string;
//   }) => Promise<void>;
//   fetchTicketById: (id: string) => Promise<void>;
//   createNewTicket: (data: {
//     subject: string;
//     description: string;
//     priority: string;
//   }) => Promise<void>;
//   replyToCurrentTicket: (message: string) => Promise<void>;
//   closeCurrentTicket: () => Promise<void>;
//   reopenCurrentTicket: (reason: string) => Promise<void>;
//   fetchStats: () => Promise<void>;
//   setCurrentTicket: (ticket: Ticket | null) => void;
// }

// export const useSupportStore = create<SupportState>()(
//   devtools(
//     (set, get) => ({
//       // Initial State
//       tickets: [],
//       currentTicket: null,
//       replies: [],
//       stats: null,
//       pagination: null,
//       isLoading: false,
//       isCreatingTicket: false,
//       isReplying: false,
//       isUpdatingTicket: false,

//       // Actions
//       fetchTickets: async (params) => {
//         set({ isLoading: true });
//         try {
//           const response = await supportApi.getTickets(params);
//           set({
//             tickets: response.data.data.tickets,
//             pagination: response.data.data.pagination,
//             isLoading: false,
//           });
//         } catch (error) {
//           set({ isLoading: false });
//           enqueueSnackbar("Failed to fetch tickets.", { variant: "error" });
//         }
//       },

//       fetchTicketById: async (id) => {
//         set({ isLoading: true });
//         try {
//           const response = await supportApi.getTicketById(id);
//           set({
//             currentTicket: response.data.data.ticket,
//             replies: response.data.data.replies,
//             isLoading: false,
//           });
//         } catch (error) {
//           set({ isLoading: false });
//           enqueueSnackbar("Failed to fetch ticket details.", {
//             variant: "error",
//           });
//         }
//       },

//       createNewTicket: async (data) => {
//         set({ isCreatingTicket: true });
//         try {
//           await supportApi.createTicket(data);
//           enqueueSnackbar("Ticket created successfully!", {
//             variant: "success",
//           });
//           set({ isCreatingTicket: false });
//           // Refetch tickets to show the new one
//           get().fetchTickets();
//         } catch (error) {
//           set({ isCreatingTicket: false });
//           enqueueSnackbar("Failed to create ticket.", { variant: "error" });
//         }
//       },

//       replyToCurrentTicket: async (message) => {
//         if (!get().currentTicket) return;
//         set({ isReplying: true });
//         try {
//           await supportApi.replyToTicket(get().currentTicket!.id, message);
//           enqueueSnackbar("Reply sent!", { variant: "success" });
//           // Refetch to show the new reply
//           get().fetchTicketById(get().currentTicket!.id);
//           set({ isReplying: false });
//         } catch (error) {
//           set({ isReplying: false });
//           enqueueSnackbar("Failed to send reply.", { variant: "error" });
//         }
//       },

//       closeCurrentTicket: async () => {
//         if (!get().currentTicket) return;
//         set({ isUpdatingTicket: true });
//         try {
//           await supportApi.closeTicket(get().currentTicket!.id);
//           enqueueSnackbar("Ticket closed.", { variant: "success" });
//           // Update the local state to reflect the change
//           set({
//             currentTicket: { ...get().currentTicket!, status: "closed" },
//             isUpdatingTicket: false,
//           });
//           get().fetchTickets(); // Update the list
//         } catch (error) {
//           set({ isUpdatingTicket: false });
//           enqueueSnackbar("Failed to close ticket.", { variant: "error" });
//         }
//       },

//       reopenCurrentTicket: async (reason) => {
//         if (!get().currentTicket) return;
//         set({ isUpdatingTicket: true });
//         try {
//           await supportApi.reopenTicket(get().currentTicket!.id, reason);
//           enqueueSnackbar("Ticket reopened.", { variant: "success" });
//           set({
//             currentTicket: { ...get().currentTicket!, status: "open" },
//             isUpdatingTicket: false,
//           });
//           get().fetchTickets(); // Update the list
//         } catch (error) {
//           set({ isUpdatingTicket: false });
//           enqueueSnackbar("Failed to reopen ticket.", { variant: "error" });
//         }
//       },

//       fetchStats: async () => {
//         try {
//           const response = await supportApi.getStats();
//           set({ stats: response.data.data });
//         } catch (error) {
//           enqueueSnackbar("Failed to fetch stats.", { variant: "error" });
//         }
//       },

//       setCurrentTicket: (ticket) => set({ currentTicket: ticket, replies: [] }),
//     }),
//     { name: "support-store" }
//   )
// );
