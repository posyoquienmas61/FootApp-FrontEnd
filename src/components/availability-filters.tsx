"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AvailabilityFiltersProps {
  onPodologistChange: (value: string) => void
  onServiceChange: (value: string) => void
}

export function AvailabilityFilters({ onPodologistChange, onServiceChange }: AvailabilityFiltersProps) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Podologist Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Podiatrist</label>
          <Select defaultValue="dr-emily-carter" onValueChange={onPodologistChange}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Select podologist" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="dr-emily-carter">Dr. Emily Carter</SelectItem>
              <SelectItem value="dr-john-smith">Dr. John Smith</SelectItem>
              <SelectItem value="dr-maria-garcia">Dr. Maria Garcia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Service Type Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Service Type</label>
          <Select defaultValue="all-services" onValueChange={onServiceChange}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all-services">All Services</SelectItem>
              <SelectItem value="general-consultation">General Consultation</SelectItem>
              <SelectItem value="sports-podiatry">Sports Podiatry</SelectItem>
              <SelectItem value="diabetic-care">Diabetic Care</SelectItem>
              <SelectItem value="nail-treatment">Nail Treatment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Legend */}
        <div className="border-t border-slate-700 pt-4 mt-4">
          <h3 className="text-sm font-semibold text-white mb-3">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full border-2 border-purple-400"></div>
              <span className="text-sm text-slate-300">Selected Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-purple-400"></div>
              <span className="text-sm text-slate-300">Available Slots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-purple-600"></div>
              <span className="text-sm text-slate-300">Booked Appointment</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
