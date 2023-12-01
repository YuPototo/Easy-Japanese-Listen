'use client'

import AlbumCard from '@/components/AlbumCard'
import TrackList from '@/components/TrackList'
import { Button } from '@/components/ui/button'
import { useTrackList } from '@/fetchData'
import Link from 'next/link'

type PageParam = {
    params: { albumId: string }
}

export default function AlbumPage({ params }: PageParam) {
    const { albumId } = params

    const tracks = useTrackList(albumId)

    return (
        <div className="flex flex-col items-center">
            <AlbumCard albumId={albumId} />
            {tracks !== null && (
                <>
                    <TrackList tracks={tracks} albumId={albumId} />
                    <Link
                        className="mt-12"
                        href={`/listen/album/${albumId}/track/${tracks[0].id}`}
                    >
                        <Button>开始播放</Button>
                    </Link>
                </>
            )}
        </div>
    )
}
