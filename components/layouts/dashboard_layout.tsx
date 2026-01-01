"use client";
import React from "react";
import DashboardHeader from "./dashboard_header";
import DashboardSidemenu from "./dashboard_sidemenu";
import useUserStore from "@/app/user/user_store";
import { AuthGuard } from "../auth_guard";
import DashboardAdPrompt from "../shared/ad_prompt";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();

   
  return (
    <AuthGuard>
      <main className={`relative bg-accent overflow-hidden`}>
        {/* header */}
        <DashboardHeader />
        <section className="flex h-[calc(100dvh-80px-48px)] w-full">
          <aside className="">
            <DashboardSidemenu totalDeposit={user?.balance?.deposit ?? 0} />
          </aside>

          <section className="w-full overflow-y-auto ">
            <div
              className={`pt-4 pb-5 overflow-y-auto h-[25%] px-4 md:pt-6 md:px-6 ${
                user?.showAdPrompt ? "" : "hidden"
              }`}
            >
              <DashboardAdPrompt />
            </div>
            <div className="h-[75%]">{children}</div>
          </section>
        </section>

        {/* footer */}
        <footer
          className={`center ${user?.showAdPrompt ? '' : 'h-full'} z-20 relative w-full bg-accent-foreground h-12 text-white `}
        >
          <p className="sm:text-[15px] text-accent-text text-sm text-center px-4">
            Copyright © 2019 - 2025 | CristalPoint Management. All Right
            Reserved.
          </p>
        </footer>
      </main>
    </AuthGuard>
  );
};

export default DashboardLayout;
