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
      <Card className="bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
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
      <Card className="bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">{city}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className={cn(mounted && isFavorite ? "text-yellow-500" : "text-muted-foreground")}
            >
              <Star className="h-5 w-5" />
              <span className="sr-only">Toggle favorite</span>
            </Button>
          </div>
          <div>
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
          "bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow",
          mounted && isFavorite && "border-yellow-500 border-2"
        )}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{city}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className={cn(mounted && isFavorite ? "text-yellow-500" : "text-muted-foreground")}
            >
              <Star className="h-5 w-5" />
              <span className="sr-only">Toggle favorite</span>
            </Button>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{data.temperature}°C</p>
            <p className="text-lg text-gray-600">{data.condition}</p>
            <p className="text-sm text-muted-foreground">Humidity: {data.humidity}%</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
