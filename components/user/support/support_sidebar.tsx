// components/SupportSidebar.tsx
import { Button } from "@/components/ui/button";
import TicketType from "@/components/user/support/ticket_type";
import { Dispatch, SetStateAction } from "react";
import { useTranslate } from "@/hooks/use_translate";

interface SupportSidebarProps {
  activeSection: "messages" | "compose";
  setActiveSection: Dispatch<SetStateAction<"messages" | "compose">>;
}

export default function SupportSidebar({
  activeSection,
  setActiveSection,
}: SupportSidebarProps) {
  const { t } = useTranslate();

  return (
    <div>
      <Button
        onClick={() => setActiveSection("compose")}
        className="w-full mb-3 text-white"
      >
        {t.admin.support.createTicket}
      </Button>
      <TicketType setActiveTabs={setActiveSection} />
    </div>
  );
}
