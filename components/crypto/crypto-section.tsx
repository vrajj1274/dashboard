"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CryptoCard } from "@/components/crypto/crypto-card"
import { fetchCryptoData, startWebSocket } from "@/lib/redux/slices/cryptoSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function CryptoSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error, cryptos } = useSelector((state: RootState) => state.crypto)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCryptoData())
    }

    // Start WebSocket connection
    dispatch(startWebSocket())

    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      dispatch(fetchCryptoData())
    }, 60000)

    return () => clearInterval(interval)
  }, [dispatch, status])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cryptocurrency</CardTitle>
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
            : cryptos.map((crypto) => (
                <CryptoCard
                  key={crypto}
                  id={crypto}
                  data={data[crypto]}
                  isLoading={status === "loading" && !data[crypto]}
                />
              ))}
        </div>
      </CardContent>
    </Card>
  )
}
