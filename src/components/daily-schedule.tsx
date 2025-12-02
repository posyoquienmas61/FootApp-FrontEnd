"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ScheduleAppointment {
  id: string
  time: string
  clientName: string
  status: "upcoming" | "in-progress" | "completed"
  service: string
}

const mockAppointments: ScheduleAppointment[] = [
  {
    id: "1",
    time: "09:00 AM",
    clientName: "Maria Rodriguez",
    status: "upcoming",
    service: "General Consultation",
  },
  {
    id: "2",
    time: "10:00 AM",
    clientName: "Carlos Gomez",
    status: "in-progress",
    service: "Podiatric Care",
  },
  {
    id: "3",
    time: "11:00 AM",
    clientName: "Sofia Fernandez",
    status: "completed",
    service: "Foot Analysis",
  },
]

export function DailySchedule({ onSelectAppointment }: { onSelectAppointment: (apt: ScheduleAppointment) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 5))

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <AlertCircle className="h-5 w-5 text-purple-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-green-500" />
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-slate-400" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Próxima"
      case "in-progress":
        return "En curso"
      case "completed":
        return "Completada"
      default:
        return status
    }
  }

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span>Agenda diaria</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-semibold text-slate-400 min-w-32 text-center">
              {currentDate.toLocaleString("es-ES", { month: "long", year: "numeric" })}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mini Calendar */}
        <div className="mb-6 p-4 bg-slate-800 rounded-lg">
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400 mb-2">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <button
                key={i}
                className={`text-xs p-2 rounded ${
                  i === 4 ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:bg-slate-700"
                }`}
              >
                {i > 0 && i <= 31 ? i : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {mockAppointments.map((apt) => (
            <button
              key={apt.id}
              onClick={() => onSelectAppointment(apt)}
              className="w-full text-left p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getStatusIcon(apt.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{apt.time}</div>
                  <div className="text-sm text-slate-300">{apt.clientName}</div>
                  <div className="text-xs text-slate-500 mt-1">{getStatusLabel(apt.status)}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
