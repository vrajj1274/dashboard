"use client"

import type { CryptoHistoryData } from "@/types"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, Line, XAxis, YAxis } from "@/components/ui/chart"

interface CryptoChartProps {
  data: CryptoHistoryData[]
}

export function CryptoChart({ data }: CryptoChartProps) {
  // Format the data for the chart
  const chartData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString(),
    price: item.price,
    volume: item.volume / 1000000, // Convert to millions for better display
  }))

  return (
    <ChartContainer className="h-[200px]">
      <Chart>
        <XAxis dataKey="date" />
        <YAxis />
        <Line dataKey="price" stroke="#2563eb" name="Price ($)" />
        <ChartTooltip>
          <ChartTooltipContent />
        </ChartTooltip>
      </Chart>
    </ChartContainer>
  )
}
