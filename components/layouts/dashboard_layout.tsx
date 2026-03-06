"use client";

import React from "react";
import DashboardHeader from "./dashboard_header";
import DashboardSidemenu from "./dashboard_sidemenu";
import useUserStore from "@/app/user/user_store";
import { AuthGuard, InactiveAccountGuard } from "../auth_guard";
import DashboardAdPrompt from "../shared/ad_prompt";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, authStatus } = useUserStore();

  const hasActiveFeature = user?.adPrompts
    ? Object.values(user.adPrompts).some((value) => value === true)
    : false;

  const isLoadingUser = authStatus === "checking" || authStatus === "loading";

  return (
    <AuthGuard requireAuth allowedStatuses={["authenticated", "inactive"]}>
      <InactiveAccountGuard>
        <main className="relative bg-accent overflow-hidden min-h-screen flex flex-col">
          {/* Header */}
          <DashboardHeader />

          <section className="flex flex-1 h-[calc(100dvh-80px-68px)] w-full">
            {/* Sidebar - Hidden for inactive accounts */}
              <aside>
                <DashboardSidemenu totalDeposit={user?.balance?.deposit ?? 0} />
              </aside>

            {/* Main Content */}
            <section
              className={`w-full ${
                isLoadingUser ? "overflow-y-clip" : "overflow-y-auto"
              }`}
            >
              {isLoadingUser ? (
                <div className="flex items-center justify-center min-h-full">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Ad Prompt Banner */}
                  {user?.showAdPrompt && hasActiveFeature && (
                    <div className="pt-4 pb-4 px-4 md:pt-6 md:px-6">
                      <DashboardAdPrompt />
                    </div>
                  )}

                  {/* Page Content */}
                  <div className="h-full">{children}</div>
                </>
              )}
            </section>
          </section>

          {/* Footer */}
          <footer className="center z-20 relative w-full bg-accent-foreground h-17 text-white">
            <p className="sm:text-[15px] text-accent-text text-sm text-center px-4">
              Copyright © 2019 - 2026 | CristalPoint Management. All Right
              Reserved.
            </p>
          </footer>
        </main>
      </InactiveAccountGuard>
    </AuthGuard>
  );
};

export default DashboardLayout;
