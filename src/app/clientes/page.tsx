"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Calendar, FileText } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Clientes() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user?.role !== "podologist") {
      router.push("/dashboard")
    }
  }, [isAuthenticated, user?.role, router])

  if (!isAuthenticated || user?.role !== "podologist") {
    return null
  }

  const clientes = [
    {
      id: 1,
      nombre: "María González",
      email: "maria@example.com",
      telefono: "+34 612 345 678",
      ultimaCita: "10 Dic 2024",
      citasTotal: 5,
      notas: "Alergia a ciertos productos",
    },
    {
      id: 2,
      nombre: "Juan López",
      email: "juan@example.com",
      telefono: "+34 623 456 789",
      ultimaCita: "8 Dic 2024",
      citasTotal: 3,
      notas: "Pie diabético - precaución",
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      email: "ana@example.com",
      telefono: "+34 634 567 890",
      ultimaCita: "5 Dic 2024",
      citasTotal: 8,
      notas: "Cliente frecuente",
    },
    {
      id: 4,
      nombre: "Carlos Ruiz",
      email: "carlos@example.com",
      telefono: "+34 645 678 901",
      ultimaCita: "3 Dic 2024",
      citasTotal: 2,
      notas: "Nuevo cliente",
    },
  ]

  return (
    <main className="pt-32 pb-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Clientes</h1>
            <p className="text-lg text-slate-600">Gestiona tu base de clientes</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">Agregar nuevo cliente</Button>
        </div>

        {/* Clientes List */}
        <div className="grid grid-cols-1 gap-4">
          {clientes.map((cliente) => (
            <Card key={cliente.id} className="border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg mb-3">{cliente.nombre}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="size-4 text-blue-500" />
                        <a href={`mailto:${cliente.email}`} className="hover:text-purple-600">
                          {cliente.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="size-4 text-green-500" />
                        <a href={`tel:${cliente.telefono}`} className="hover:text-purple-600">
                          {cliente.telefono}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="size-4 text-purple-500" />
                        <span>Última cita: {cliente.ultimaCita}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <FileText className="size-4 text-amber-500" />
                        <span>Citas totales: {cliente.citasTotal}</span>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-slate-100 rounded text-sm text-slate-700">
                      <strong>Notas:</strong> {cliente.notas}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="border-slate-300 bg-transparent">
                      Ver historial
                    </Button>
                    <Button variant="outline" className="border-slate-300 bg-transparent">
                      Editar
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
