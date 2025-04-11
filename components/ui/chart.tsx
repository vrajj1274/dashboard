"use client"

import type * as React from "react"

const ChartContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`relative ${className}`} {...props} />
}

const Chart = ({ children, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" {...props}>
      {children}
    </svg>
  )
}

const LineChart = () => {
  return null
}

// const Line = ({ stroke, name }: { stroke: string; name: string }) => {
//   return null
// }

const XAxis = () => {
  return null
}

const YAxis = () => {
  return null
}

interface ChartTooltipProps {
  children?: React.ReactNode
}

const ChartTooltip = ({ children }: ChartTooltipProps) => {
  return <g className="tooltip">{children}</g>
}

const ChartTooltipContent = () => {
  return null
}

export { Chart, LineChart, XAxis, YAxis, ChartContainer, ChartTooltip, ChartTooltipContent }
