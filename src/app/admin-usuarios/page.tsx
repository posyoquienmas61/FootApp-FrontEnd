"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"
import { CheckCircle, XCircle, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminUsuarios() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || user?.role !== "admin") {
    redirect("/login")
  }

  const usuarios = [
    {
      id: 1,
      name: "María García",
      email: "maria@ejemplo.com",
      phone: "+34 612 111 111",
      joinDate: "2024-11-15",
      status: "active",
      citas: 8,
    },
    {
      id: 2,
      name: "Juan López",
      email: "juan@ejemplo.com",
      phone: "+34 622 222 222",
      joinDate: "2024-10-20",
      status: "active",
      citas: 12,
    },
    {
      id: 3,
      name: "Ana Rodríguez",
      email: "ana@ejemplo.com",
      phone: "+34 632 333 333",
      joinDate: "2024-09-05",
      status: "inactive",
      citas: 3,
    },
  ]

  return (
    <main className="min-h-screen pt-20 pb-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Usuarios</h1>
          <p className="text-slate-400">Administra los pacientes registrados en la aplicación</p>
        </div>

        <div className="flex justify-between mb-6">
          <div className="flex gap-2">
            <Button className="bg-purple-600 hover:bg-purple-700">Filtrar</Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
              Exportar
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Usuario</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Email</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Teléfono</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Se unió</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Citas</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Estado</th>
                <th className="text-left py-3 px-4 text-slate-400 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarImage src="/placeholder.svg" alt={usuario.name} />
                        <AvatarFallback className="bg-purple-600 text-white text-xs">
                          {usuario.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white font-medium">{usuario.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{usuario.email}</td>
                  <td className="py-3 px-4 text-slate-300">{usuario.phone}</td>
                  <td className="py-3 px-4 text-slate-300">{usuario.joinDate}</td>
                  <td className="py-3 px-4 text-slate-300">{usuario.citas}</td>
                  <td className="py-3 px-4">
                    <div
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                        usuario.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {usuario.status === "active" ? (
                        <CheckCircle className="size-3" />
                      ) : (
                        <XCircle className="size-3" />
                      )}
                      {usuario.status === "active" ? "Activo" : "Inactivo"}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      <MoreVertical className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
