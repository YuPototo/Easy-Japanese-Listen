'use client'

import { useAlbumInfo, useTrack } from '@/fetchData'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import AudioListener from '../AudioListener'
import { useState } from 'react'
import { Button } from '../ui/button'

type Props = {
    albumId: string | number
    trackId: string | number
}

export default function TrackPage({ albumId, trackId }: Props) {
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
        <div>
            <BreadcrumbNav
                isLoading={isLoading}
                albumId={albumId}
                albumTitle={album?.album_title}
                trackTitle={track?.track_title}
            />

            <div className="my-4">
                {/* todo：use skeleton */}
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
                        //nextTrackId={5}
                    />
                )}
            </div>
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
            <div className="flex gap-2 items-center">
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className="flex gap-2 items-center">
            <Link href={`/album/${albumId}`}>{albumTitle}</Link>
            <ChevronRight size={16} />
            <div>{trackTitle}</div>
        </div>
    )
}

function FinishTrackOperator({
    albumId,
    nextTrackId,
}: {
    albumId: number | string
    nextTrackId?: number | string
}) {
    if (nextTrackId !== undefined) {
        return (
            <div className="flex gap-4 flex-col">
                <Link href={`/album/${albumId}`}>返回听力列表</Link>
                {/* todo: how to implement listen again? */}
                <Button onClick={() => console.log('todo')}>再听一次</Button>
                <Link href={`/album/${albumId}/track/${nextTrackId}`}>
                    下一个听力
                </Link>
            </div>
        )
    }
    return (
        <div className="flex gap-4 flex-col">
            <Link href={`/`}>返回专辑列表</Link>
            <Button onClick={() => console.log('todo')}>再听一次</Button>
        </div>
    )
}
