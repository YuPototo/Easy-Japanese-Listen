'use client'

import Link from 'next/link'
import { useTrackList } from '@/fetchData'

type Props = {
    id: string | number
}

export default function TrackList({ id }: Props) {
    const tracks = useTrackList(id)

    return (
        <div className="flex flex-col items-center gap-4 text-lg">
            {tracks?.map((track) => (
                <div className="m-2" key={track.id}>
                    <Link
                        href={`/listen/album/${id}/track/${track.id}`}
                        className="p-2"
                    >
                        {track.track_title}
                    </Link>
                </div>
            ))}
        </div>
    )
}
