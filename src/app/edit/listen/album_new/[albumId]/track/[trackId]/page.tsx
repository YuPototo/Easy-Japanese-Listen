'use client'

import UpdateTrackNew from '@/components/edit/UpdateTrackNew'
import { useRouter } from 'next/navigation'

type PageParam = {
    params: { albumId: string; trackId: string }
}
export default function Page({ params }: PageParam) {
    const { albumId, trackId } = params
    const router = useRouter()

    return (
        <div>
            <UpdateTrackNew
                trackId={trackId}
                onUpdated={() => router.push(`/edit/listen/album/${albumId}`)}
            />
        </div>
    )
}
