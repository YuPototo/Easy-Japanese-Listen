'use client'

import { Button } from '@/components/ui/button'
import { useAlbumList } from '@/fetchData'
import Link from 'next/link'

export default function EditHomePage() {
    return (
        <div className="flex flex-col items-center gap-10">
            <div className="my-6">
                <AlbumGrid />
            </div>
            <Link href="/edit/album/new">
                <Button>Add Album</Button>
            </Link>
        </div>
    )
}

export function AlbumGrid() {
    const { albums, isLoading, error } = useAlbumList()

    return (
        <div className="flex flex-col items-center gap-4">
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
                <div className="rounded-md bg-red-100 p-2 text-red-500">
                    {error}
                </div>
            )}
        </div>
    )
}
