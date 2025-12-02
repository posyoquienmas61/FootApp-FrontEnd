"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Edit2, X } from "lucide-react"
import { AppointmentDetailModal } from "./appointment-detail-modal"

export interface Appointment {
  id: number
  client: string
  podiatrist: string
  service: string
  dateTime: string
  status: "confirmed" | "pending" | "cancelled"
}

interface AppointmentsTableProps {
  appointments: Appointment[]
  onEdit?: (appointment: Appointment) => void
  onCancel?: (appointmentId: number) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "text-green-400 bg-green-950 border border-green-700"
    case "pending":
      return "text-orange-400 bg-orange-950 border border-orange-700"
    case "cancelled":
      return "text-red-400 bg-red-950 border border-red-700"
    default:
      return "text-gray-400"
  }
}

export function AppointmentsTable({ appointments, onEdit, onCancel }: AppointmentsTableProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailOpen(true)
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-slate-800 border-slate-700">
            <TableRow className="hover:bg-slate-800 border-slate-700">
              <TableHead className="text-slate-300 font-semibold uppercase tracking-wider">Client</TableHead>
              <TableHead className="text-slate-300 font-semibold uppercase tracking-wider">Podiatrist</TableHead>
              <TableHead className="text-slate-300 font-semibold uppercase tracking-wider">Service</TableHead>
              <TableHead className="text-slate-300 font-semibold uppercase tracking-wider">Date & Time</TableHead>
              <TableHead className="text-slate-300 font-semibold uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-slate-300 font-semibold uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id} className="border-slate-700 hover:bg-slate-800/50">
                <TableCell className="text-white font-medium">{appointment.client}</TableCell>
                <TableCell className="text-slate-300">{appointment.podiatrist}</TableCell>
                <TableCell className="text-slate-300">{appointment.service}</TableCell>
                <TableCell className="text-slate-300">{appointment.dateTime}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}
                  >
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleViewDetails(appointment)}
                      className="text-slate-400 hover:text-blue-400 hover:bg-blue-950/20"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit?.(appointment)}
                      className="text-slate-400 hover:text-purple-400 hover:bg-purple-950/20"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onCancel?.(appointment.id)}
                      className="text-slate-400 hover:text-red-400 hover:bg-red-950/20"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedAppointment && (
        <AppointmentDetailModal appointment={selectedAppointment} open={isDetailOpen} onOpenChange={setIsDetailOpen} />
      )}
    </>
  )
}
