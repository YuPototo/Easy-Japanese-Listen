'use client'

import { useAlbumList } from '@/fetchData'
import { AlbumCard } from './AlbumCard'

export default function AlbumGrid() {
    const { albums, isLoading, error } = useAlbumList()

    return (
        <div className="flex flex-col items-center gap-4">
            {albums?.map((album, i) => (
                <AlbumCard album={album} key={album.id} index={i} />
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
