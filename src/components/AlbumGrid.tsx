'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import supabase from '@/database/supabaseClient'
import { Album } from '@/database/dbTypeHelper'

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
        </div>
    )
}
