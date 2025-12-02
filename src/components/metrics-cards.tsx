"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCard {
  label: string
  value: string | number
  trend: number
  trendDirection: "up" | "down"
  unit?: string
}

export function MetricsCards({ metrics }: { metrics: MetricCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-200">{metric.label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {metric.unit}
                {metric.value}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {metric.trendDirection === "up" ? (
                <TrendingUp className="size-4 text-green-500" />
              ) : (
                <TrendingDown className="size-4 text-red-500" />
              )}
              <span className={metric.trendDirection === "up" ? "text-green-500 text-xs" : "text-red-500 text-xs"}>
                {metric.trendDirection === "up" ? "+" : "-"}
                {Math.abs(metric.trend)}%
              </span>
              <span className="text-slate-400 text-xs">Last 30 days</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
