'use client'

import TrackList from '@/components/TrackList'
import { useAlbumInfo } from '@/fetchData'

type Props = {
    albumId: string | number
}

export default function AlbumPage({ albumId }: Props) {
    const album = useAlbumInfo(albumId)

    return (
        <div>
            <div>{album?.album_title}</div>
            <div className="mt-12">
                <TrackList id={albumId} />
            </div>
        </div>
    )
}
