'use client'

import { useAlbumList } from '@/fetchData/client'
import AlbumListCard from './AlbumListCard'

type Props = {
    isEditing?: boolean
}

export default function AlbumGrid({ isEditing }: Props) {
    const { albums, isLoading, error } = useAlbumList({
        publicOnly: !isEditing,
    })

    return (
        <div className="flex flex-col items-center gap-12">
            {albums?.map((album, i) => (
                <AlbumListCard
                    isEditing={isEditing}
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
