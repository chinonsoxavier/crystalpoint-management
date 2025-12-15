"use client";
import React from "react";
import AdminSidemenu from "./admin_sidemenu";
import AdminHeader from "./admin_header";
import { AdminAuthGuard } from "../admin_auth_guard";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminAuthGuard >
      <main className={`relative bg-accent overflow-hidden`}>
        <AdminHeader />
        <section className="flex h-[calc(100dvh-80px)] w-full">
          <aside className="">
            <AdminSidemenu />
          </aside>
          <section className="w-full md:p-6 p-4 mb-5 overflow-y-auto">
            {children}
          </section>
        </section>
      </main>
    </AdminAuthGuard>
  );
};

export default AdminLayout;
