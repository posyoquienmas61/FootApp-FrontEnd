"use client"

import * as React from "react"
import Link from "next/link"
import {
  Menu,
  X,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Calendar,
  Clock,
  LayoutDashboard,
  BookOpen,
  Users,
  Clock3,
  FileText,
  Stethoscope,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { user, isAuthenticated, notifications, unreadCount, logout, markNotificationAsRead, markAllAsRead } = useAuth()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getNavLinks = () => {
    if (!isAuthenticated || !user) {
      return [
        { href: "/#inicio", label: "Inicio" },
        { href: "/#servicios", label: "Servicios" },
        { href: "/#citas", label: "Citas" },
        { href: "/#contacto", label: "Contacto" },
      ]
    }

    if (user.role === "admin") {
      return [
        { href: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin-citas", label: "Citas", icon: Calendar },
        { href: "/admin-podologos", label: "Podólogos", icon: Stethoscope },
        { href: "/admin-usuarios", label: "Usuarios", icon: Users },
        { href: "/admin-servicios", label: "Servicios", icon: Package },
        { href: "/admin-reportes", label: "Reportes", icon: FileText },
      ]
    }

    if (user.role === "podologist") {
      return [
        { href: "/podologist-dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/mi-agenda", label: "Mi Agenda", icon: Calendar },
        { href: "/clientes", label: "Clientes", icon: Users },
        { href: "/disponibilidad", label: "Mi disponibilidad", icon: Clock3 },
        { href: "/notificaciones", label: "Notificaciones", icon: Bell },
      ]
    }

    return [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/mis-citas", label: "Mis citas", icon: Calendar },
      { href: "/servicios", label: "Servicios", icon: BookOpen },
      { href: "/notificaciones", label: "Notificaciones", icon: Bell },
    ]
  }

  const navLinks = getNavLinks()

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "cita":
        return <Calendar className="size-4 text-purple-400" />
      case "recordatorio":
        return <Clock className="size-4 text-amber-400" />
      default:
        return <Bell className="size-4 text-slate-400" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) return `hace ${diffMins} min`
    if (diffHours < 24) return `hace ${diffHours}h`
    return `hace ${diffDays}d`
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-slate-900/95 backdrop-blur-md py-4 shadow-md" : "bg-slate-900/80 backdrop-blur-sm py-6",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold text-white">
          FootApp
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const Icon = isAuthenticated && "icon" in link ? (link as any).icon : null
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-200 hover:text-white transition-colors flex items-center gap-2"
              >
                {Icon && <Icon className="size-4" />}
                {link.label}
              </Link>
            )
          })}

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3 ml-4">
              {/* Notifications Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-slate-200 hover:text-white hover:bg-slate-800"
                  >
                    <Bell className="size-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center text-xs font-bold bg-purple-600 text-white rounded-full">
                        {unreadCount}
                      </span>
                    )}
                    <span className="sr-only">Notificaciones</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-slate-900 border-slate-700 text-slate-100">
                  <DropdownMenuLabel className="flex items-center justify-between text-slate-100">
                    <span>Notificaciones</span>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs text-purple-400 hover:text-purple-300 hover:bg-transparent"
                        onClick={markAllAsRead}
                      >
                        Marcar todas como leídas
                      </Button>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  {notifications.length > 0 ? (
                    notifications.slice(0, 5).map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={cn(
                          "flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-slate-800",
                          !notification.read && "bg-slate-800/50",
                        )}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-center gap-2 w-full">
                          {getNotificationIcon(notification.type)}
                          <span className="font-medium text-sm text-slate-100">{notification.title}</span>
                          {!notification.read && <span className="ml-auto size-2 bg-purple-500 rounded-full" />}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{notification.message}</p>
                        <span className="text-xs text-slate-500">{formatTimeAgo(notification.createdAt)}</span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-slate-400">No tienes notificaciones</div>
                  )}
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="justify-center text-purple-400 hover:text-purple-300 focus:bg-slate-800 focus:text-purple-300">
                    <Link href="/notificaciones" className="w-full text-center">
                      Ver todas las notificaciones
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-slate-200 hover:text-white hover:bg-slate-800 px-2"
                  >
                    <Avatar className="size-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-purple-600 text-white text-xs">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline-block max-w-[120px] truncate text-sm font-medium">
                      {user.name}
                    </span>
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-700 text-slate-100">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-slate-100">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="focus:bg-slate-800 cursor-pointer">
                      <Link href="/perfil" className="flex items-center w-full">
                        <User className="mr-2 size-4" />
                        <span>Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-slate-800 cursor-pointer">
                      <Link href="/configuracion" className="flex items-center w-full">
                        <Settings className="mr-2 size-4" />
                        <span>Configuración</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem
                    className="text-red-400 focus:bg-slate-800 focus:text-red-400 cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 size-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-4">
              <Link href="/login" className="text-sm font-medium text-slate-200 hover:text-white transition-colors">
                Iniciar Sesión
              </Link>
              <Link href="/register">
                <Button variant="default" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Registrarse
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-slate-800">
                  <Bell className="size-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center text-xs font-bold bg-purple-600 text-white rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 bg-slate-900 border-slate-700 text-slate-100">
                <DropdownMenuLabel className="text-slate-100">Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                {notifications.slice(0, 3).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      "flex flex-col items-start gap-1 p-3 focus:bg-slate-800",
                      !notification.read && "bg-slate-800/50",
                    )}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notification.type)}
                      <span className="font-medium text-sm text-slate-100">{notification.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{notification.message}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <button className="text-white p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
          {navLinks.map((link) => {
            const Icon = isAuthenticated && "icon" in link ? (link as any).icon : null
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-slate-200 hover:text-white py-2 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                {Icon && <Icon className="size-5" />}
                {link.label}
              </Link>
            )
          })}

          {isAuthenticated && user ? (
            <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar className="size-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-purple-600 text-white">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{user.name}</span>
                  <span className="text-xs text-slate-400">{user.email}</span>
                </div>
              </div>
              <Link
                href="/perfil"
                className="flex items-center gap-3 text-slate-200 hover:text-white py-2 px-2"
                onClick={() => setIsOpen(false)}
              >
                <User className="size-5" />
                <span>Perfil</span>
              </Link>
              <Link
                href="/configuracion"
                className="flex items-center gap-3 text-slate-200 hover:text-white py-2 px-2"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="size-5" />
                <span>Configuración</span>
              </Link>
              <button
                className="flex items-center gap-3 text-red-400 hover:text-red-300 py-2 px-2 w-full text-left"
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
              >
                <LogOut className="size-5" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-slate-800">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-slate-200 hover:text-white hover:bg-slate-800">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Registrarse</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
