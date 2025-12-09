"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Clock, AlertCircle } from "lucide-react"

interface Stats {
  total_tickets: number
  open_tickets: number
  response_time: string
}

interface SupportStatsProps {
  className?: string
}

export function SupportStats({ className }: SupportStatsProps) {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/support/stats")
        const data = await response.json()
        setStats(data.data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return null
  }

  if (!stats) {
    return null
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tickets</p>
              <p className="text-2xl font-bold">{stats.total_tickets}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-primary/50" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Open Tickets</p>
              <p className="text-2xl font-bold">{stats.open_tickets}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-amber-500/50" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
              <p className="text-2xl font-bold">{stats.response_time}</p>
            </div>
            <Clock className="w-8 h-8 text-green-500/50" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
