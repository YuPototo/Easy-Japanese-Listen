'use client'

import TrackList from '@/components/TrackList'
import { useAlbumInfo } from '@/fetchData'

type PageParam = {
    params: { albumId: string }
}

export default function AlbumPage({ params }: PageParam) {
    const { albumId } = params

    return (
        <div>
            <AlbumTitle albumId={albumId} />
            <div className="mt-12">
                <TrackList id={albumId} />
            </div>
        </div>
    )
}

function AlbumTitle({ albumId }: { albumId: string | number }) {
    const { album, isLoading, error } = useAlbumInfo(albumId)

    // todo: if there is an error, show a message using toast
    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    return (
        <div>
            <div>{album?.title}</div>
            {/* todo: use a skeleton */}
            {isLoading && <div>Loading...</div>}
        </div>
    )
}
