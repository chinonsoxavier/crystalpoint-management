"use client";

import { useAdminSupportStore } from "@/app/admin/(routes)/support/admin_support_store";
import { CardContent } from "@/components/ui/card";
import React, { useEffect } from "react";
interface ITicketStat {
  label: string;
  value: number;
  status: "open" | "in_progress" | "resolved" | "closed" | undefined;
}

const TicketStat = ({ label, value, status }: ITicketStat) => {
  const { fetchTickets, tickets } = useAdminSupportStore();

  useEffect(() => {
    fetchTickets({ page: 1, limit: 100, status: status });
  }, []);

  return (
    <div>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </CardContent>
    </div>
  );
};

export default TicketStat;
