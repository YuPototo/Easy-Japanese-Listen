'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import AudioPlayer from '../AudioPlayer'
import { TranscriptionSchema } from '@/lib/validator'
import { useAlbumInfo, useTrack } from '@/fetchData'
import { useState } from 'react'

type Props = {
    albumId: string | number
    trackId: string | number
}

export default function TrackPage({ albumId, trackId }: Props) {
    const { album, isLoading } = useAlbumInfo(albumId)
    const [track, audioUrl] = useTrack(trackId)
    const [hasFinished, setHasFinished] = useState(false)

    const showAudio = track !== null && audioUrl !== null && !hasFinished

    return (
        <div>
            <div className="flex gap-2 items-center">
                <AlbumTitleLink
                    albumId={albumId}
                    isLoading={isLoading}
                    title={album?.album_title}
                />
                <ChevronRight size={16} />
                <div>{track?.track_title}</div>
            </div>

            {showAudio && (
                <div className="mt-6 w-full">
                    <AudioPlayerWrapper
                        audioUrl={audioUrl}
                        transcription={track.transcription}
                        onFinish={() => setHasFinished(true)}
                    />
                </div>
            )}

            {hasFinished && (
                <div>
                    <div>todo: 完成听力后的操作区域</div>
                </div>
            )}
        </div>
    )
}

function AlbumTitleLink({
    albumId,
    title,
    isLoading,
}: {
    albumId: string | number
    isLoading: boolean
    title?: string
}) {
    if (isLoading) {
        // todo: use a skeleton
        return <div>Loading...</div>
    }
    return <Link href={`/album/${albumId}`}>{title}</Link>
}

function AudioPlayerWrapper({
    audioUrl,
    transcription,
    onFinish,
}: {
    audioUrl: string
    transcription: unknown
    onFinish: () => void
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
            onFinish={onFinish}
        />
    )
}
