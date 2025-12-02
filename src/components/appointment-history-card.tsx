"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface AppointmentHistoryCardProps {
  status: "completed" | "cancelled" | "pending"
  serviceName: string
  date: string
  time: string
  podologistName: string
}

const statusConfig = {
  completed: { label: "Completada", color: "bg-green-900/30 text-green-400 border border-green-800" },
  cancelled: { label: "Cancelada", color: "bg-red-900/30 text-red-400 border border-red-800" },
  pending: { label: "Pendiente", color: "bg-yellow-900/30 text-yellow-400 border border-yellow-800" },
}

export function AppointmentHistoryCard({
  status,
  serviceName,
  date,
  time,
  podologistName,
}: AppointmentHistoryCardProps) {
  const config = statusConfig[status]

  return (
    <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
      <CardContent className="py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left section */}
          <div className="flex-1">
            {/* Status badge */}
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${config.color}`}>
              {config.label}
            </div>

            {/* Service name */}
            <h4 className="text-lg font-semibold text-white mb-2">{serviceName}</h4>

            {/* Details */}
            <div className="space-y-1">
              <p className="text-sm text-slate-400">
                {date} - {time}
              </p>
              <p className="text-sm text-slate-400">Dr. {podologistName}</p>
            </div>
          </div>

          {/* Right section - Details button */}
          <div className="flex-shrink-0">
            <Button
              variant="outline"
              className="w-full md:w-auto border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              Ver Detalles
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
