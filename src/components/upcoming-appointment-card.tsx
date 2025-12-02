"use client"

import { Clock, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface UpcomingAppointmentProps {
  date: string
  time: string
  serviceName: string
  podologistName: string
  description: string
  location?: string
}

export function UpcomingAppointmentCard({
  date,
  time,
  serviceName,
  podologistName,
  description,
  location = "Consultorio Podológico FootApp",
}: UpcomingAppointmentProps) {
  return (
    <Card className="bg-slate-900 border-slate-800 overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-purple-600/40 via-purple-900/20 to-slate-900 relative">
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2245%22 fill=%22none%22 stroke=%22%23a855f7%22 strokeWidth=%220.5%22/></svg>')]" />
      </div>

      <CardContent className="pt-6 pb-6">
        {/* Clock indicator */}
        <div className="flex items-center gap-2 mb-6 text-purple-400">
          <Clock className="size-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            {date} A LAS {time}
          </span>
        </div>

        {/* Service name */}
        <h3 className="text-2xl font-bold text-white mb-4">{serviceName}</h3>

        {/* Podologist */}
        <div className="flex items-center gap-2 mb-3 text-slate-300">
          <User className="size-4" />
          <span className="text-sm">{podologistName}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4 text-slate-300">
          <MapPin className="size-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">{description}</p>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white flex-1">Modificar</Button>
          <Button
            variant="outline"
            className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            Detalles
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
