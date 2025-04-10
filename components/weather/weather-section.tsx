"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherCard } from "@/components/weather/weather-card"
import { fetchWeatherData } from "@/lib/redux/slices/weatherSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function WeatherSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error, cities } = useSelector((state: RootState) => state.weather)

  useEffect(() => {
    if (status === "idle") {
      cities.forEach((city) => {
        dispatch(fetchWeatherData(city))
      })
    }

    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      cities.forEach((city) => {
        dispatch(fetchWeatherData(city))
      })
    }, 60000)

    return () => clearInterval(interval)
  }, [dispatch, status, cities])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}. Showing cached data if available.</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {status === "loading" && Object.keys(data).length === 0
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                ))
            : cities.map((city) => (
                <WeatherCard key={city} city={city} data={data[city]} isLoading={status === "loading" && !data[city]} />
              ))}
        </div>
      </CardContent>
    </Card>
  )
}
