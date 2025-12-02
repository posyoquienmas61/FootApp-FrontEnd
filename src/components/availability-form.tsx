"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AvailabilityFormProps {
  selectedDate: Date
  onSubmit: (data: any) => void
}

export function AvailabilityForm({ selectedDate, onSubmit }: AvailabilityFormProps) {
  const [date, setDate] = useState(selectedDate.toISOString().split("T")[0])
  const [fromTime, setFromTime] = useState("09:00")
  const [toTime, setToTime] = useState("17:00")
  const [recurring, setRecurring] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ date, fromTime, toTime, recurring })
  }

  const handleClear = () => {
    setDate(selectedDate.toISOString().split("T")[0])
    setFromTime("09:00")
    setToTime("17:00")
    setRecurring(false)
  }

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Manage Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">From</label>
              <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">To</label>
              <input
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Recurring Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-300">Recurring Weekly</label>
            <Switch checked={recurring} onCheckedChange={setRecurring} />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold">
              Add Availability
            </Button>
            <Button
              type="button"
              onClick={handleClear}
              variant="outline"
              className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
            >
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
