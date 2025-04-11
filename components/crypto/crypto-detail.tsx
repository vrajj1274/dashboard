"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ArrowLeft, TrendingDown, TrendingUp } from "lucide-react"
import { fetchCryptoHistory, toggleFavoriteCrypto } from "@/lib/redux/slices/cryptoSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { CryptoChart } from "@/components/crypto/crypto-chart"
import { cn } from "@/lib/utils"

interface CryptoDetailProps {
  id: string
}

export function CryptoDetail({ id }: CryptoDetailProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { data, history, historyStatus, favorites } = useSelector((state: RootState) => state.crypto)
  const cryptoData = data[id]
  const cryptoHistory = history[id] || []
  const isFavorite = favorites.includes(id)

  useEffect(() => {
    if (!cryptoHistory.length) {
      dispatch(fetchCryptoHistory(id))
    }
  }, [dispatch, id, cryptoHistory.length])

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCrypto(id))
  }

  if (!cryptoData) {
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
              <CardTitle>{id}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>Cryptocurrency data not available.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isPositiveChange = cryptoData.priceChangePercentage24h >= 0

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
            <div>
              <CardTitle>{cryptoData.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{cryptoData.symbol.toUpperCase()}</p>
            </div>
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
              <h3 className="text-lg font-medium mb-4">Current Price</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold">${cryptoData.currentPrice.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    {isPositiveChange ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <p className={cn("text-sm", isPositiveChange ? "text-green-500" : "text-red-500")}>
                      {isPositiveChange ? "+" : ""}
                      {cryptoData.priceChangePercentage24h.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="font-medium">${cryptoData.marketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">24h Volume</span>
                    <span className="font-medium">${cryptoData.totalVolume.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Circulating Supply</span>
                    <span className="font-medium">
                      {cryptoData.circulatingSupply.toLocaleString()} {cryptoData.symbol.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">All-Time High</span>
                    <span className="font-medium">${cryptoData.ath.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-medium">{new Date(cryptoData.lastUpdated).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Price History</h3>
              {historyStatus === "loading" ? (
                <Skeleton className="h-[200px] w-full" />
              ) : cryptoHistory.length > 0 ? (
                <CryptoChart data={cryptoHistory} />
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
          ) : cryptoHistory.length > 0 ? (
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Volume</th>
                    <th className="text-left p-2">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoHistory.map((item, index) => (
                    <tr key={index} className={index !== cryptoHistory.length - 1 ? "border-b" : ""}>
                      <td className="p-2">{new Date(item.timestamp).toLocaleDateString()}</td>
                      <td className="p-2">${item.price.toLocaleString()}</td>
                      <td className="p-2">${item.volume.toLocaleString()}</td>
                      <td className="p-2">${item.marketCap.toLocaleString()}</td>
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
