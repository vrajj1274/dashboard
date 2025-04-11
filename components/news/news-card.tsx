import { Card, CardContent } from "@/components/ui/card"
import type { NewsArticle } from "@/types"

interface NewsCardProps {
  article: NewsArticle
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium">{article.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(article.publishedAt).toLocaleDateString()} • {article.source}
          </p>
          <p className="text-sm mt-2 line-clamp-2">{article.description}</p>
        </CardContent>
      </Card>
    </a>
  )
}
