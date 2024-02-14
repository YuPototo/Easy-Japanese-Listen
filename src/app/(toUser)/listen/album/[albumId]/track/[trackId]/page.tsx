'use client'

import { useAlbumInfo, useNextTrackId, useTrack } from '@/fetchData/clientFetch'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import AudioListener from '@/components/AudioListener'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import LoadingAudioSkeleton from '@/components/LoadingAudioSkeleton'

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

    return (
        <div className="mx-auto flex flex-grow flex-col md:w-2/3">
            <BreadcrumbNav
                isLoading={isLoadingAlbum}
                albumId={albumId}
                albumTitle={album?.title}
                trackTitle={track?.title}
            />

            <>
                {isLoadingTrack && <LoadingAudioSkeleton />}

                {trackError !== null && (
                    <div className="text-red-800">Error: {trackError}</div>
                )}

                {trackFinished == false && trackLoadingSuccess === true && (
                    <AudioListener
                        audioUrl={audioUrl}
                        //@ts-expect-error
                        transcription={track.transcription}
                        //@ts-expect-error
                        sections={track.sections}
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
        return (
            <div className="mb-8 flex animate-pulse items-center gap-2">
                <div className="h-6 w-24 rounded bg-gray-500"></div>
                <ChevronRight size={16} />
                <div className="h-6 w-12 rounded bg-gray-500"></div>
            </div>
        )
    }

    return (
        <div className="mb-8 flex items-center gap-2">
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
        return <div>Loading Next Track Info...</div>
    }

    if (nextTrackId !== null) {
        return (
            <div className="-mt-32 flex flex-grow flex-col items-center justify-center gap-12">
                <Link href={`/listen/album/${albumId}`}>
                    <Button fill="outline">返回听力列表</Button>
                </Link>
                <Button fill="outline" onClick={onRestart}>
                    再听一次
                </Button>
                <Link href={`/listen/album/${albumId}/track/${nextTrackId}`}>
                    <Button>下一个听力</Button>
                </Link>
            </div>
        )
    }
    return (
        <div className="-mt-32 flex flex-grow flex-col items-center justify-center gap-12">
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
