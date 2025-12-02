"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { Bell } from "lucide-react"

interface PodologistProfile {
  name: string
  email: string
  avatar?: string
  specialty?: string
}

export function PodologistProfileSection({
  profile,
}: {
  profile: PodologistProfile
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Perfil y configuración</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Section */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-700">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl font-bold">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg">{profile.name}</h3>
            <p className="text-slate-400 text-sm">Podiatrista</p>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider block mb-2">Full Name</label>
            <Input value={profile.name} disabled={!isEditing} className="bg-slate-800 border-slate-700 text-white" />
          </div>

          <div>
            <label className="text-xs text-slate-500 uppercase tracking-wider block mb-2">Email</label>
            <Input value={profile.email} disabled={!isEditing} className="bg-slate-800 border-slate-700 text-white" />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="pt-4 border-t border-slate-700">
          <h4 className="text-white font-semibold mb-4">Notification Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-purple-500" />
                <span className="text-slate-300">Email Notifications for new appointments</span>
              </div>
              <Toggle pressed={emailNotifications} onPressedChange={setEmailNotifications} />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </CardContent>
    </Card>
  )
}
