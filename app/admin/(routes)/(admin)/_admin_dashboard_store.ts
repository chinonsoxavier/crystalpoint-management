import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { baseAxios } from "@/network/axios";
import { enqueueSnackbar } from "notistack";

interface IDashboardOverview {
  total_users: number;
  total_deposits: number;
  total_withdrawals: number;
  total_investments: number;
  pending_withdrawals: number;
  open_tickets: number;
  new_users_today: number;
  total_deposit_amount: number;
  total_withdrawal_amount: number;
  total_investment_amount: number;
}

// interface IRecentActivity {
//   [key: string]: ;
// }

// interface IAnalytics {
//   period: string;
//   [key: string]: any;
// }

interface IFinancialSummary {
  total_revenue: number;
  total_deposits: number;
  total_withdrawals: number;
  net_profit: number;
  active_investments: number;
  date_range: {
    start_date: string;
    end_date: string;
  };
}

interface AdminDashboardStore {
  // State
  overview: IDashboardOverview | null;
  recentActivities: [] | null;
  analytics: [];
  financialSummary: IFinancialSummary | null;
  isLoadingOverview: boolean;
  isLoadingAnalytics: boolean;
  isLoadingFinancial: boolean;

  // Actions
  fetchDashboardOverview: () => Promise<void>;
  fetchAnalytics: (period: "7d" | "30d" | "90d" | "1y") => Promise<void>;
  fetchFinancialSummary: (startDate: string, endDate: string) => Promise<void>;
}

export const useAdminDashboardStore = create<AdminDashboardStore>()(
  devtools(
    (set) => ({
      // Initial State
      overview: null,
      recentActivities: null,
      analytics: [],
      financialSummary: null,
      isLoadingOverview: false,
      isLoadingAnalytics: false,
      isLoadingFinancial: false,

      // Actions
      fetchDashboardOverview: async () => {
        set({ isLoadingOverview: true });
        try {
          const response = await baseAxios.get("/admin/dashboard/overview", {
            withCredentials: true
          });
          set({
            overview: response.data?.data?.overview,
            recentActivities: response.data?.data?.recent_activities,
            isLoadingOverview: false,
          });
        } catch (error) {
          set({ isLoadingOverview: false });
          console.log("Failed to fetch dashboard overview:", error);
          enqueueSnackbar("Failed to fetch dashboard overview", {
            variant: "error",
          });
        }
      },

      fetchAnalytics: async (period) => {
        set({ isLoadingAnalytics: true });
        try {
          const response = await baseAxios.get(
            `/admin/dashboard/analytics?period=${period}`,
            { withCredentials: true }
          );
          console.log(response.data.data);
          set({
            analytics: response.data?.data,
            isLoadingAnalytics: false,
          });
        } catch (error) {
          set({ isLoadingAnalytics: false });
          console.log("Failed to fetch analytics:", error);
          enqueueSnackbar("Failed to fetch analytics", { variant: "error" });
        }
      },

      fetchFinancialSummary: async (startDate, endDate) => {
        set({ isLoadingFinancial: true });
        try {
          const response = await baseAxios.get(
            `/admin/dashboard/financial-summary?startDate=${startDate}&endDate=${endDate}`,
            { withCredentials: true }
          );
          set({
            financialSummary: response.data?.data,
            isLoadingFinancial: false,
          });
        } catch (error) {
          set({ isLoadingFinancial: false });
          console.log("Failed to fetch financial summary:", error);
          enqueueSnackbar("Failed to fetch financial summary", {
            variant: "error",
          });
        }
      },
    }),
    { name: "admin-dashboard-store" }
  )
);
