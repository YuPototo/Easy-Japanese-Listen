'use client'

import NewAudio from '@/components/NewAudio'
import { Button } from '@/components/ui/button'
import { useAlbumInfo, useTrackList } from '@/fetchData'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type Props = {
    albumId: string | number
}

export default function EditAlbumPage({ albumId }: Props) {
    const [updateType, setUpdateType] = useState<'add' | 'update' | null>(null)

    const [selectedTrack, setSelectedTrack] = useState<number | null>(null)

    const album = useAlbumInfo(albumId)
    const tracks = useTrackList(albumId)

    const handleClickTrack = (id: number) => {
        setUpdateType('update')
        setSelectedTrack(id)
    }

    const handleAddTrack = () => {
        setUpdateType('add')
        setSelectedTrack(null)
    }

    const handleAdded = () => {
        setUpdateType(null)
        setSelectedTrack(null)
    }

    return (
        <div className="h-full flex gap-2">
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
                {updateType === 'add' && (
                    <div>
                        <h2>Add Track</h2>
                        <NewAudio albumId={albumId} onAdded={handleAdded} />
                    </div>
                )}

                {updateType === 'update' && (
                    <div>
                        <h2>Update Track {selectedTrack}</h2>
                    </div>
                )}

                {!updateType && (
                    <div>新增 track 后，需要手动刷新页面看到更新</div>
                )}
            </div>
        </div>
    )
}
