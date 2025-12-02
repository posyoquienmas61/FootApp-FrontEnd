"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DemoLoginButton() {
  const { isAuthenticated, login, logout } = useAuth()

  const handleDemoLoginAsPatient = () => {
    login({
      id: "1",
      name: "María García",
      email: "maria.garcia@ejemplo.com",
      role: "patient",
    })
  }

  const handleDemoLoginAsPodologist = () => {
    login({
      id: "2",
      name: "Dr. Carlos Martínez",
      email: "carlos.martinez@footapp.com",
      role: "podologist",
    })
  }

  const handleDemoLoginAsAdmin = () => {
    login({
      id: "3",
      name: "Admin FootApp",
      email: "admin@footapp.com",
      role: "admin",
    })
  }

  if (isAuthenticated) {
    return (
      <Button
        onClick={logout}
        variant="outline"
        className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 bg-transparent"
      >
        Cerrar sesión (Demo)
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 bg-transparent"
        >
          Simular inicio (Demo)
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-slate-100">
        <DropdownMenuLabel>Selecciona un tipo de cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem className="focus:bg-slate-800 cursor-pointer" onClick={handleDemoLoginAsPatient}>
          <span>👤 Paciente</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-slate-800 cursor-pointer" onClick={handleDemoLoginAsPodologist}>
          <span>🏥 Podólogo</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-slate-800 cursor-pointer" onClick={handleDemoLoginAsAdmin}>
          <span>⚙️ Administrador</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
