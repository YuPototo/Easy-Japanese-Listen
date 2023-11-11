'use client'

import { useEffect, useState } from 'react'
import supabase from '@/database/supabaseClient'
import { Album } from '@/database/dbTypeHelper'

type Props = {
    id: string | number
}

export default function AlbumInfo({ id }: Props) {
    const [album, setAlbum] = useState<Album | null>(null)
    useEffect(() => {
        const fetchAlbum = async () => {
            const { data, error } = await supabase
                .from('album')
                .select('*')
                .eq('id', id)
            if (error) console.log(error)
            else setAlbum(data[0])
        }
        fetchAlbum()
    }, [id])

    return <div>{album?.album_title}</div>
}
