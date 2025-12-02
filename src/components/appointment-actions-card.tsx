"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AppointmentDetail {
  id: string
  time: string
  clientName: string
  status: "upcoming" | "in-progress" | "completed"
  service: string
  notes?: string
}

export function AppointmentActionsCard({
  appointment,
}: {
  appointment: AppointmentDetail | null
}) {
  const [showNotes, setShowNotes] = useState(false)

  if (!appointment) {
    return (
      <Card className="bg-slate-900 border-slate-800 h-full flex items-center justify-center">
        <CardContent className="text-center text-slate-400">
          <p>Selecciona una cita para ver detalles</p>
        </CardContent>
      </Card>
    )
  }

  const defaultNotes =
    "Experiencing persistent pain in the left heel, especially in the morning. It's been ongoing for about 2 weeks."

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Gestión de citas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Appointment Details */}
        <div>
          <h3 className="text-slate-300 text-sm font-semibold mb-3">
            Details for appointment with {appointment.clientName} at {appointment.time}.
          </h3>
        </div>

        {/* Client Info */}
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider">Client Name</label>
            <p className="text-white font-semibold">{appointment.clientName}</p>
          </div>

          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider">Service</label>
            <p className="text-white font-semibold">{appointment.service}</p>
          </div>
        </div>

        {/* Client Notes */}
        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wider block mb-3">Client Notes</label>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-slate-300 text-sm leading-relaxed">{defaultNotes}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">Mark as Completed</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Reschedule
          </Button>
          <Button variant="destructive" className="flex-1">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
