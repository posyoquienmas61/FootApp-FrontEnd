"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { MetricsCards } from "@/components/metrics-cards"
import { QuickAccessSection } from "@/components/quick-access-section"
import { NotificationsPanel } from "@/components/notifications-panel"
import { ReportsSection } from "@/components/reports-section"

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || user?.role !== "admin") {
    redirect("/login")
  }

  const metrics = [
    { label: "Appointments", value: "1,234", trend: 5.2, trendDirection: "up" as const, unit: "" },
    { label: "Revenue", value: "5,678", trend: 8.1, trendDirection: "up" as const, unit: "$" },
    { label: "Clients", value: "89", trend: 12, trendDirection: "up" as const, unit: "" },
    { label: "Podiatrists", value: "12", trend: 2, trendDirection: "down" as const, unit: "" },
  ]

  return (
    <main className="min-h-screen pt-20 pb-12 px-4 md:px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard Panel</h1>
          <p className="text-slate-400">Welcome, {user?.name}. Manage all aspects of FootApp.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Resumen de métricas clave</h2>
          <MetricsCards metrics={metrics} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <QuickAccessSection />
          </div>
          <div className="lg:col-span-2">
            <NotificationsPanel />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Reportes y análisis</h2>
          <ReportsSection />
        </div>
      </div>
    </main>
  )
}
