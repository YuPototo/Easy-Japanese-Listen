'use client'

import Link from 'next/link'
import { useAlbumList } from '@/fetchData'

export default function AlbumGrid() {
    const { albums, isLoading, error } = useAlbumList()

    return (
        <div className="flex flex-col items-center gap-4">
            {albums?.map((album) => (
                <Link
                    href={`/listen/album/${album.id}`}
                    className="m-2 text-xl"
                    key={album.id}
                >
                    {album.album_title}
                </Link>
            ))}

            {isLoading && <div>Loading...</div>}

            {error && (
                <div className="rounded-md bg-red-100 p-2 text-red-500">
                    {error}
                </div>
            )}
        </div>
    )
}
