'use client'

import formatTime from '@/lib/formatTime'
import React from 'react'
import { Play, Pause } from 'lucide-react'

type Props = {
    playing?: boolean
    togglePlay?: () => void
    currentTime: number
    audioDuration: number
    onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Slider({
    playing,
    togglePlay,
    currentTime,
    audioDuration,
    onSeek,
}: Props) {
    return (
        <div className="my-3 flex items-center gap-2">
            {playing === undefined ? null : (
                <button
                    className="btn btn-circle btn-primary"
                    onClick={togglePlay}
                >
                    {playing ? (
                        <Pause />
                    ) : (
                        //  add ml-1 to make play icon visually centered
                        <Play className="ml-1" />
                    )}
                </button>
            )}

            <input
                type="range"
                className="w-full"
                min={0}
                max={audioDuration}
                step={0.1}
                value={currentTime}
                onChange={onSeek}
            />
            <div className="whitespace-nowrap">
                <span>{formatTime(currentTime)}</span> /{' '}
                <span>{formatTime(audioDuration)}</span>
            </div>
        </div>
    )
}
