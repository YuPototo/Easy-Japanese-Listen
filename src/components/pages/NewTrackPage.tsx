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

type PageStatus =
    | 'loading' // album and track are loading
    | 'loaded' // album and track are loaded, transcription is parsed
    | 'finished' // audio listener is finished
    | 'error'

export default function TrackPage({ albumId, trackId }: Props) {
    const { album, isLoading: isLoadingAlbum } = useAlbumInfo(albumId)
    const {
        track,
        audioUrl,
        isLoading: isLoadingTrack,
        error: trackError,
        loadingSuccess: trackLoadingSuccess,
    } = useTrack(trackId)

    const [pageStatus, setPageStatus] = useState<PageStatus>('loading')

    const isLoading = isLoadingAlbum || isLoadingTrack

    useEffect(() => {
        if (trackLoadingSuccess) {
            setPageStatus('loaded')
        }
    }, [trackLoadingSuccess])

    useEffect(() => {
        if (trackError) {
            setPageStatus('error')
        }
    }, [trackError])

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
                {pageStatus === 'loading' && <div>Loading...</div>}

                {pageStatus === 'error' && (
                    <div className="text-red-800">Error: {trackError}</div>
                )}

                {pageStatus === 'loaded' && (
                    <AudioListener audioUrl={audioUrl!} />
                )}

                {pageStatus === 'finished' && (
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
