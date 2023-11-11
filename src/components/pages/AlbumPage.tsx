'use client'

import AlbumInfo from '@/components/AlbumInfo'
import TrackList from '@/components/TrackList'

type Props = {
    albumId: string | number
}

export default function AlbumPage({ albumId }: Props) {
    return (
        <div>
            <AlbumInfo id={albumId} />
            <div className="mt-12">
                <TrackList id={albumId} />
            </div>
        </div>
    )
}
