"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, User, Stethoscope, Filter } from "lucide-react"

interface AppointmentFiltersProps {
  onFilterChange: (filters: AppointmentFilters) => void
}

export interface AppointmentFilters {
  date?: string
  podologist?: string
  service?: string
  status?: string
}

export function AppointmentFilters({ onFilterChange }: AppointmentFiltersProps) {
  const [filters, setFilters] = useState<AppointmentFilters>({})

  const handleFilterChange = (key: keyof AppointmentFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    setFilters({})
    onFilterChange({})
  }

  return (
    <div className="mb-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-semibold text-white">Filter Appointments</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-300 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date
          </label>
          <Input
            type="date"
            value={filters.date || ""}
            onChange={(e) => handleFilterChange("date", e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>

        {/* Podologist Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-300 flex items-center gap-2">
            <User className="w-4 h-4" />
            Podiatrist
          </label>
          <Select
            value={filters.podologist || "all"}
            onValueChange={(value) => handleFilterChange("podologist", value)}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="All Podiatrists" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Podiatrists</SelectItem>
              <SelectItem value="dr-eleanor">Dr. Eleanor Vance</SelectItem>
              <SelectItem value="dr-marcus">Dr. Marcus Thorne</SelectItem>
              <SelectItem value="dr-sofia">Dr. Sofia Rossi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Service Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-300 flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            Service
          </label>
          <Select value={filters.service || "all"} onValueChange={(value) => handleFilterChange("service", value)}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="routine">Routine Check-up</SelectItem>
              <SelectItem value="nail-surgery">Nail Surgery</SelectItem>
              <SelectItem value="gait-analysis">Gait Analysis</SelectItem>
              <SelectItem value="orthotics">Orthotics Fitting</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-slate-300">Status</label>
          <Select value={filters.status || "all"} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleReset} variant="outline" className="mt-4 border-slate-600 text-slate-300 bg-transparent">
        Clear Filters
      </Button>
    </div>
  )
}
