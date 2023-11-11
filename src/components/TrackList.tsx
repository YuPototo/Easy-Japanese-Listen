'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import supabase from '@/database/supabaseClient'
import { Track } from '@/database/dbTypeHelper'

type Props = {
    id: string | number
}

export default function TrackList({ id }: Props) {
    const [tracks, setTracks] = useState<Track[] | null>(null)

    useEffect(() => {
        const fetchTracks = async () => {
            const { data, error } = await supabase
                .from('track')
                .select('*')
                .eq('album_id', id)
                .order('id', { ascending: true })
            if (error) console.log(error)
            else setTracks(data)
        }
        fetchTracks()
    }, [id])

    return (
        <div className="flex flex-col gap-4 text-lg items-center">
            {tracks?.map((track) => (
                <div className="m-2" key={track.id}>
                    <Link
                        href={`/album/${id}/track/${track.id}`}
                        className="p-2"
                    >
                        {track.track_title}
                    </Link>
                </div>
            ))}
        </div>
    )
}
