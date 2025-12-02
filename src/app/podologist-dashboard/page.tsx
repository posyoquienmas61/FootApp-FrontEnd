"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { DailySchedule } from "@/components/daily-schedule"
import { AppointmentActionsCard } from "@/components/appointment-actions-card"
import { PodologistProfileSection } from "@/components/podologist-profile-section"

interface ScheduleAppointment {
  id: string
  time: string
  clientName: string
  status: "upcoming" | "in-progress" | "completed"
  service: string
}

export default function PodologistDashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [selectedAppointment, setSelectedAppointment] = useState<ScheduleAppointment | null>(null)

  useEffect(() => {
    if (isAuthenticated && user?.role !== "podologist") {
      router.push("/dashboard")
    }
  }, [isAuthenticated, user?.role, router])

  if (!isAuthenticated || user?.role !== "podologist") {
    return null
  }

  return (
    <main className="pt-32 pb-16 px-4 md:px-6 lg:px-8 bg-slate-950 min-h-screen">
      <div className="container mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard Podologist Panel</h1>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Daily Schedule */}
          <div className="lg:col-span-1">
            <DailySchedule onSelectAppointment={setSelectedAppointment} />
          </div>

          {/* Middle Column - Appointment Management */}
          <div className="lg:col-span-1">
            <AppointmentActionsCard appointment={selectedAppointment} />
          </div>

          {/* Right Column - Profile Section */}
          <div className="lg:col-span-1">
            <PodologistProfileSection
              profile={{
                name: user?.name || "Dr. Alan Grant",
                email: user?.email || "alan.grant@footapp.com",
                specialty: "Podiatrista",
              }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
