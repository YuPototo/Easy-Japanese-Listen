import { useEffect, useMemo, useRef } from 'react'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'

type Props = {
    onFinish: () => void
}

export default function HiddenAudio({ onFinish }: Props) {
    const {
        audioUrl,
        audio: audioSlice,
        listenerState,
        transcriptionPartIndex,
        currentSentence,
        transcription,
    } = useAudioListenerState()

    const { isPlaying, playMode } = audioSlice

    const { understood } = currentSentence

    const dispatch = useAudioListenerDispatch()

    const audioRef = useRef<HTMLAudioElement | null>(null)

    // play or pause
    useEffect(() => {
        const audio = audioRef.current
        if (audio === null) {
            return
        }

        if (isPlaying) {
            audio.play()
        } else {
            audio.pause()
        }
    }, [isPlaying])

    // slow or normal speed
    useEffect(() => {
        const audio = audioRef.current
        if (audio === null) {
            return
        }

        audio.playbackRate = audioSlice.slowPlay ? 0.75 : 1
    }, [audioSlice.slowPlay])

    useEffect(() => {
        const audio = audioRef.current
        if (audio === null) {
            return
        }

        const onCanPlay = () => {
            // @ts-expect-error dispatch could be null?
            dispatch({ type: 'dataLoaded' })
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
            dispatch({ type: 'finishFiller' })
            return
        }

        if (understood || playMode === 'onePass') {
            // all these actions can be done in one dispatch: toNextSentence

            // @ts-expect-error dispatch could be null
            dispatch({ type: 'toNextContentSentence' })
        } else {
            audio.currentTime = lastBreakpoint

            // @ts-expect-error dispatch could be null?
            dispatch({ type: 'repeatSentence' })
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
        dispatch({
            type: 'audioLoaded',
            // @ts-expect-error dispatch could be null?
            payload: { duration: audio.duration },
        })
    }

    return (
        <audio
            className="my-4"
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleAudioTimeUpdate}
            onEnded={handleAudioEnded}
            onLoadedMetadata={handleLoadedMetadata}
        />
    )
}
