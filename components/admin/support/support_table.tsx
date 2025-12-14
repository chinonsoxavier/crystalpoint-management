import { useAdminSupportStore } from "@/app/admin/(routes)/support/admin_support_store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utility/format_date";
import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";
import { useEffect, useState } from "react";
import SupportDialog from "./support_dialog";
  type IStatus = "open" | "in_progress" | "resolved" | "closed";
  type IPriority = "low" | "medium" | "high" | "urgent";


const SupportTable = () => {
    const {fetchTickets,tickets,fetchSupportStats} = useAdminSupportStore();
    const [page,setPage]=useState(1);
      const [selectedTicket, setSelectedTicket] = useState<(typeof tickets)[0] | null>(null)
      const [showTicketModal, setShowTicketModal] = useState(false);
        const [statusFilter, setStatusFilter] = useState<
          "open" | "in_progress" | "resolved" | "closed"
        >("open");
        const [priorityFilter, setPriorityFilter] = useState<
          "low" | "medium" | "high" | "urgent"
        >("low");
  const [search, setSearch] = useState("");

    
      const filteredTickets = tickets.filter(
        (ticket) =>
          (ticket.subject.toLowerCase().includes(search.toLowerCase())) &&
          (statusFilter === "open" || ticket.status === statusFilter) &&
          (priorityFilter === "low" || ticket.priority === priorityFilter),
      )

        const handleStatusFilterChange = (value: string) => {
    // Type assertion to ensure the value is of the correct type
    setStatusFilter(value as IStatus);
  };

  const handlePriorityFilterChange = (value: string) => {
    // Type assertion to ensure the value is of the correct type
    setPriorityFilter(value as IPriority);
  };

    useEffect(() => {
      fetchSupportStats();
      fetchTickets({ page: page, limit: 100, status: statusFilter });
    }, [page]);

    
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>
            View and manage customer support tickets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search tickets by subject or username..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={priorityFilter}
              onValueChange={handlePriorityFilterChange}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  {/* <TableHead>User</TableHead> */}
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket,index) => (
                  <TableRow key={index}>
               
                    <TableCell className="max-w-xs block w-28 truncate">
                      {ticket.subject}
                    </TableCell>
                    {/* <TableCell>{ticket.username}</TableCell> */}
                    <TableCell>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                    <TableCell>
                        <SupportDialog ticket={ticket} selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket}  />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTickets.length} tickets
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={()=>{setPage(page - 1)}} size="sm" disabled={page < 2}>
                <ChevronLeft size={16} />
              </Button>
              <Button onClick={()=>setPage(page + 1)} variant="outline" size="sm">
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SupportTable