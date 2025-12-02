"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Appointment } from "./appointments-table"
import { Calendar, User, Stethoscope } from "lucide-react"

interface AppointmentDetailModalProps {
  appointment: Appointment
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AppointmentDetailModal({ appointment, open, onOpenChange }: AppointmentDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Appointment Details</DialogTitle>
          <DialogDescription className="text-slate-400">Review full appointment information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <User className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-slate-400">Client</p>
                <p className="text-white font-semibold">{appointment.client}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <User className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-slate-400">Podiatrist</p>
                <p className="text-white font-semibold">{appointment.podiatrist}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <Stethoscope className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-slate-400">Service</p>
                <p className="text-white font-semibold">{appointment.service}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <Calendar className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-slate-400">Date & Time</p>
                <p className="text-white font-semibold">{appointment.dateTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <span className="text-sm text-slate-400">Status</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  appointment.status === "confirmed"
                    ? "text-green-400 bg-green-950 border border-green-700"
                    : appointment.status === "pending"
                      ? "text-orange-400 bg-orange-950 border border-orange-700"
                      : "text-red-400 bg-red-950 border border-red-700"
                }`}
              >
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-slate-700">
            <Button
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">Edit Appointment</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
