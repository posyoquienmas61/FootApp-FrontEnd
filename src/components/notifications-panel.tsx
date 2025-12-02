"use client"

import { Bell, CheckCircle, AlertCircle, XCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: "appointment" | "client" | "pending" | "cancelled"
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "New appointment confirmed",
    description: "With Dr. Smith at 2:00 PM",
    time: "2 minutes ago",
    type: "appointment",
  },
  {
    id: "2",
    title: "New client request",
    description: "Mark Johnson has registered.",
    time: "15 minutes ago",
    type: "client",
  },
  {
    id: "3",
    title: "Appointment pending approval",
    description: "Client: Sarah Lee",
    time: "1 hour ago",
    type: "pending",
  },
  {
    id: "4",
    title: "Appointment cancelled",
    description: "By client: Alex Ray",
    time: "3 hours ago",
    type: "cancelled",
  },
]

function getNotificationIcon(type: string) {
  switch (type) {
    case "appointment":
      return <CheckCircle className="size-4 text-purple-500" />
    case "client":
      return <Info className="size-4 text-blue-500" />
    case "pending":
      return <AlertCircle className="size-4 text-yellow-500" />
    case "cancelled":
      return <XCircle className="size-4 text-red-500" />
    default:
      return <Bell className="size-4 text-slate-500" />
  }
}

export function NotificationsPanel() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bell className="size-5" />
          Notificaciones y alertas
        </CardTitle>
        <CardDescription>Recent system alerts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex gap-3 pb-4 border-b border-slate-700 last:border-0 last:pb-0">
            <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-100">{notification.title}</p>
              <p className="text-sm text-slate-400 mt-1">{notification.description}</p>
              <p className="text-xs text-slate-500 mt-2">{notification.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
