'use client'

import AddTrack from '@/components/AddTrack'
import UpdateTrack from '@/components/UpdateTrack'
import { Button } from '@/components/ui/button'
import { useAlbumInfo, useTrackList } from '@/fetchData'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type Props = {
    albumId: string | number
}

export default function EditAlbumPage({ albumId }: Props) {
    const [pageState, setPageState] = useState<'add' | 'update' | 'initial'>(
        'initial',
    )
    const [selectedTrack, setSelectedTrack] = useState<number | null>(null)

    const album = useAlbumInfo(albumId)
    const tracks = useTrackList(albumId)

    const handleClickTrack = (id: number) => {
        setPageState('update')
        setSelectedTrack(id)
    }

    const handleAddTrack = () => {
        setPageState('add')
        setSelectedTrack(null)
    }

    const handleSubmit = () => {
        setPageState('initial')
    }

    return (
        <div className="h-full flex gap-6">
            <div className="w-[200px] bg-gray-800 h-full p-2">
                <div className="text-lg mb-10">{album?.album_title}</div>

                <div>
                    {tracks?.map((track) => (
                        <div
                            className={cn(
                                'my-2 p-2 rounded hover:bg-green-800 hover:cursor-pointer',
                                selectedTrack === track.id && 'bg-green-800 ',
                            )}
                            key={track.id}
                            onClick={() => handleClickTrack(track.id)}
                        >
                            {track.track_title}
                        </div>
                    ))}

                    <div>
                        <Button onClick={handleAddTrack}>Add Track</Button>
                    </div>
                </div>
            </div>

            <div className="flex-grow">
                {pageState === 'initial' && <InitialInfo />}

                {pageState === 'add' && (
                    <AddTrack albumId={albumId} onAdded={handleSubmit} />
                )}

                {pageState === 'update' && selectedTrack != null && (
                    <UpdateTrack
                        trackId={selectedTrack}
                        onUpdated={() => setPageState('initial')}
                    />
                )}
            </div>
        </div>
    )
}

function InitialInfo() {
    return (
        <div>
            <h2>完成一个 track 的新增或更新后，需要刷新才会更新 content</h2>
        </div>
    )
}
