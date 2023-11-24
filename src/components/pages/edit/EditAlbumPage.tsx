'use client'

import { Button } from '@/components/ui/button'
import { useAlbumInfo, useTrackList } from '@/fetchData'
import Link from 'next/link'

type Props = {
    albumId: string | number
}

export default function EditAlbumPage({ albumId }: Props) {
    const { album, isLoading } = useAlbumInfo(albumId)
    const tracks = useTrackList(albumId)

    return (
        <div className="">
            <div className=" bg-gray-800 h-full items-center flex flex-col">
                <AlbumTitle title={album?.album_title} isLoading={isLoading} />
                <div className="p-2 flex flex-col gap-2">
                    {tracks?.map((track) => (
                        <Link
                            className="p-2 rounded hover:bg-green-800 hover:cursor-pointer"
                            key={track.id}
                            href={`./${albumId}/track/${track.id}`}
                        >
                            {track.track_title}
                        </Link>
                    ))}

                    <div className="mt-10">
                        <Link href={`./${albumId}/new`}>
                            <Button>Add Track</Button>
                        </Link>
                    </div>
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
    return <div className="text-lg mb-10">{title}</div>
}
