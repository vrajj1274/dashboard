import { WeatherDetail } from "@/components/weather/weather-detail"

interface CityPageProps {
  params: { city: string }
}

export default async function CityPage(props: CityPageProps) {
  const { params } = await Promise.resolve(props) // 👈 forces async context
  const decodedCity = decodeURIComponent(params.city)
  return <WeatherDetail city={decodedCity} />
}
