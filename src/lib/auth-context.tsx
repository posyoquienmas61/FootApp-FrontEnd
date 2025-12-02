"use client"

import * as React from "react"

export type UserRole = "patient" | "podologist" | "admin"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
}

interface Notification {
  id: string
  title: string
  message: string
  type: "cita" | "recordatorio" | "sistema"
  read: boolean
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  notifications: Notification[]
  unreadCount: number
  login: (user: User) => void
  logout: () => void
  markNotificationAsRead: (id: string) => void
  markAllAsRead: () => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

// Mock notifications for demo purposes
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nueva cita confirmada",
    message: "Tu cita para el 15 de diciembre ha sido confirmada.",
    type: "cita",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
  },
  {
    id: "2",
    title: "Recordatorio de cita",
    message: "Tienes una cita mañana a las 10:00 AM.",
    type: "recordatorio",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "3",
    title: "Cita reprogramada",
    message: "Tu cita del 20 de diciembre ha sido reprogramada.",
    type: "cita",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications)

  const isAuthenticated = !!user
  const unreadCount = notifications.filter((n) => !n.read).length

  const login = React.useCallback((userData: User) => {
    setUser(userData)
  }, [])

  const logout = React.useCallback(() => {
    setUser(null)
  }, [])

  const markNotificationAsRead = React.useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const markAllAsRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        notifications,
        unreadCount,
        login,
        logout,
        markNotificationAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
