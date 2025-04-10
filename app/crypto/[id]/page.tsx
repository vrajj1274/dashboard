import { Suspense } from "react"
import { CryptoDetail } from "@/components/crypto/crypto-detail"
import { CryptoDetailSkeleton } from "@/components/crypto/crypto-detail-skeleton"

interface PageProps {
  params: { id: string }
}

export default function CryptoPage({ params }: PageProps) {
  return (
    <div className="container mx-auto py-6 px-4">
      <Suspense fallback={<CryptoDetailSkeleton />}>
        <CryptoDetail id={params.id} />
      </Suspense>
    </div>
  )
}
