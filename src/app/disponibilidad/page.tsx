"use client"

import { useState } from "react"
import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CalendarView } from "@/components/calendar-view"
import { AvailabilityForm } from "@/components/availability-form"
import { AvailabilityFilters } from "@/components/availability-filters"

export default function Disponibilidad() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [viewType, setViewType] = useState<"monthly" | "weekly">("monthly")
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 9, 15))
  const [podologist, setPodologist] = useState("dr-emily-carter")
  const [service, setService] = useState("all-services")

  useEffect(() => {
    if (isAuthenticated && user?.role !== "podologist") {
      router.push("/dashboard")
    }
  }, [isAuthenticated, user?.role, router])

  if (!isAuthenticated || user?.role !== "podologist") {
    return null
  }

  const handleAddAvailability = (data: any) => {
    console.log("[v0] Adding availability:", data)
    // Handle submission logic here
  }

  return (
    <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8 bg-slate-950 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Schedule Availability</h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setViewType("monthly")}
              variant={viewType === "monthly" ? "default" : "outline"}
              className={
                viewType === "monthly"
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "border-slate-700 text-slate-300 hover:bg-slate-800"
              }
            >
              Monthly View
            </Button>
            <Button
              onClick={() => setViewType("weekly")}
              variant={viewType === "weekly" ? "default" : "outline"}
              className={
                viewType === "weekly"
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "border-slate-700 text-slate-300 hover:bg-slate-800"
              }
            >
              Weekly View
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <CalendarView viewType={viewType} onDateSelect={setSelectedDate} />
          </div>

          {/* Sidebar - Availability Management and Filters */}
          <div className="space-y-6">
            <AvailabilityForm selectedDate={selectedDate} onSubmit={handleAddAvailability} />
            <AvailabilityFilters onPodologistChange={setPodologist} onServiceChange={setService} />
          </div>
        </div>
      </div>
    </main>
  )
}
