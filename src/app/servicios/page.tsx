"use client"

import { useAuth } from "@/lib/auth-context"
import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Servicios() {
  const { isAuthenticated } = useAuth()

  const services = [
    {
      id: 1,
      name: "Consulta General",
      description: "Evaluación completa de los pies y diagnóstico",
      price: "$50",
      duration: "30 min",
      features: ["Evaluación visual", "Palpación", "Diagnóstico inicial"],
    },
    {
      id: 2,
      name: "Limpieza Profunda",
      description: "Limpieza y desinfección de uñas y piel",
      price: "$75",
      duration: "45 min",
      features: ["Limpieza de uñas", "Exfoliación", "Hidratación"],
    },
    {
      id: 3,
      name: "Tratamiento de Hongos",
      description: "Tratamiento especializado para infecciones fúngicas",
      price: "$120",
      duration: "60 min",
      features: ["Diagnóstico", "Tratamiento", "Plan de seguimiento"],
    },
    {
      id: 4,
      name: "Corrección de Uñas Encarnadas",
      description: "Procedimiento para uñas encarnadas",
      price: "$100",
      duration: "45 min",
      features: ["Evaluación", "Procedimiento", "Cuidados post-tratamiento"],
    },
    {
      id: 5,
      name: "Masaje Terapéutico",
      description: "Masaje relajante y terapéutico de pies",
      price: "$80",
      duration: "60 min",
      features: ["Masaje completo", "Reflexología", "Relajación total"],
    },
    {
      id: 6,
      name: "Tratamiento de Callos y Durezas",
      description: "Remoción segura de callos y durezas",
      price: "$65",
      duration: "40 min",
      features: ["Exfoliación", "Remoción de callos", "Suavizado"],
    },
  ]

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Nuestros Servicios</h1>
          <p className="text-slate-400">Catálogo completo de servicios podológicos con precios</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-slate-800 flex-1">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-purple-400">{service.price}</span>
                  <span className="text-slate-400 text-sm">/ sesión</span>
                </div>
                <span className="text-slate-500 text-sm">{service.duration}</span>
              </div>

              <div className="mb-6">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="size-4 text-purple-400 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {isAuthenticated ? (
                <Link href="/mis-citas/reservar" className="w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Reservar servicio</Button>
                </Link>
              ) : (
                <Link href="/login" className="w-full">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Iniciar sesión para reservar
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
