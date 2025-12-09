import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import type { Ticket } from "@/app/page"

interface TicketStatsProps {
  tickets: Ticket[]
}

export function TicketStats({ tickets }: TicketStatsProps) {
  const openCount = tickets.filter((t) => t.status === "open").length
  const inProgressCount = tickets.filter((t) => t.status === "in-progress").length
  const resolvedCount = tickets.filter((t) => t.status === "resolved").length

  const stats = [
    { label: "Total Tickets", value: tickets.length, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { label: "Open", value: openCount, color: "bg-red-500/10 text-red-600 dark:text-red-400" },
    { label: "In Progress", value: inProgressCount, color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
    { label: "Resolved", value: resolvedCount, color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-3">
            <CardDescription className="text-sm">{stat.label}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${stat.color} rounded-lg py-2 px-4 w-fit`}>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
