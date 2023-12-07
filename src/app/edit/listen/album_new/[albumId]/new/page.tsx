'use client'

import AddTrack from '@/components/edit/AddTrack'
import AddTrackNew from '@/components/edit/AddTrackNew'
import { useRouter } from 'next/navigation'

type PageParam = {
    params: { albumId: string }
}
export default function Page({ params }: PageParam) {
    const { albumId } = params
    const router = useRouter()

    return (
        <div>
            <AddTrackNew
                albumId={albumId}
                onAdded={() => router.push(`/edit/listen/album/${albumId}`)}
            />
        </div>
    )
}
