import { Card, CardContent } from "@/components/ui/card"
import type { NewsArticle } from "@/types"

interface NewsCardProps {
  article: NewsArticle
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      <Card className="bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mb-4">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(article.publishedAt).toLocaleDateString()} • {article.source}
          </p>
          <p className="text-sm text-gray-700 mt-2 line-clamp-3">{article.description}</p>
        </CardContent>
      </Card>
    </a>
  )
}
