'use client'

import { Track } from '@/database/dbTypeHelper'
import Link from 'next/link'

type Props = {
    albumId: string | number
    tracks: Track[]
}

export default function TrackList({ albumId, tracks }: Props) {
    return (
        <div className="mt-12 flex w-full flex-col items-center gap-4 ">
            {tracks.map((track) => (
                <Link
                    key={track.id}
                    href={`/listen/album/${albumId}/track/${track.id}`}
                    className="py-1 hover:bg-gray-700"
                >
                    <div className="w-72 rounded text-center">
                        {track.title}
                    </div>
                </Link>
            ))}
        </div>
    )
}
