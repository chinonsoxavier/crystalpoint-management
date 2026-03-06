"use client";

import PreviousTransactions from "@/components/user/user_dashboard/previous_transactions";
import UserDashboard from "@/components/user/user_dashboard/user_dashboard";
import useUserStore from "../user_store";
import DeActivatedMessage from "@/components/shared/deactivated_message";

const Page = () => {
  const { authStatus, user } = useUserStore();

  // Handle loading states
  if (authStatus === "checking" || authStatus === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-128px)] w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Handle inactive account
  if (authStatus === "inactive" || user?.isActive === false) {
    return (
      <div className="overflow-y-auto bg-accent md:p-6 p-4 max-h-[calc(100dvh-128px)] w-full h-full text-white">
        <DeActivatedMessage />
      </div>
    );
  }

  // Normal dashboard for authenticated active users
  return (
    <div className="overflow-y-auto bg-accent md:p-6 p-4 max-h-[calc(100dvh-128px)] w-full h-full text-white">
      {/* user dashboard */}
      <UserDashboard />
      {/* previous transactions */}
      <PreviousTransactions />
    </div>
  );
};

export default Page;
