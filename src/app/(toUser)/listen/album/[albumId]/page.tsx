'use client'

import AlbumTopCard from '@/components/AlbumTopCard'
import TrackList from '@/components/TrackList'
import { useTrackList } from '@/fetchData'

type PageParam = {
    params: { albumId: string }
}

export default function AlbumPage({ params }: PageParam) {
    const { albumId } = params

    const tracks = useTrackList(albumId)

    return (
        <div className="flex flex-col items-center">
            <AlbumTopCard
                albumId={albumId}
                firstTrackId={tracks ? tracks[0].id : undefined}
            />
            {tracks !== null && <TrackList tracks={tracks} albumId={albumId} />}
        </div>
    )
}
