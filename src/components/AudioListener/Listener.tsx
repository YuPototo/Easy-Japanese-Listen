import { useEffect, useMemo, useRef } from 'react'
import { Button } from '../ui/button'
import { PlayCircle } from 'lucide-react'
import { Transcription } from '@/types/Transcription'
import AudioOperator from './AudioOperator'
import MainAreaBySentence from './MainAreaBySentence'
import MainAreaAll from './MainAreaAll'
import { useAudioListenerDispatch, useAudioListenerState } from './Provider'

type Props = {
    audioUrl: string
    transcription: Transcription
    onFinish: () => void
}

export default function Listener({ audioUrl, transcription, onFinish }: Props) {
    const {
        audio,
        listenerState,
        transcriptionPartIndex,
        currentSentence: sentenceContent,
    } = useAudioListenerState()

    const dispatch = useAudioListenerDispatch()

    const { isPlaying, playMode } = audio
    const { understood } = sentenceContent

    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (audio === null) {
            return
        }

        const onCanPlay = () => {
            // I have to add this check because onCanPlay will be called many times
            if (listenerState === 'loading') {
                // @ts-expect-error dispatch could be null?
                dispatch({ type: 'dataLoaded' })
            }
        }

        audio.addEventListener('canplay', onCanPlay)

        return () => {
            audio.removeEventListener('canplay', onCanPlay)
        }
    }, [listenerState, dispatch])

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

        // @ts-expect-error dispatch could be null?
        dispatch({ type: 'audioTimeUpdate', payload: { currentTime } })

        const currentBreakpoint =
            breakpoints[transcriptionPartIndex] ?? Infinity

        const lastBreakpoint = breakpoints[transcriptionPartIndex - 1] ?? 0

        if (currentTime < currentBreakpoint) return

        const transcriptionPart = transcription[transcriptionPartIndex]

        if (transcriptionPart.type === 'filler') {
            // @ts-expect-error dispatch could be null?
            dispatch({ type: 'transcriptionPartIndexInc' })
            return
        }

        if (understood || playMode === 'onePass') {
            // all these actions can be done in one dispatch: toNextSentence

            // @ts-expect-error dispatch could be null?
            dispatch({ type: 'transcriptionPartIndexInc' })

            // @ts-expect-error dispatch could be null?
            dispatch({ type: 'contentIndexInc' })

            // @ts-expect-error dispatch could be null?
            dispatch({ type: 'resetUnderstood' })

            // @ts-expect-error dispatch could be null?
            dispatch({ type: 'resetRepeatCount' })
        } else {
            audio.currentTime = lastBreakpoint

            // @ts-expect-error dispatch could be null?
            dispatch({ type: 'incRepeatCount' })
        }
    }

    const handleStartPlay = () => {
        if (audioRef.current === null) {
            console.error('audioRef.current is null')
            return
        }

        // @ts-expect-error dispatch could be null?
        dispatch({ type: 'enterPlay' })

        audioRef.current.play()
        // @ts-expect-error dispatch could be null?
        dispatch({ type: 'startPlay' })
    }

    const handleTogglePlay = () => {
        if (audioRef.current === null) {
            console.error('audioRef.current is null')
            return
        }

        if (isPlaying) {
            audioRef.current.pause()
            // @ts-expect-error dispatch could be null?
            dispatch({ type: 'pausePlay' })
        } else {
            audioRef.current.play()
            // @ts-expect-error dispatch could be null?
            dispatch({ type: 'startPlay' })
        }
    }

    const handleAudioEnded = () => {
        const audio = audioRef.current
        if (audio === null) {
            console.error('audioRef.current is null')
            return
        }
        if (playMode === 'onePass') {
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

        // @ts-expect-error dispatch could be null?
        dispatch({ type: 'audioLoaded', payload: { duration: audio.duration } })
    }

    const handleToggleSlowPlay = () => {
        const audio = audioRef.current
        if (audio === null) {
            console.error('audioRef.current is null')
            return
        }

        // @ts-expect-error dispatch could be null?
        dispatch({ type: 'toggleSlowPlay' })
        audio.playbackRate = audio.playbackRate === 0.75 ? 1 : 0.75
    }

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
                        <MainAreaBySentence transcription={transcription} />
                    ) : (
                        <MainAreaAll transcription={transcription} />
                    )}

                    <AudioOperator
                        handleTogglePlay={handleTogglePlay}
                        onToggleSlowPlay={handleToggleSlowPlay}
                    />
                </div>
            )}
        </div>
    )
}
