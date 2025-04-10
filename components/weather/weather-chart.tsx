"use client"

import type { WeatherHistoryData } from "@/types"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, Line, XAxis, YAxis } from "@/components/ui/chart"

interface WeatherChartProps {
  data: WeatherHistoryData[]
}

export function WeatherChart({ data }: WeatherChartProps) {
  // Format the data for the chart
  const chartData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString(),
    temperature: item.temperature,
    humidity: item.humidity,
  }))

  return (
    <ChartContainer className="h-[200px]">
      <Chart>
        <XAxis dataKey="date" />
        <YAxis />
        <Line dataKey="temperature" stroke="#2563eb" name="Temperature (°C)" />
        <Line dataKey="humidity" stroke="#16a34a" name="Humidity (%)" />
        <ChartTooltip>
          <ChartTooltipContent />
        </ChartTooltip>
      </Chart>
    </ChartContainer>
  )
}
