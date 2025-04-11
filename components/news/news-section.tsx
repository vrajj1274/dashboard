"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NewsCard } from "@/components/news/news-card"
import { fetchNewsData } from "@/lib/redux/slices/newsSlice"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function NewsSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { articles, status, error } = useSelector((state: RootState) => state.news)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNewsData())
    }

    // Refresh data every 5 minutes
    const interval = setInterval(() => {
      dispatch(fetchNewsData())
    }, 300000)

    return () => clearInterval(interval)
  }, [dispatch, status])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crypto News</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}. Showing cached data if available.</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {status === "loading" && articles.length === 0 ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
          ) : articles.length > 0 ? (
            articles.slice(0, 5).map((article, index) => <NewsCard key={index} article={article} />)
          ) : (
            <p className="text-muted-foreground">No news articles available</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
