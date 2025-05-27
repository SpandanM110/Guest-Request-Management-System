"use client"

import { Clock, MessageSquare, Phone, TrendingUp } from "lucide-react"

interface GuestRequest {
  id: number
  guestPhone: string
  requestText: string
  createdAt: string
  status: string
}

interface StatsCardsProps {
  requests: GuestRequest[]
}

export function StatsCards({ requests }: StatsCardsProps) {
  const totalRequests = requests.length
  const pendingRequests = requests.filter((r) => r.status === "pending").length
  const todayRequests = requests.filter((r) => {
    const today = new Date()
    const requestDate = new Date(r.createdAt)
    return requestDate.toDateString() === today.toDateString()
  }).length

  const stats = [
    {
      name: "Total Requests",
      value: totalRequests,
      icon: MessageSquare,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Pending",
      value: pendingRequests,
      icon: Clock,
      color: "bg-amber-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      name: "Today",
      value: todayRequests,
      icon: TrendingUp,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      name: "Unique Guests",
      value: new Set(requests.map((r) => r.guestPhone)).size,
      icon: Phone,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.name}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{stat.name}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
