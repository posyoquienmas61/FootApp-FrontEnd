"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Calendar, Clock, Bell, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Notificaciones() {
  const { isAuthenticated, notifications, markNotificationAsRead } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "cita":
        return <Calendar className="size-5 text-purple-400" />
      case "recordatorio":
        return <Clock className="size-5 text-amber-400" />
      default:
        return <Bell className="size-5 text-slate-400" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) return `hace ${diffMins} min`
    if (diffHours < 24) return `hace ${diffHours}h`
    return `hace ${diffDays}d`
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Notificaciones</h1>
          <p className="text-slate-400">Recordatorios de citas y promociones</p>
        </div>

        <div className="space-y-4 max-w-2xl">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "bg-slate-900 border border-slate-800 rounded-lg p-6 flex items-start gap-4 transition-all",
                  !notification.read && "border-purple-600/50 bg-slate-900/50",
                )}
              >
                <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1">{notification.title}</h3>
                  <p className="text-slate-400 mb-2">{notification.message}</p>
                  <span className="text-xs text-slate-500">{formatTimeAgo(notification.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markNotificationAsRead(notification.id)}
                      className="text-purple-400 hover:text-purple-300 hover:bg-slate-800"
                    >
                      Marcar como leída
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400 hover:bg-slate-800">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-12 text-center">
              <Bell className="size-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No tienes notificaciones</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
