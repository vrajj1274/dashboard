import { Suspense } from "react"
import { CryptoDetail } from "@/components/crypto/crypto-detail"
import { CryptoDetailSkeleton } from "@/components/crypto/crypto-detail-skeleton"
import { NewsSection } from "@/components/news/news-section"

interface PageProps {
  params: { id: string }
}

export default function CryptoPage({ params }: PageProps) {
  return (
    <div className="container mx-auto py-6 px-4">
      <Suspense fallback={<CryptoDetailSkeleton />}>
        <CryptoDetail id={params.id} />
        <NewsSection />
      </Suspense>
    </div>
  )
}
