'use client'

import { Button } from '@/components/ui/button'
import { useAlbumInfo, useTrackList } from '@/fetchData'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type Props = {
    albumId: string | number
}

export default function EditAlbumPage({ albumId }: Props) {
    const [updateType, setUpdateType] = useState<'add' | 'update'>('add')

    const [selectedTrack, setSelectedTrack] = useState<number | null>(null)

    const album = useAlbumInfo(albumId)
    const tracks = useTrackList(albumId)

    const handleClickTrack = (id: number) => {
        setUpdateType('update')
        setSelectedTrack(id)
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
                        <Button onClick={() => setUpdateType('add')}>
                            Add Track
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex-grow">
                {updateType === 'add' ? (
                    <div>
                        <h2>Add Track</h2>
                        <div>添加音频至少有几个步骤</div>
                        <div>1. 输入音频 title 和 filename</div>
                        <div>2. 输入 transcription</div>
                        <div>3. 预览</div>
                        <div>4. 保存</div>

                        <div>
                            我需要另一个 component，专门处理上面的几个状态
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Update Track {selectedTrack}</h2>
                    </div>
                )}
            </div>
        </div>
    )
}
