"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowLeft } from "lucide-react"
import { fetchWeatherHistory, toggleFavoriteCity } from "@/lib/redux/slices/weatherSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { WeatherChart } from "@/components/weather/weather-chart"
import { cn } from "@/lib/utils"

interface WeatherDetailProps {
  city: string
}

export function WeatherDetail({ city }: WeatherDetailProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { data, history, historyStatus, favorites } = useSelector((state: RootState) => state.weather)
  const cityData = data[city]
  const cityHistory = history[city] || []
  const isFavorite = favorites.includes(city)

  useEffect(() => {
    if (!cityHistory.length) {
      dispatch(fetchWeatherHistory(city))
    }
  }, [dispatch, city, cityHistory.length])

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCity(city))
  }

  if (!cityData) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{city}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>Weather data not available for this city.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{city}</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleFavorite}
              className={cn(isFavorite ? "text-yellow-500" : "")}
            >
              <Star className="mr-2 h-4 w-4" />
              {isFavorite ? "Favorited" : "Add to Favorites"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Current Weather</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temperature</span>
                  <span className="font-medium">{cityData.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condition</span>
                  <span className="font-medium">{cityData.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Humidity</span>
                  <span className="font-medium">{cityData.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wind Speed</span>
                  <span className="font-medium">{cityData.windSpeed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">{new Date(cityData.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Weather History</h3>
              {historyStatus === "loading" ? (
                <Skeleton className="h-[200px] w-full" />
              ) : cityHistory.length > 0 ? (
                <WeatherChart data={cityHistory} />
              ) : (
                <p className="text-muted-foreground">No historical data available</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historical Data</CardTitle>
        </CardHeader>
        <CardContent>
          {historyStatus === "loading" ? (
            <div className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
          ) : cityHistory.length > 0 ? (
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Temperature</th>
                    <th className="text-left p-2">Condition</th>
                    <th className="text-left p-2">Humidity</th>
                  </tr>
                </thead>
                <tbody>
                  {cityHistory.map((item, index) => (
                    <tr key={index} className={index !== cityHistory.length - 1 ? "border-b" : ""}>
                      <td className="p-2">{new Date(item.timestamp).toLocaleDateString()}</td>
                      <td className="p-2">{item.temperature}°C</td>
                      <td className="p-2">{item.condition}</td>
                      <td className="p-2">{item.humidity}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground">No historical data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
