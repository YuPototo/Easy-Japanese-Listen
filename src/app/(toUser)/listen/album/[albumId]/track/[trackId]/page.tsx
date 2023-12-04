'use client'

import { useAlbumInfo, useNextTrackId, useTrack } from '@/fetchData'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import AudioListener from '@/components/AudioListener'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

type PageParam = {
    params: { albumId: string; trackId: string }
}

export default function TrackPage({ params }: PageParam) {
    const { albumId, trackId } = params

    const [trackFinished, setTrackFinished] = useState(false)

    const { album, isLoading: isLoadingAlbum } = useAlbumInfo(albumId)
    const {
        track,
        audioUrl,
        isLoading: isLoadingTrack,
        error: trackError,
        loadingSuccess: trackLoadingSuccess,
    } = useTrack(trackId)

    const isLoading = isLoadingAlbum || isLoadingTrack

    return (
        <div className="flex flex-grow flex-col">
            <BreadcrumbNav
                isLoading={isLoading}
                albumId={albumId}
                albumTitle={album?.title}
                trackTitle={track?.title}
            />

            <>
                {isLoadingTrack && <div>Loading...</div>}

                {trackError !== null && (
                    <div className="text-red-800">Error: {trackError}</div>
                )}

                {trackFinished == false && trackLoadingSuccess === true && (
                    <AudioListener
                        // @ts-expect-error when trackLoadingSuccess is true, track must be defined
                        audioUrl={audioUrl}
                        // @ts-expect-error when trackLoadingSuccess is true, track must be defined and have valid transcription
                        transcription={track.transcription}
                        onFinish={() => setTrackFinished(true)}
                    />
                )}

                {trackFinished && (
                    <FinishTrackOperator
                        albumId={albumId}
                        currentTrackId={trackId}
                        onRestart={() => setTrackFinished(false)}
                    />
                )}
            </>
        </div>
    )
}

function BreadcrumbNav({
    albumId,
    albumTitle,
    trackTitle,
    isLoading,
}: {
    albumId: number | string
    albumTitle?: string
    trackTitle?: string
    isLoading: boolean
}) {
    if (isLoading) {
        /* todo use skeleton */
        return (
            <div className="flex items-center gap-2">
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2">
            <Link href={`/listen/album/${albumId}`}>{albumTitle}</Link>
            <ChevronRight size={16} />
            <div>{trackTitle}</div>
        </div>
    )
}

function FinishTrackOperator({
    albumId,
    currentTrackId,
    onRestart,
}: {
    albumId: number | string
    currentTrackId: number | string
    onRestart: () => void
}) {
    const { nextTrackId, isLoading } = useNextTrackId(currentTrackId)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (nextTrackId !== null) {
        return (
            <div className="flex flex-col gap-4">
                <Link href={`/listen/album/${albumId}`}>返回听力列表</Link>
                <Button onClick={onRestart}>再听一次</Button>
                <Link href={`/listen/album/${albumId}/track/${nextTrackId}`}>
                    下一个听力
                </Link>
            </div>
        )
    }
    return (
        <div className="flex flex-grow flex-col items-center justify-center gap-12">
            <div>这张专辑已经听完了</div>
            <Link href={`/`}>
                <Button fill="outline">返回专辑列表</Button>
            </Link>
            <div>
                <Button onClick={onRestart}>再听一次</Button>
            </div>
        </div>
    )
}
