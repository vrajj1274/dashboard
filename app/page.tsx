import { WeatherSection } from "@/components/weather/weather-section"
import { CryptoSection } from "@/components/crypto/crypto-section"
import { NewsSection } from "@/components/news/news-section"

export default function Home() {
  return (
    <div className="container mx-auto py-6 px-4 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WeatherSection />
        <CryptoSection />
      </div>
      <NewsSection />
    </div>
  )
}
