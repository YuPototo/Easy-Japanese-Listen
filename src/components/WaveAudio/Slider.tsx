'use client'

import formatTime from '@/lib/formatTime'
import React from 'react'
import { Play, Pause } from 'lucide-react'
// import { Play, Pause } from '../../../node_modules/lucide-react'

type Props = {
    playing: boolean
    togglePlay: () => void
    currentTime: number
    audioDuraton: number
    handleSeek: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Slider({
    playing,
    togglePlay,
    currentTime,
    audioDuraton,
    handleSeek,
}: Props) {
    return (
        <div className="my-3 flex items-center gap-2">
            <button className="btn btn-circle btn-primary" onClick={togglePlay}>
                {playing ? (
                    <Pause />
                ) : (
                    //  add ml-1 to make play icon visually centered
                    <Play className="ml-1" />
                )}
            </button>

            <input
                type="range"
                className="w-full"
                min={0}
                max={audioDuraton}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
            />
            <div className="whitespace-nowrap">
                <span>{formatTime(currentTime)}</span> /{' '}
                <span>{formatTime(audioDuraton)}</span>
            </div>
        </div>
    )
}
