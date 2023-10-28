'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import clsx from 'clsx'
import { Transcription } from '@/types/Transcription'

type Props = {
    audioUrl: string
    transcription: Transcription
}
export default function AudioPlayer({ audioUrl, transcription }: Props) {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const [transcriptionPartIndex, setTranscriptionPart] = useState(0)
    const [understood, setUnderstood] = useState(false)
    const [showSentence, setShowSentence] = useState(false)
    const [repeatTime, setRepeatTime] = useState(0)
    const [contentIndex, setContentIndex] = useState(0)

    const transcriptionPart = transcription[transcriptionPartIndex]
    const breakpoints = transcription.map((el) => el.endTime)

    const contentLength = transcription.filter(
        (el) => el.type === 'content',
    ).length

    const handleAudioTimeUpdate = () => {
        const currentTime = audio?.currentTime
        if (currentTime === undefined) {
            return
        }
        const currentBreakpoint =
            breakpoints[transcriptionPartIndex] ?? Infinity
        const lastBreakpoint = breakpoints[transcriptionPartIndex - 1] ?? 0

        if (currentTime < currentBreakpoint) return

        if (transcriptionPart.type === 'filler') {
            setTranscriptionPart(transcriptionPartIndex + 1)
            return
        }

        if (understood) {
            setTranscriptionPart(transcriptionPartIndex + 1)
            setContentIndex(contentIndex + 1)
            setUnderstood(false)
            setShowSentence(false)
            setRepeatTime(0)
        } else {
            audio!.currentTime = lastBreakpoint
            setRepeatTime(repeatTime + 1)
        }
    }

    const handleAudioEnded = () => {
        if (!understood) {
            const lastBreakpoint = breakpoints[transcriptionPartIndex - 1] ?? 0
            audio!.currentTime = lastBreakpoint
            audio?.play()
        }
    }

    return (
        <div className="bg-red-50 p-4 flex flex-col rounded">
            <div className="flex justify-between">
                <div className="">
                    句子：{contentIndex + 1}/{contentLength}
                </div>
                <div
                    className={clsx({
                        'text-gray-500': transcriptionPart.type === 'filler',
                    })}
                >
                    重复次数: {repeatTime}
                </div>
            </div>

            <audio
                className="my-4"
                controls
                ref={setAudio}
                src={audioUrl}
                onTimeUpdate={handleAudioTimeUpdate}
                onEnded={handleAudioEnded}
            />

            <div className="my-5 mb-7 flex justify-center items-center gap-10">
                <Button
                    onClick={() => setShowSentence(true)}
                    disabled={
                        showSentence || transcriptionPart.type === 'filler'
                    }
                >
                    原文
                </Button>

                <Button
                    onClick={() => setUnderstood(true)}
                    disabled={understood || transcriptionPart.type === 'filler'}
                >
                    听懂了
                </Button>
            </div>

            {showSentence && transcriptionPart.type !== 'filler' && (
                <div>{transcriptionPart.content}</div>
            )}
        </div>
    )
}
