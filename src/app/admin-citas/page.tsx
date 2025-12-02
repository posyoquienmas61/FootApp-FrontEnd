"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Calendar, Clock, User, CheckCircle, Stethoscope } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminCitas() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || user?.role !== "admin") {
    redirect("/login")
  }

  const citas = [
    {
      id: 1,
      patient: "Juan López",
      podologist: "Dr. Carlos Martínez",
      date: "2024-12-15",
      time: "10:00 AM",
      service: "Consulta general",
      status: "confirmed",
    },
    {
      id: 2,
      patient: "Ana Rodríguez",
      podologist: "Dra. Sofia García",
      date: "2024-12-15",
      time: "2:00 PM",
      service: "Tratamiento de hongos",
      status: "confirmed",
    },
    {
      id: 3,
      patient: "Carlos Mendez",
      podologist: "Dr. Luis Pérez",
      date: "2024-12-16",
      time: "11:00 AM",
      service: "Pedicura médica",
      status: "pending",
    },
  ]

  return (
    <main className="min-h-screen pt-20 pb-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Citas</h1>
          <p className="text-slate-400">Administra todas las citas del consultorio</p>
        </div>

        <div className="flex justify-between mb-6">
          <div className="flex gap-2">
            <Button className="bg-purple-600 hover:bg-purple-700">Filtrar</Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
              Exportar
            </Button>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">Nueva cita</Button>
        </div>

        <div className="grid gap-4">
          {citas.map((cita) => (
            <Card key={cita.id} className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="size-4 text-purple-400" />
                      <span className="text-white font-semibold">{cita.patient}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Stethoscope className="size-4" />
                      <span className="text-sm">{cita.podologist}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="size-4 text-blue-400" />
                      <span className="text-sm">{cita.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="size-4 text-green-400" />
                      <span className="text-sm">{cita.time}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 text-sm mb-2">{cita.service}</p>
                    <div
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
                        cita.status === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {cita.status === "confirmed" ? <CheckCircle className="size-3" /> : <Clock className="size-3" />}
                      {cita.status === "confirmed" ? "Confirmada" : "Pendiente"}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
