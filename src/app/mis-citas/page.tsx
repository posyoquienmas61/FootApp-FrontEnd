"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Calendar, Clock, MapPin, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MisCitas() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const upcomingAppointments = [
    {
      id: "1",
      date: "15 de diciembre, 2024",
      time: "10:00 AM",
      service: "Limpieza de pies",
      location: "Clínica principal",
      status: "confirmada",
    },
    {
      id: "2",
      date: "22 de diciembre, 2024",
      time: "2:00 PM",
      service: "Tratamiento de hongos",
      location: "Clínica principal",
      status: "confirmada",
    },
  ]

  const pastAppointments = [
    {
      id: "3",
      date: "1 de diciembre, 2024",
      time: "9:00 AM",
      service: "Revisión general",
      location: "Clínica principal",
      status: "completada",
    },
  ]

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Mis Citas</h1>
            <p className="text-slate-400">Gestiona tu historial y próximas citas</p>
          </div>
          <Link href="/mis-citas/reservar">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="mr-2 size-4" />
              Reservar cita
            </Button>
          </Link>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Próximas citas</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-3">{apt.service}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="size-4" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="size-4" />
                        <span>{apt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin className="size-4" />
                        <span>{apt.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-medium">
                      {apt.status}
                    </span>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-200 hover:bg-slate-800 bg-transparent"
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Appointments */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Historial de citas</h2>
          <div className="space-y-4">
            {pastAppointments.map((apt) => (
              <div key={apt.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6 opacity-75">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-3">{apt.service}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="size-4" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="size-4" />
                        <span>{apt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin className="size-4" />
                        <span>{apt.location}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm font-medium">
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
