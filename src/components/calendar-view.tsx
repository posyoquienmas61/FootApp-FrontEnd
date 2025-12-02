"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Dot } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  hasAvailable: boolean
  hasBooked: boolean
  isSelected: boolean
}

interface CalendarViewProps {
  viewType: "monthly" | "weekly"
  onDateSelect: (date: Date) => void
}

export function CalendarView({ viewType, onDateSelect }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 15)) // October 15, 2024

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthlyCalendar = (): CalendarDay[] => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const previousMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
    const days: CalendarDay[] = []

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: previousMonthDays - i,
        isCurrentMonth: false,
        hasAvailable: false,
        hasBooked: false,
        isSelected: false,
      })
    }

    // Current month days
    const availableDates = [3, 4, 11, 18, 25] // Example available dates
    const bookedDates = [15, 22, 29] // Example booked dates

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        hasAvailable: availableDates.includes(i),
        hasBooked: bookedDates.includes(i),
        isSelected: i === 15,
      })
    }

    // Next month days
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        hasAvailable: false,
        hasBooked: false,
        isSelected: false,
      })
    }

    return days
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const monthName = currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })
  const days = monthlyCalendar()
  const calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <ChevronLeft className="size-5 text-slate-300" />
          </button>
          <h2 className="text-2xl font-bold text-white capitalize">{monthName}</h2>
          <button onClick={handleNextMonth} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <ChevronRight className="size-5 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-2">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {calendarDays.map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-slate-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar dates */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => (
            <div
              key={idx}
              className={cn(
                "aspect-square flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer relative",
                day.isCurrentMonth ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-900",
                day.isSelected && "border-2 border-purple-500 bg-purple-900/20",
                day.isCurrentMonth ? "text-white" : "text-slate-600",
              )}
              onClick={() => {
                if (day.isCurrentMonth) {
                  onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.date))
                }
              }}
            >
              <span>{day.date}</span>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                {day.hasAvailable && <Dot className="size-3 fill-purple-400 text-purple-400" />}
                {day.hasBooked && <Dot className="size-3 fill-purple-600 text-purple-600" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
