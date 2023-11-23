'use client'

import TrackList from '@/components/TrackList'
import { useAlbumInfo } from '@/fetchData'

type Props = {
    albumId: string | number
}

export default function AlbumPage({ albumId }: Props) {
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
            <div>{album?.album_title}</div>
            {/* todo: use a skeleton */}
            {isLoading && <div>Loading...</div>}
        </div>
    )
}
