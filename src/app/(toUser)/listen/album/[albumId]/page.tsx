'use client'

import AlbumCard from '@/components/AlbumCard'
import TrackList from '@/components/TrackList'
import { useAlbumInfo } from '@/fetchData'

type PageParam = {
    params: { albumId: string }
}

export default function AlbumPage({ params }: PageParam) {
    const { albumId } = params

    return (
        <div className="flex flex-col items-center">
            <AlbumCard albumId={albumId} />
            <div className="mt-12">
                <TrackList id={albumId} />
            </div>
        </div>
    )
}
