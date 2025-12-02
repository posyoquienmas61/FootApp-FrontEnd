"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { BarChart, Download, Filter, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminReportes() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || user?.role !== "admin") {
    redirect("/login")
  }

  const reports = [
    {
      id: 1,
      title: "Ingresos mensuales",
      description: "Resumen de ingresos por servicios",
      date: "Actualizado hace 2 horas",
      trend: "+12% respecto al mes anterior",
    },
    {
      id: 2,
      title: "Ocupación de horarios",
      description: "Disponibilidad de citas y ocupación",
      date: "Actualizado hace 4 horas",
      trend: "92% ocupado",
    },
    {
      id: 3,
      title: "Satisfacción de clientes",
      description: "Calificaciones y reseñas promedio",
      date: "Actualizado hace 1 día",
      trend: "4.8/5.0 estrellas",
    },
    {
      id: 4,
      title: "Servicios más demandados",
      description: "Análisis de servicios por popularidad",
      date: "Actualizado hace 6 horas",
      trend: "Consulta General lidera",
    },
  ]

  return (
    <main className="min-h-screen pt-20 pb-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reportes y Análisis</h1>
          <p className="text-slate-400">Visualiza estadísticas y análisis del consultorio</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
            <Filter className="mr-2 size-4" /> Filtrar por fecha
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="mr-2 size-4" /> Descargar reporte
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <Card
              key={report.id}
              className="bg-slate-800 border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white">{report.title}</CardTitle>
                    <p className="text-slate-400 text-sm mt-1">{report.description}</p>
                  </div>
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    {report.id === 1 && <TrendingUp className="size-5 text-purple-400" />}
                    {report.id === 2 && <BarChart className="size-5 text-purple-400" />}
                    {report.id === 3 && <TrendingUp className="size-5 text-purple-400" />}
                    {report.id === 4 && <BarChart className="size-5 text-purple-400" />}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-xs text-slate-500">{report.date}</p>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-sm text-green-400 font-semibold">{report.trend}</p>
                  </div>
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 bg-transparent">
                    Ver reporte completo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
