'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import AudioPlayer from '../AudioPlayer'
import { TranscriptionSchema } from '@/lib/validator'
import { useAlbumInfo, useTrack } from '@/fetchData'

type Props = {
    albumId: string | number
    trackId: string | number
}

export default function TrackPage({ albumId, trackId }: Props) {
    const album = useAlbumInfo(albumId)
    const [track, audioUrl] = useTrack(trackId)

    return (
        <div>
            <div className="flex gap-2 items-center">
                <Link href={`/album/${albumId}`}>{album?.album_title}</Link>
                <ChevronRight size={16} />
                <div>{track?.track_title}</div>
            </div>

            {track !== null && audioUrl !== null && (
                <div className="mt-6 w-full">
                    <AudioPlayerWrapper
                        audioUrl={audioUrl}
                        transcription={track.transcription}
                    />
                </div>
            )}
        </div>
    )
}

function AudioPlayerWrapper({
    audioUrl,
    transcription,
}: {
    audioUrl: string
    transcription: unknown
}) {
    // Should I useMemo here?
    const parseTranscription = TranscriptionSchema.safeParse(transcription)

    if (!parseTranscription.success) {
        return (
            <div className="text-red-500">invalid transcription structure</div>
        )
    }

    return (
        <AudioPlayer
            audioUrl={audioUrl}
            transcription={parseTranscription.data}
        />
    )
}
