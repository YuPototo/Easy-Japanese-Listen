'use client'

import { Button } from '@/components/ui/button'
import { Album } from '@/database/dbTypeHelper'
import supabase from '@/database/supabaseClient'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
    const [albums, setAlbums] = useState<Album[] | null>(null)

    useEffect(() => {
        const fetchAlbums = async () => {
            const { data, error } = await supabase.from('album').select('*')
            if (error) console.log(error)
            else setAlbums(data)
        }
        fetchAlbums()
    }, [])

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
        </div>
    )
}
