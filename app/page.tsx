// app/page.tsx
"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchWeatherData } from "@/lib/redux/slices/weatherSlice"
import { fetchCryptoData } from "@/lib/redux/slices/cryptoSlice"
import { fetchNewsData } from "@/lib/redux/slices/newsSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { WeatherCard } from "@/components/weather/weather-card"
import { CryptoCard } from "@/components/crypto/crypto-card"
import { NewsSection } from "@/components/news/news-section"
import { useHydrateCryptoFavorites } from "@/lib/hooks/useHydrateCryptoFavorites"

export default function HomePage() {
  useHydrateCryptoFavorites()

  const dispatch = useDispatch<AppDispatch>()

  const {
    cities,
    favorites: weatherFavorites,
    data: weatherData,
    status: weatherStatus,
  } = useSelector((state: RootState) => state.weather)

  const {
    cryptos,
    favorites: cryptoFavorites,
    data: cryptoData,
    status: cryptoStatus,
  } = useSelector((state: RootState) => state.crypto)

  useEffect(() => {
    cities.forEach((city) => dispatch(fetchWeatherData(city)))
    dispatch(fetchCryptoData())
    dispatch(fetchNewsData()) // fetch news too
  }, [dispatch, cities])

  const isWeatherLoading = weatherStatus === "loading"
  const isCryptoLoading = cryptoStatus === "loading"

  const renderWeatherCards = (citiesList: string[]) =>
    citiesList.map((city) => (
      <WeatherCard
        key={city}
        city={city}
        data={weatherData[city]}
        isLoading={isWeatherLoading}
      />
    ))

  const renderCryptoCards = (cryptoList: string[]) =>
    cryptoList.map((id) => (
      <CryptoCard
        key={id}
        id={id}
        data={cryptoData[id]}
        isLoading={isCryptoLoading}
      />
    ))

  return (
    <div className="space-y-10">
      {/* Weather Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">🌦️ Favorite Cities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderWeatherCards(weatherFavorites)}
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">🌍 All Cities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderWeatherCards(cities.filter((city) => !weatherFavorites.includes(city)))}
        </div>
      </section>

      {/* Crypto Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">💰 Favorite Cryptocurrencies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderCryptoCards(cryptoFavorites)}
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">📈 All Cryptocurrencies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderCryptoCards(cryptos.filter((id) => !cryptoFavorites.includes(id)))}
        </div>
      </section>

      {/* News Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">📰 Latest Crypto News</h2>
        <NewsSection />
      </section>
    </div>
  )
}
