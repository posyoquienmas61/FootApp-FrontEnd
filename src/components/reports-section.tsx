"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export function ReportsSection() {
  return (
    <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-white">Reportes y análisis</CardTitle>
        <CardDescription>Generate and download detailed reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">Report Type</label>
            <Select defaultValue="appointments">
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="appointments">Appointments</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="podiatrists">Podiatrists Performance</SelectItem>
                <SelectItem value="clients">Clients</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">Date Range</label>
            <Input type="date" className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">Podiatrist</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="dr-smith">Dr. Eleanor Smith</SelectItem>
                <SelectItem value="dr-johnson">Dr. Marcus Johnson</SelectItem>
                <SelectItem value="dr-williams">Dr. Sofia Williams</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">Service Type</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="general">General Consultation</SelectItem>
                <SelectItem value="surgery">Nail Surgery</SelectItem>
                <SelectItem value="analysis">Gait Analysis</SelectItem>
                <SelectItem value="orthotics">Orthotics Fitting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2 h-10">
          <Download className="size-4" />
          Generate and Download Report
        </Button>
      </CardContent>
    </Card>
  )
}
