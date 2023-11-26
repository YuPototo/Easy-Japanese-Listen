'use client'

import AddTrack from '@/components/edit/AddTrack'
import { useRouter } from 'next/navigation'

type PageParam = {
    params: { albumId: string }
}
export default function Page({ params }: PageParam) {
    const { albumId } = params
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
