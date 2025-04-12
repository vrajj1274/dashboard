"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import type { WeatherHistoryData } from "@/types"

interface WeatherChartProps {
  data: WeatherHistoryData[]
}

export function WeatherChart({ data }: WeatherChartProps) {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(val) => new Date(val).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(val) => new Date(val).toLocaleString()}
          />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
