"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const analyticsData = [
  { month: "Jan", users: 400, deposits: 240, withdrawals: 221 },
  { month: "Feb", users: 300, deposits: 139, withdrawals: 221 },
  { month: "Mar", users: 200, deposits: 9.81, withdrawals: 229 },
  { month: "Apr", users: 278, deposits: 390, withdrawals: 200 },
  { month: "May", users: 189, deposits: 480, withdrawals: 218 },
  { month: "Jun", users: 239, deposits: 380, withdrawals: 250 },
]

const tierDistribution = [
  { name: "Tier 1", value: 45 },
  { name: "Tier 2", value: 35 },
  { name: "Tier 3", value: 20 },
]

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)"]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30d")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Analytics</h1>
        <p className="text-muted-foreground mt-1">Detailed insights into platform performance</p>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {["7d", "30d", "90d", "1y"].map((p) => (
          <Button key={p} variant={period === p ? "default" : "outline"} onClick={() => setPeriod(p)}>
            {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : p === "90d" ? "90 Days" : "1 Year"}
          </Button>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">User Growth</p>
            <p className="text-2xl font-bold mt-2">+2,450</p>
            <p className="text-xs text-green-600 mt-1">+15% vs last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Volume</p>
            <p className="text-2xl font-bold mt-2">$8.2M</p>
            <p className="text-xs text-green-600 mt-1">+8% vs last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Conversion Rate</p>
            <p className="text-2xl font-bold mt-2">34.2%</p>
            <p className="text-xs text-red-600 mt-1">-2% vs last period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
            <CardDescription>Users, deposits, and withdrawals over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="var(--color-chart-1)" />
                <Line type="monotone" dataKey="deposits" stroke="var(--color-chart-2)" />
                <Line type="monotone" dataKey="withdrawals" stroke="var(--color-chart-3)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Tier Distribution</CardTitle>
            <CardDescription>Percentage of users by tier</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tierDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tierDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>Platform revenue by source</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="deposits" stackId="a" fill="var(--color-chart-1)" />
              <Bar dataKey="withdrawals" stackId="a" fill="var(--color-chart-2)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
