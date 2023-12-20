'use client'

/**
 * Only used in album page
 */

import { useAlbumInfo } from '@/fetchData'
import Image from 'next/image'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = {
    albumId: number | string
    firstTrackId?: number | string
}

export default function AlbumTopCard({ albumId, firstTrackId }: Props) {
    const { album, isLoading, error } = useAlbumInfo(albumId)

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    if (!album) return <div>Album not found</div>

    return (
        <div className="sticky top-0 bg-background pt-2">
            <div
                className="flex h-[140px] w-[310px] gap-4 rounded-md p-2"
                style={{
                    background:
                        'linear-gradient(180deg, #18204C 0%, rgba(24, 32, 76, 0.03) 64.58%)',
                }}
            >
                <Image
                    className="rounded-md"
                    src={album.coverUrl}
                    alt={album.title}
                    width="100"
                    height="125"
                />
                <div className="flex flex-grow flex-col justify-between">
                    <p>{album.title}</p>
                    <div
                        className={cn(
                            'mb-4 ml-6 transition-opacity',
                            firstTrackId ? 'opacity-100' : 'opacity-0',
                        )}
                    >
                        <Link
                            className="mt-12"
                            href={`/listen/album/${albumId}/track/${firstTrackId}`}
                        >
                            <Button>开始播放</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
