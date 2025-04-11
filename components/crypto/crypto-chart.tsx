"use client"

import type { CryptoHistoryData } from "@/types"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, XAxis, YAxis } from "@/components/ui/chart"

interface CryptoChartProps {
  data: CryptoHistoryData[]
}

export function CryptoChart({ }: CryptoChartProps) {
  //   // Format the data for the chart
  //   const chartData = data.map((item) => ({
  //     date: new Date(item.timestamp).toLocaleDateString(),
  //     price: item.price,
  //     volume: item.volume / 1000000, // Convert to millions for better display
  //   }))

  return (
    <ChartContainer className="h-[200px]">
      <Chart>
        <XAxis />
        <YAxis />
        <ChartTooltip>
          <ChartTooltipContent />
        </ChartTooltip>
      </Chart>

    </ChartContainer>
  )
}
