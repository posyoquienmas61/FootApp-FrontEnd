"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { UpcomingAppointmentCard } from "@/components/upcoming-appointment-card"
import { AppointmentHistoryCard } from "@/components/appointment-history-card"

export default function Dashboard() {
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

  const upcomingAppointment = {
    date: "MIÉRCOLES, 25 DE OCTUBRE",
    time: "10:30 AM",
    serviceName: "Consulta de Podología General",
    podologistName: "Dr. Alejandro Vargas",
    description: "Servicio de rutina para el cuidado de los pies.",
    location: "Consultorio Podológico FootApp",
  }

  const appointmentHistory = [
    {
      status: "completed" as const,
      serviceName: "Consulta de Podología Deportiva",
      date: "15 de Septiembre, 2023",
      time: "09:00 AM",
      podologistName: "Sofía Reyes",
    },
    {
      status: "cancelled" as const,
      serviceName: "Tratamiento de Uñas Encarnadas",
      date: "02 de Agosto, 2023",
      time: "11:30 AM",
      podologistName: "Alejandro Vargas",
    },
    {
      status: "completed" as const,
      serviceName: "Consulta de Podología General",
      date: "10 de Julio, 2023",
      time: "03:00 PM",
      podologistName: "Alejandro Vargas",
    },
    {
      status: "completed" as const,
      serviceName: "Análisis de la Marcha",
      date: "05 de Junio, 2023",
      time: "10:00 AM",
      podologistName: "Sofía Reyes",
    },
  ]

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">User Dashboard</h1>
          <p className="text-slate-400">Bienvenido, {user?.name}</p>
        </div>

        {/* Grid layout: responsive mobile-first */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6">Próxima cita</h2>
            <UpcomingAppointmentCard {...upcomingAppointment} />

            {/* Schedule new appointment button */}
            <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white text-base py-6">
              Agendar de nuevo
            </Button>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Historial de citas</h2>
            <div className="space-y-4">
              {appointmentHistory.map((appointment, index) => (
                <AppointmentHistoryCard key={index} {...appointment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
