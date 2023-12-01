'use client'

import { useAlbumList } from '@/fetchData'
import AlbumListCard from './AlbumListCard'

type Props = {
    isUser?: boolean
}

export default function AlbumGrid({ isUser }: Props) {
    const { albums, isLoading, error } = useAlbumList()

    return (
        <div className="flex flex-col items-center gap-12">
            {albums?.map((album, i) => (
                <AlbumListCard
                    isUser={isUser}
                    album={album}
                    key={album.id}
                    index={i}
                />
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
