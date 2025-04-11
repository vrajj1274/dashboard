"use client"

import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, YAxis } from "@/components/ui/chart"

export function WeatherChart() {
  return (
    <ChartContainer className="h-[200px]">
      <Chart>
        <YAxis />
        <ChartTooltip>
          <ChartTooltipContent />
        </ChartTooltip>
      </Chart>
    </ChartContainer>
  )
}
