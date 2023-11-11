'use client'

import Link from 'next/link'
import { useTrackList } from '@/fetchData'

type Props = {
    id: string | number
}

export default function TrackList({ id }: Props) {
    const tracks = useTrackList(id)

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
