// components/SupportSidebar.tsx
import { Button } from "@/components/ui/button";
import TicketType from "@/components/user/support/ticket_type";
import { Dispatch, SetStateAction } from "react";

interface SupportSidebarProps {
  activeSection: "messages" | "compose";
  setActiveSection:Dispatch<SetStateAction<"messages" | "compose">>;
}

export default function SupportSidebar({
  activeSection,
  setActiveSection,
}: SupportSidebarProps) {
  return (
    <div>
      <Button
        onClick={() => setActiveSection("compose")}
        className="w-full mb-3 text-white"
      >
        Create Ticket
      </Button>
      <TicketType setActiveTabs={setActiveSection} />
    </div>
  );
}
