"use client"
import { useEffect, useState } from "react"
import type React from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { toggleFavoriteCity } from "@/lib/redux/slices/weatherSlice"
import type { RootState } from "@/lib/redux/store"
import type { WeatherData } from "@/types"
import { cn } from "@/lib/utils"

interface WeatherCardProps {
  city: string
  data?: WeatherData
  isLoading: boolean
}

export function WeatherCard({ city, data, isLoading }: WeatherCardProps) {
  const dispatch = useDispatch()
  const { favorites } = useSelector((state: RootState) => state.weather)
  const [mounted, setMounted] = useState(false)

  // Only access Redux state after component has mounted on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  const isFavorite = mounted ? favorites.includes(city) : false

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(toggleFavoriteCity(city))
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">{city}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className={cn(mounted && isFavorite ? "text-yellow-500" : "text-muted-foreground")}
            >
              <Star className="h-4 w-4" />
              <span className="sr-only">Toggle favorite</span>
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">No data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Link href={`/weather/${encodeURIComponent(city)}`}>
      <Card
        className={cn(
          "hover:shadow-md transition-shadow",
          mounted && isFavorite && "border-yellow-500 border-2"
        )}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">{city}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className={cn(mounted && isFavorite ? "text-yellow-500" : "text-muted-foreground")}
            >
              <Star className="h-4 w-4" />
              <span className="sr-only">Toggle favorite</span>
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{data.temperature}°C</p>
            <p className="text-sm">{data.condition}</p>
            <p className="text-sm text-muted-foreground">Humidity: {data.humidity}%</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}