"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { DollarSign, Clock, Users, Edit2, Trash2, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminServicios() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || user?.role !== "admin") {
    redirect("/login")
  }

  const servicios = [
    {
      id: 1,
      name: "Consulta General",
      description: "Evaluación y consulta podológica",
      price: "$30",
      duration: "30 min",
      demand: "Alta",
    },
    {
      id: 2,
      name: "Pedicura Médica",
      description: "Pedicura con fines terapéuticos",
      price: "$50",
      duration: "45 min",
      demand: "Alta",
    },
    {
      id: 3,
      name: "Tratamiento de Hongos",
      description: "Tratamiento especializado de onicomicosis",
      price: "$60",
      duration: "60 min",
      demand: "Media",
    },
    {
      id: 4,
      name: "Plantillas Personalizadas",
      description: "Confección de plantillas a medida",
      price: "$80",
      duration: "90 min",
      demand: "Media",
    },
  ]

  return (
    <main className="min-h-screen pt-20 pb-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Servicios</h1>
          <p className="text-slate-400">Administra los servicios ofrecidos en el consultorio</p>
        </div>

        <div className="flex justify-end mb-6">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 size-4" /> Nuevo servicio
          </Button>
        </div>

        <div className="grid gap-4">
          {servicios.map((servicio) => (
            <Card key={servicio.id} className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{servicio.name}</h3>
                    <p className="text-slate-400 text-sm mb-3">{servicio.description}</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <DollarSign className="size-4 text-green-400" />
                        {servicio.price}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Clock className="size-4 text-blue-400" />
                        {servicio.duration}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Users className="size-4 text-purple-400" />
                        Demanda: {servicio.demand}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-slate-600 bg-transparent">
                      <Edit2 className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      <Trash2 className="size-4" />
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
