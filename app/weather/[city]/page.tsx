import { WeatherDetail } from "@/components/weather/weather-detail"

interface CityPageProps {
  params: {
    city: string
  }
}

export default async function CityPage({ params }: CityPageProps) {
  // Explicitly await params as an object
  const resolvedParams = await Promise.resolve(params)
  const decodedCity = decodeURIComponent(resolvedParams.city)
  return <WeatherDetail city={decodedCity} />
}