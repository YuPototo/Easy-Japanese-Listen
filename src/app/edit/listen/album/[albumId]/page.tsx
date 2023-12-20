'use client'

import { Button } from '@/components/ui/button'
import { useAlbumInfo, useTrackList } from '@/fetchData'
import Link from 'next/link'

type PageParam = {
    params: { albumId: string }
}

export default function EditAlbumPage({ params }: PageParam) {
    const { albumId } = params
    const { album, isLoading } = useAlbumInfo(albumId)
    const tracks = useTrackList(albumId)

    return (
        <div className="">
            <div className=" flex h-full flex-col items-center bg-gray-800">
                <AlbumTitle title={album?.title} isLoading={isLoading} />

                <div className="my-5">
                    <Link href={`/edit/listen/album/${albumId}/new`}>
                        <Button>Add Track</Button>
                    </Link>
                </div>

                <div className="flex flex-col gap-2 p-2">
                    {tracks?.map((track) => (
                        <Link
                            className="rounded p-2 hover:cursor-pointer hover:bg-green-800"
                            key={track.id}
                            href={`/edit/listen/album/${albumId}/track/${track.id}`}
                        >
                            {track.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

function AlbumTitle({
    title,
    isLoading,
}: {
    title?: string
    isLoading: boolean
}) {
    if (isLoading) {
        return <div>Loading...</div>
    }
    return <div className="mb-10 text-lg">{title}</div>
}
