'use client'

import { useAlbumInfo, useTrack } from '@/fetchData'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import AudioListener from '../AudioListener'
import { useEffect, useState } from 'react'

type Props = {
    albumId: string | number
    trackId: string | number
}

export default function TrackPage({ albumId, trackId }: Props) {
    const { album, isLoading: isLoadingAlbum } = useAlbumInfo(albumId)
    const {
        track,
        audioUrl,
        isLoading: isLoadingTrack,
        error: trackError,
        loadingSuccess: trackLoadingSuccess,
    } = useTrack(trackId)

    const isLoading = isLoadingAlbum || isLoadingTrack

    const [pageState, setPageState] = usePageState({
        trackLoadingSuccess,
        trackError,
    })

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
                {pageState === 'loading' && <div>Loading...</div>}

                {pageState === 'error' && (
                    <div className="text-red-800">Error: {trackError}</div>
                )}

                {pageState === 'loaded' && (
                    <AudioListener
                        audioUrl={audioUrl!}
                        //@ts-expect-error
                        transcription={track!.transcription}
                        onFinish={() => setPageState('finished')}
                    />
                )}

                {pageState === 'finished' && (
                    <div>todo: 完成听力后的操作区域</div>
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
        /* todo：use skeleton */
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

type PageState =
    | 'loading' // album and track are loading
    | 'loaded' // album and track are loaded, transcription is parsed
    | 'finished' // audio listener is finished
    | 'error'

function usePageState({
    trackLoadingSuccess,
    trackError,
}: {
    trackLoadingSuccess: boolean
    trackError: string | null
}) {
    const [pageState, setPageState] = useState<PageState>('loading')

    useEffect(() => {
        if (trackLoadingSuccess) {
            setPageState('loaded')
        }
    }, [trackLoadingSuccess])

    useEffect(() => {
        if (trackError) {
            setPageState('error')
        }
    }, [trackError])

    return [pageState, setPageState] as const
}
