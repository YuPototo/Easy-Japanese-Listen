'use client'

import AlbumTopCard from '@/components/AlbumTopCard'
import TrackList from '@/components/TrackList'
import { useTrackList } from '@/fetchData/client'

type PageParam = {
    params: { albumId: string }
}

export default function AlbumPage({ params }: PageParam) {
    const { albumId } = params

    const { tracks, isLoading } = useTrackList(albumId)

    return (
        <div className="flex flex-col items-center">
            <AlbumTopCard
                albumId={albumId}
                firstTrackId={tracks ? tracks[0].id : undefined}
            />
            {isLoading && <TrackListSkeleton />}
            {tracks !== null && <TrackList tracks={tracks} albumId={albumId} />}
        </div>
    )
}

function TrackListSkeleton() {
    return (
        <div className="mt-12 flex w-full animate-pulse flex-col items-center gap-6">
            <div className="h-7 w-16 rounded bg-gray-500"></div>
            <div className="h-7 w-16 rounded bg-gray-500"></div>
            <div className="h-7 w-16 rounded bg-gray-500"></div>
            <div className="h-7 w-16 rounded bg-gray-500"></div>
            <div className="h-7 w-16 rounded bg-gray-500"></div>
        </div>
    )
}
