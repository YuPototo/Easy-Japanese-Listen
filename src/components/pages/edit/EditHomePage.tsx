'use client'

import { Button } from '@/components/ui/button'
import { useAlbumList } from '@/fetchData'
import Link from 'next/link'

export function EditHomePage() {
    return (
        <div>
            <div className="my-6">
                <AlbumGrid />
            </div>
            <Link href="/edit/album/new">
                <Button>Add Album</Button>
            </Link>
        </div>
    )
}

export default function AlbumGrid() {
    const { albums, isLoading, error } = useAlbumList()

    return (
        <div className="flex  gap-4 items-center">
            {albums?.map((album) => (
                <Link
                    href={`/edit/album/${album.id}`}
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
