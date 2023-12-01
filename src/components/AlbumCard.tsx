'use client'

import { useAlbumInfo } from '@/fetchData'
import Image from 'next/image'

type Props = {
    albumId: number | string
}

export default function AlbumCard({ albumId }: Props) {
    const { album, isLoading, error } = useAlbumInfo(albumId)

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    if (!album) return <div>Album not found</div>

    return (
        <div
            className="flex h-[140px] w-[310px] gap-4 rounded-md p-2"
            style={{
                background:
                    'linear-gradient(180deg, #18204C 0%, rgba(24, 32, 76, 0.03) 64.58%)',
            }}
        >
            <Image
                className="rounded-md"
                src={album.coverUrl}
                alt={album.title}
                width="100"
                height="125"
            />
            <div className="flex flex-grow flex-col">
                <p>{album.title}</p>
            </div>
        </div>
    )
}
