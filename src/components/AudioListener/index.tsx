import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { PlayCircle } from 'lucide-react'
import { Transcription } from '@/types/Transcription'
import AudioOperator from './AudioOperator'
import MainAreaBySentence from './MainAreaBySentence'
import MainAreaAll from './MainAreaAll'

type Props = {
    audioUrl: string
    transcription: Transcription
    onFinish: () => void
}

export default function AudioListener({
    audioUrl,
    transcription,
    onFinish,
}: Props) {
    const [playMode, setPlayMode] = useState<'bySentence' | 'all'>('bySentence')
    const [isPlaying, setIsPlaying] = useState(false)
    const [slowPlay, setSlowPlay] = useState(false)
    const [repeatTime, setRepeatTime] = useState(0)
    const [transcriptionPartIndex, setTranscriptionPart] = useState(0)
    const [understood, setUnderstood] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    // 这里只考虑 type = 'content' 的句子
    const [contentIndex, setContentIndex] = useState(0)

    const [listenerState, setListenerState] = useState<
        'loading' | 'loaded' | 'playing'
    >('loading')

    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (audio === null) {
            return
        }

        const onCanPlay = () => {
            // I have to add this check because onCanPlay will be called many times
            if (listenerState === 'loading') {
                setListenerState('loaded')
            }
        }

        audio.addEventListener('canplay', onCanPlay)

        return () => {
            audio.removeEventListener('canplay', onCanPlay)
        }
    }, [listenerState])

    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            if (slowPlay) {
                audio.playbackRate = 0.75
            } else {
                audio.playbackRate = 1
            }
        }
    }, [slowPlay])

    const breakpoints = useMemo(
        () => transcription.map((el) => el.endTime),
        [transcription],
    )

    const handleAudioTimeUpdate = () => {
        const audio = audioRef.current
        if (audio === null) {
            console.error('audioRef.current is null')
            return
        }

        const currentTime = audio.currentTime
        setCurrentTime(audio.currentTime)

        const currentBreakpoint =
            breakpoints[transcriptionPartIndex] ?? Infinity

        const lastBreakpoint = breakpoints[transcriptionPartIndex - 1] ?? 0

        if (currentTime < currentBreakpoint) return

        if (transcriptionPart.type === 'filler') {
            setTranscriptionPart(transcriptionPartIndex + 1)
            return
        }

        if (understood || playMode === 'all') {
            setTranscriptionPart(transcriptionPartIndex + 1)
            setContentIndex(contentIndex + 1)
            setUnderstood(false)
            setRepeatTime(0)
        } else {
            audio.currentTime = lastBreakpoint
            setRepeatTime(repeatTime + 1)
        }
    }

    const handleStartPlay = () => {
        if (audioRef.current === null) {
            console.error('audioRef.current is null')
            return
        }

        setListenerState('playing')
        audioRef.current.play()
        setIsPlaying(true)
    }

    const handleTogglePlay = () => {
        if (audioRef.current === null) {
            console.error('audioRef.current is null')
            return
        }

        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            audioRef.current.play()
            setIsPlaying(true)
        }
    }

    const handleAudioEnded = () => {
        const audio = audioRef.current
        if (audio === null) {
            console.error('audioRef.current is null')
            return
        }
        if (playMode === 'all') {
            onFinish()
            return
        }

        if (!understood) {
            const lastBreakpoint = breakpoints[transcriptionPartIndex - 1] ?? 0
            audio.currentTime = lastBreakpoint
            audio.play()
        } else {
            onFinish()
        }
    }

    const handleLoadedMetadata = () => {
        const audio = audioRef.current
        if (audio === null) {
            console.error('audioRef.current is null')
            return
        }

        setDuration(audio.duration)
    }

    const contentLength = transcription.filter(
        (el) => el.type === 'content',
    ).length

    const transcriptionPart = transcription[transcriptionPartIndex]

    return (
        <div className="flex flex-col rounded items-center">
            <audio
                className="my-4"
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleAudioTimeUpdate}
                onEnded={handleAudioEnded}
                onLoadedMetadata={handleLoadedMetadata}
            />

            {listenerState === 'loading' && <div>Loading...</div>}

            {listenerState === 'loaded' && (
                <div className="mt-32 text-center">
                    <Button size="lg" onClick={handleStartPlay}>
                        <div className="flex gap-2 items-center">
                            <PlayCircle color="white" size={30} /> <p>播放</p>
                        </div>
                    </Button>
                </div>
            )}

            {listenerState === 'playing' && (
                <div>
                    {playMode === 'bySentence' ? (
                        <MainAreaBySentence
                            understood={understood}
                            transcriptionPart={transcriptionPart}
                            repeatTime={repeatTime}
                            contentIndex={contentIndex}
                            contentLength={contentLength}
                            onUnderstood={() => setUnderstood(true)}
                        />
                    ) : (
                        <MainAreaAll
                            currentTime={currentTime}
                            duration={duration}
                            transcription={transcription}
                        />
                    )}
                    <AudioOperator
                        playMode={playMode}
                        isPlaying={isPlaying}
                        slowPlay={slowPlay}
                        handleTogglePlay={handleTogglePlay}
                        handleTogglePlayBackRate={() =>
                            setSlowPlay((prev) => !prev)
                        }
                        handleChangePlayMode={() =>
                            setPlayMode((prev) =>
                                prev === 'bySentence' ? 'all' : 'bySentence',
                            )
                        }
                    />
                </div>
            )}
        </div>
    )
}
