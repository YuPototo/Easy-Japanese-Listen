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
        onePassMode,
    } = useAudioListenerState()

    const { isPlaying, playMode, jumpToTime } = audioSlice

    const { understood } = currentSentence

    const { aPoint, bPoint } = onePassMode

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

        audio.playbackRate = audioSlice.playbackRate
    }, [audioSlice.playbackRate])

    // A hack to jump to time
    useEffect(() => {
        const audio = audioRef.current
        if (audio === null) {
            return
        }

        if (jumpToTime === null) return

        audio.currentTime = jumpToTime

        dispatch({ type: 'JUMP_TIME_FINISHED' })
    }, [jumpToTime, dispatch])

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

        if (playMode === 'onePass') {
            // change sentence
            const currentBreakpoint =
                breakpoints[transcriptionPartIndex] ?? Infinity

            if (currentTime > currentBreakpoint) {
                const transcriptionPart = transcription[transcriptionPartIndex]

                if (transcriptionPart.type === 'filler') {
                    dispatch({ type: 'FINISH_FILLER_SENTENCE' })
                } else {
                    dispatch({ type: 'FINISH_CONTENT_SENTENCE' })
                }
            }

            // check if there is ab points
            const hasAbPoints = aPoint !== null && bPoint !== null
            if (hasAbPoints) {
                if (currentTime > bPoint) {
                    audio.currentTime = aPoint
                }
            }
        }

        if (playMode === 'bySentence') {
            const currentBreakpoint =
                breakpoints[transcriptionPartIndex] ?? Infinity

            if (currentTime > currentBreakpoint) {
                const transcriptionPart = transcription[transcriptionPartIndex]

                if (transcriptionPart.type === 'filler') {
                    dispatch({ type: 'FINISH_FILLER_SENTENCE' })
                } else {
                    if (understood) {
                        dispatch({ type: 'FINISH_CONTENT_SENTENCE' })
                    } else {
                        const lastBreakpoint =
                            breakpoints[transcriptionPartIndex - 1] ?? 0
                        audio.currentTime = lastBreakpoint
                        dispatch({ type: 'SENTENCE_REPEATED' })
                    }
                }
            }
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
        console.log('loaded metadata event triggered')

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

    const handleCanPlay = async () => {
        console.log('can play event triggered')

        const audio = audioRef.current
        if (audio === null) {
            return
        }

        try {
            await audio.play()
            dispatch({ type: 'START_STUDY' })
        } catch (err) {
            console.log('auto play failed')
            // 仅在自动播放失败后，触发下面的 action
            dispatch({ type: 'DATA_LOADED' })
        }
    }

    return (
        <audio
            className="my-4"
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleAudioTimeUpdate}
            onEnded={handleAudioEnded}
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={handleCanPlay}
            // p3: how to identify load error?
            // Here I assume that all error is load error
            // When audio doesn't exist, there will be an error here
            onError={handleLoadError}
        />
    )
}
