'use client'

import { Button } from '@/components/ui/button'
import { useAlbumList } from '@/fetchData/clientFetch'
import Link from 'next/link'

export default function EditHomePage() {
    return (
        <div className="flex flex-col items-center gap-10">
            <div className="my-6">
                <AlbumList />
            </div>
            <Link href="/edit/listen/album/new">
                <Button>Add Album</Button>
            </Link>
        </div>
    )
}

function AlbumList() {
    const { albums, isLoading, error } = useAlbumList({
        publicOnly: false,
    })
    return (
        <div>
            {isLoading && <div>Loading...</div>}

            {error && <div>Error: {error}</div>}

            {albums && (
                <div className="flex flex-col gap-4">
                    {albums.map((album) => (
                        <Link
                            key={album.id}
                            href={`/edit/listen/album/${album.id}`}
                        >
                            {album.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
