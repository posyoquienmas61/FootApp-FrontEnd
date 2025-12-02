"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { Mail, Phone, Calendar, Star, MoreVertical } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminPodologos() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || user?.role !== "admin") {
    redirect("/login")
  }

  const podologists = [
    {
      id: 1,
      name: "Dr. Carlos Martínez",
      email: "carlos@footapp.com",
      phone: "+34 612 345 678",
      specialization: "Podología General",
      rating: 4.8,
      citas: 45,
    },
    {
      id: 2,
      name: "Dra. Sofia García",
      email: "sofia@footapp.com",
      phone: "+34 622 456 789",
      specialization: "Tratamientos Especializados",
      rating: 4.9,
      citas: 52,
    },
    {
      id: 3,
      name: "Dr. Luis Pérez",
      email: "luis@footapp.com",
      phone: "+34 632 567 890",
      specialization: "Cirugía Podológica",
      rating: 4.7,
      citas: 38,
    },
  ]

  return (
    <main className="min-h-screen pt-20 pb-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Podólogos</h1>
          <p className="text-slate-400">Administra el equipo de podólogos del consultorio</p>
        </div>

        <div className="flex justify-between mb-6">
          <div className="flex gap-2">
            <Button className="bg-purple-600 hover:bg-purple-700">Filtrar</Button>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">Agregar podólogo</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {podologists.map((podologist) => (
            <Card key={podologist.id} className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarImage src="/placeholder.svg" alt={podologist.name} />
                      <AvatarFallback className="bg-purple-600 text-white">
                        {podologist.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-white font-semibold">{podologist.name}</h3>
                      <p className="text-xs text-slate-400">{podologist.specialization}</p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white">
                    <MoreVertical className="size-4" />
                  </Button>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Mail className="size-4 text-slate-500" />
                    {podologist.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Phone className="size-4 text-slate-500" />
                    {podologist.phone}
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <Calendar className="size-4 text-slate-500" />
                    {podologist.citas} citas
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
                  <Star className="size-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-semibold">{podologist.rating}</span>
                  <span className="text-slate-400 text-sm">({podologist.citas} valoraciones)</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 border-slate-600 bg-transparent">
                    Ver perfil
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-slate-600 bg-transparent">
                    Editar
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
