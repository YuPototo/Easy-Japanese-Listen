'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import clsx from 'clsx'
import { Transcription } from '@/types/Transcription'
import { Check, Pause, PlayCircle } from 'lucide-react'

type Props = {
    audioUrl: string
    transcription: Transcription
}

// todo: handle audio not found problem

export default function AudioPlayer({ audioUrl, transcription }: Props) {
    const [started, setStarted] = useState(false)
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const [transcriptionPartIndex, setTranscriptionPart] = useState(0)
    const [understood, setUnderstood] = useState(false)
    const [showSentence, setShowSentence] = useState(false)
    const [repeatTime, setRepeatTime] = useState(0)
    const [contentIndex, setContentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [slowPlay, setSlowPlay] = useState(false)

    const transcriptionPart = transcription[transcriptionPartIndex]
    const breakpoints = transcription.map((el) => el.endTime)

    const contentLength = transcription.filter(
        (el) => el.type === 'content',
    ).length

    const handleStartPlay = () => {
        setStarted(true)
    }

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

        if (
            transcriptionPart.type === 'content' &&
            transcriptionPart.autoSkip
        ) {
            console.log('auto skip')
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

    const handleTogglePlay = () => {
        if (audio?.paused) {
            audio?.play()
        } else {
            audio?.pause()
        }
    }

    useEffect(() => {
        if (audio) {
            audio.onplay = () => {
                setIsPlaying(true)
            }
            audio.onpause = () => {
                setIsPlaying(false)
            }
        }
    }, [audio])

    useEffect(() => {
        if (audio) {
            if (slowPlay) {
                audio.playbackRate = 0.75
            } else {
                audio.playbackRate = 1
            }
        }
    }, [slowPlay, audio])

    if (!started) {
        return (
            <div className="mt-32">
                <Button size="lg" onClick={handleStartPlay}>
                    <div className="flex gap-2 items-center">
                        <PlayCircle color="white" size={30} /> <div>Play</div>
                    </div>
                </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col rounded">
            <audio
                className="my-4"
                autoPlay
                ref={setAudio}
                src={audioUrl}
                onTimeUpdate={handleAudioTimeUpdate}
                onEnded={handleAudioEnded}
            />

            <div className="self-start">
                句子：{contentIndex + 1}/{contentLength}
            </div>

            <div className="flex justify-around">
                <Button variant="outline" onClick={handleTogglePlay}>
                    {isPlaying ? <Pause size={20} /> : <PlayCircle size={20} />}
                </Button>

                <Button
                    variant="outline"
                    onClick={() => setSlowPlay(!slowPlay)}
                >
                    {slowPlay && <Check />}慢
                </Button>
            </div>

            {transcriptionPart.type === 'content' && (
                <Sentence
                    repeatCount={repeatTime}
                    text={transcriptionPart.content}
                    showSentence={showSentence}
                    understood={understood}
                />
            )}

            <div className="my-5 mb-7 flex justify-center items-center gap-10">
                <Button
                    onClick={() => setShowSentence(true)}
                    disabled={
                        showSentence || transcriptionPart.type === 'filler'
                    }
                >
                    没听懂
                </Button>

                <Button
                    onClick={() => setUnderstood(true)}
                    disabled={understood || transcriptionPart.type === 'filler'}
                >
                    听懂了
                </Button>
            </div>
        </div>
    )
}

function Sentence({
    repeatCount,
    text,
    showSentence,
    understood,
}: {
    repeatCount: number
    text: string
    showSentence: boolean
    understood: boolean
}) {
    return (
        <div className="flex flex-col items-center">
            {showSentence ? (
                <div className={clsx({ 'text-green-700': understood })}>
                    {text}
                </div>
            ) : (
                <div>
                    <div className="h-10 bg-gray-700 rounded"></div>
                    <div className="text-gray-500">重复次数: {repeatCount}</div>
                </div>
            )}
        </div>
    )
}
