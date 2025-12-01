"use client";
import React from "react";
import DashboardHeader from "./dashboard_header";
import DashboardSidemenu from "./dashboard_sidemenu";
import useUserStore from "@/app/user/user_store";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const {user} = useUserStore();
  //   const menuOpen = useStore((state: any) => state.menuOpen);

  return (
    <main className={`relative bg-accent overflow-hidden`}>
      {/* header */}
      <DashboardHeader />
      <section className="flex h-[calc(100dvh-80px-48px)] w-full">
        <aside className="">
          <DashboardSidemenu totalDeposit={user?.balance?.deposit ??0} />
        </aside>
        <section className="w-full overflow-y-auto">{children}</section>
      </section>

      {/* footer */}
      <footer className="center z-20 relative w-full bg-accent-foreground h-12 text-white ">
        <p className="sm:text-[15px] text-accent-text text-sm text-center px-4">
          Copyright © 2019 - 2025 | CrystalPoint Management. All Right Reserved.
        </p>
      </footer>
    </main>
  );
};

export default DashboardLayout;
