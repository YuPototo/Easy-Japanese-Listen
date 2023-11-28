'use client'

import UpdateTrack from '@/components/edit/UpdateTrack'
import { useRouter } from 'next/navigation'

type PageParam = {
    params: { albumId: string; trackId: string }
}
export default function Page({ params }: PageParam) {
    const { albumId, trackId } = params
    const router = useRouter()

    return (
        <div>
            <UpdateTrack
                trackId={trackId}
                onUpdated={() => router.push(`/edit/listen/album/${albumId}`)}
            />
        </div>
    )
}
