"use client"

import { Calendar, Users, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const quickAccessItems = [
  { label: "Manage Appointments", icon: Calendar, href: "/admin-citas" },
  { label: "Manage Podiatrists", icon: Users, href: "/admin-podologos" },
  { label: "Manage Users", icon: Users, href: "/admin-usuarios" },
  { label: "Manage Services", icon: Package, href: "/admin-servicios" },
]

export function QuickAccessSection() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Gestión rápida</CardTitle>
        <CardDescription>Access main management areas</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickAccessItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.label}
              variant="outline"
              className="h-auto py-4 bg-slate-700/50 hover:bg-purple-600/20 border-slate-600 hover:border-purple-500 text-left justify-start flex flex-col items-start"
            >
              <Icon className="size-5 mb-2 text-purple-400" />
              <span className="text-slate-100">{item.label}</span>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
