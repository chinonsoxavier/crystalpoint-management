// "use client";
// import { ColumnDef } from "@tanstack/react-table";
// import { Badge } from "@/components/ui/badge";
// import { GenericTable } from "@/components/ui/generic-table";
// import { Ticket } from "@/types/support";
// import { format } from "date-fns";

// const ticketColumns: ColumnDef<Ticket>[] = [
//   {
//     accessorKey: "subject",
//     header: "Subject",
//     cell: ({ row }) => (
//       <div className="font-medium">{row.getValue("subject")}</div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status = row.getValue("status") as string;
//       const variant =
//         {
//           open: "destructive",
//           in_progress: "secondary",
//           resolved: "default",
//           closed: "outline",
//         }[status] || "secondary";
//       return (
//         <Badge variant={variant as any}>
//           {status.replace("_", " ").toUpperCase()}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: "priority",
//     header: "Priority",
//     cell: ({ row }) => {
//       const priority = row.getValue("priority") as string;
//       const variant =
//         {
//           low: "secondary",
//           medium: "default",
//           high: "destructive",
//         }[priority] || "secondary";
//       return <Badge variant={variant as any}>{priority.toUpperCase()}</Badge>;
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Created",
//     cell: ({ row }) => {
//       const date = new Date(row.getValue("createdAt"));
//       return <div>{format(date, "MMM dd, yyyy")}</div>;
//     },
//   },
// ];

// interface TicketsListProps {
//   data: Ticket[];
// }

// export default function TicketsList({ data }: TicketsListProps) {
//   return (
//     <GenericTable
//       columns={ticketColumns}
//       data={data}
//       searchColumn="subject"
//       searchPlaceholder="Search by subject..."
//     />
//   );
// }
