'use client'

import UpdateTrack from '@/components/edit/UpdateTrack'
import { useRouter } from 'next/navigation'

type Props = {
    albumId: string | number
    trackId: string | number
}

export function EditTrackPage({ albumId, trackId }: Props) {
    const router = useRouter()

    return (
        <div>
            <UpdateTrack
                trackId={trackId}
                onUpdated={() => router.push(`/edit/album/${albumId}`)}
            />
        </div>
    )
}
