'use client'

import AddTrack from '@/components/AddTrack'
import { useRouter } from 'next/navigation'

type Props = {
    albumId: string | number
}

export default function AddTrackPage({ albumId }: Props) {
    const router = useRouter()

    return (
        <div>
            <AddTrack
                albumId={albumId}
                onAdded={() => router.push(`/edit/album/${albumId}`)}
            />
        </div>
    )
}
