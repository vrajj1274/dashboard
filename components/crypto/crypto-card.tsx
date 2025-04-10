"use client"

import type React from "react"

import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Star, TrendingDown, TrendingUp } from "lucide-react"
import { toggleFavoriteCrypto } from "@/lib/redux/slices/cryptoSlice"
import type { RootState } from "@/lib/redux/store"
import type { CryptoData } from "@/types"
import { cn } from "@/lib/utils"

interface CryptoCardProps {
  id: string
  data?: CryptoData
  isLoading: boolean
}

export function CryptoCard({ id, data, isLoading }: CryptoCardProps) {
  const dispatch = useDispatch()
  const { favorites } = useSelector((state: RootState) => state.crypto)
  const isFavorite = favorites.includes(id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(toggleFavoriteCrypto(id))
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
            <h3 className="text-lg font-medium">{id}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className={cn(isFavorite ? "text-yellow-500" : "text-muted-foreground")}
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

  const isPositiveChange = data.priceChangePercentage24h >= 0

  return (
    <Link href={`/crypto/${id}`}>
      <Card
        className={cn(
          "hover:shadow-md transition-shadow",
          isFavorite && "border-yellow-500 border-2"
        )}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{data.name}</h3>
              <p className="text-sm text-muted-foreground">{data.symbol.toUpperCase()}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className={cn(isFavorite ? "text-yellow-500" : "text-muted-foreground")}
            >
              <Star className="h-4 w-4" />
              <span className="sr-only">Toggle favorite</span>
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">${data.currentPrice.toLocaleString()}</p>
            <div className="flex items-center mt-1">
              {isPositiveChange ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <p className={cn("text-sm", isPositiveChange ? "text-green-500" : "text-red-500")}>
                {isPositiveChange ? "+" : ""}
                {data.priceChangePercentage24h.toFixed(2)}%
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Market Cap: ${data.marketCap.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
