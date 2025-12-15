"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {  useAdminSupportStore } from "./admin_support_store";
import SupportTable from "@/components/admin/support/support_table";


export default function SupportPage() {
  const {  fetchSupportStats,openTickets,closedTickets,inProgressTickets,resolvedTickets } = useAdminSupportStore();


  useEffect(() => {
  fetchSupportStats();
  }, [])
  

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support Tickets</h1>
        <p className="text-muted-foreground mt-1">
          Manage user support requests and issues
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Open Tickets</p>
            <p className="text-2xl font-bold mt-2">{openTickets}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold mt-2">{inProgressTickets}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Resolved</p>
            <p className="text-2xl font-bold mt-2">{resolvedTickets}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Closed</p>
            <p className="text-2xl font-bold mt-2">{closedTickets}</p>
          </CardContent>
        </Card>
      </div>

      <SupportTable />
    </div>
  );
}
