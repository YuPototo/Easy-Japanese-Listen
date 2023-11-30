'use client'

import Link from 'next/link'
import { useAlbumList } from '@/fetchData'
import { AlbumWithCover } from '@/types/EnhancedType'
import Image from 'next/image'

export default function AlbumGrid() {
    const { albums, isLoading, error } = useAlbumList()

    return (
        <div className="flex flex-col items-center gap-4">
            {albums?.map((album) => <AlbumCard album={album} key={album.id} />)}

            {isLoading && <div>Loading...</div>}

            {error && (
                <div className="rounded-md bg-red-100 p-2 text-red-500">
                    {error}
                </div>
            )}
        </div>
    )
}

function AlbumCard({ album }: { album: AlbumWithCover }) {
    return (
        <Link
            href={`/listen/album/${album.id}`}
            className="m-2 text-xl"
            key={album.id}
        >
            <Image
                src={album.coverUrl}
                alt={album.title}
                width="100"
                height="100"
            />
            {album.title}
        </Link>
    )
}
