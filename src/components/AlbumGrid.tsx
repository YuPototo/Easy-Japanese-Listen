'use client'

import Link from 'next/link'
import { useAlbumList } from '@/fetchData'

export default function AlbumGrid() {
    const { albums, isLoading, error } = useAlbumList()

    return (
        <div className="flex flex-col gap-4 items-center">
            {albums?.map((album) => (
                <Link
                    href={`/album/${album.id}`}
                    className="m-2 text-xl"
                    key={album.id}
                >
                    {album.album_title}
                </Link>
            ))}

            {isLoading && <div>Loading...</div>}

            {error && (
                <div className="text-red-500 bg-red-100 p-2 rounded-md">
                    {error}
                </div>
            )}
        </div>
    )
}
