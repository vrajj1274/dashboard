"use client"

import { Suspense, useMemo } from "react"
import { WeatherDetail } from "@/components/weather/weather-detail"
import { WeatherDetailSkeleton } from "@/components/weather/weather-detail-skeleton"

export default function CityWeatherClient({ rawCity }: { rawCity: string }) {
    const decodedCity = useMemo(() => decodeURIComponent(rawCity), [rawCity])

    return (
        <div className="container mx-auto py-6 px-4">
            <Suspense fallback={<WeatherDetailSkeleton />}>
                <WeatherDetail city={decodedCity} />
            </Suspense>
        </div>
    )
}
