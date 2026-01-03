// app/support/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSupportStore } from "./_support";
import SupportHeader from "@/components/user/support/support_header";
import SupportContent from "@/components/user/support/support_content";
import SupportSidebar from "@/components/user/support/support_sidebar";
import CreateTicketForm from "@/components/user/support/create_ticket_form";
import TicketDetails from "@/components/user/support/ticket_detail";
import SupportEmptyState from "@/components/user/support/support_empty_state";
import TicketList from "@/components/user/support/ticket_list";
import { useTranslate } from "@/hooks/use_translate";

export default function Page() {
  const {
    tickets,
    activeTab,
    fetchTickets,
    fetchStats,
    setActiveTab,
    showTicketDetails,
    setShowTicketDetails,
  } = useSupportStore();

  const [activeSection, setActiveSection] = useState<"messages" | "compose">(
    "messages"
  );
  const { t } = useTranslate();

  useEffect(() => {
    fetchTickets({ status: activeTab, page: 1, limit: 100 });
  }, [activeTab, fetchTickets]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="h-full space-y-6 p-4 md:p-6 bg-accent">
      <SupportHeader />

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <SupportSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            <div className="lg:col-span-3">
              <SupportContent
                activeSection={activeSection}
                showTicketDetails={showTicketDetails}
                setShowTicketDetails={setShowTicketDetails}
              >
                {activeSection === "compose" ? (
                  <CreateTicketForm />
                ) : showTicketDetails ? (
                  <TicketDetails setShowTicketDetails={setShowTicketDetails} />
                ) : tickets.length < 1 ? (
                  <SupportEmptyState activeTab={activeTab} />
                ) : (
                  <TicketList />
                )}
              </SupportContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
