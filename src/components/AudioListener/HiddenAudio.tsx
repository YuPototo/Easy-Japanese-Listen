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

        const onCanPlay = async () => {
            try {
                throw Error('sdf')
                // await audio.play()
                // dispatch({ type: 'START_STUDY' })
            } catch (err) {
                // 仅在自动播放失败后，触发下面的 action
                dispatch({ type: 'DATA_LOADED' })
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

        dispatch({ type: 'AUDIO_TIME_UPDATE', payload: { currentTime } })

        const currentBreakpoint =
            breakpoints[transcriptionPartIndex] ?? Infinity

        const lastBreakpoint = breakpoints[transcriptionPartIndex - 1] ?? 0

        if (currentTime < currentBreakpoint) return

        const transcriptionPart = transcription[transcriptionPartIndex]

        if (transcriptionPart.type === 'filler') {
            dispatch({ type: 'FINISH_FILLER_SENTENCE' })
            return
        }

        if (understood || playMode === 'onePass') {
            dispatch({ type: 'FINISH_CONTENT_SENTENCE' })
        } else {
            audio.currentTime = lastBreakpoint
            dispatch({ type: 'SENENCE_REPEATED' })
        }
    }

    const handleAudioEnded = () => {
        console.log('audio ended')
        const audio = audioRef.current
        if (audio === null) {
            console.error('audioRef.current is null')
            return
        }
        if (playMode === 'onePass') {
            onFinish()
            return
        }

        const transcriptionPart = transcription[transcriptionPartIndex]

        const pass = understood || transcriptionPart.type === 'filler'

        if (pass) {
            onFinish()
        } else {
            const lastBreakpoint = breakpoints[transcriptionPartIndex - 1] ?? 0
            audio.currentTime = lastBreakpoint
            audio.play()
        }
    }

    const handleLoadedMetadata = () => {
        const audio = audioRef.current
        if (audio === null) {
            console.error('audioRef.current is null')
            return
        }

        dispatch({
            type: 'AUDIO_METADATA_LOADED',
            payload: { duration: audio.duration },
        })
    }

    const handleLoadError = () => {
        dispatch({ type: 'AUDIO_LOAD_ERROR' })
    }

    return (
        <audio
            className="my-4"
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleAudioTimeUpdate}
            onEnded={handleAudioEnded}
            onLoadedMetadata={handleLoadedMetadata}
            //  p3: how to identify load error?
            // Here I assume that all error is load error
            // When audio doesn't exist, there will be an error here
            onError={handleLoadError}
        />
    )
}
