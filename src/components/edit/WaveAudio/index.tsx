/*
    An audio player with Waveform that helps me edit transcripts.
*/

import { useCallback, useEffect, useRef, useState } from 'react'
import HotkeyExplain from './HotKeyExplain'
import WaveSurfer from 'wavesurfer.js'
import Slider from '../../Slider'
import PlayBackSelector from './playBackSelector'
import JumpSelector from './JumpSelector'
import formatTime from '@/lib/formatTime'

const PLAY_BACK_OPTIONS = [0.5, 0.8, 1, 1.2, 1.5]
const JUMP_SECONDS = [-5, -2, 2, 5]

type Props = {
    src: string
    onTimeUpdate: (currentTime: number) => void
}

type LoopPoints = [null, null] | [number, number | null] | [number, number]

export default function WaveAudio({
    src,
    onTimeUpdate: onAudioTimeUpdate,
}: Props) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioDuration, setAudioDuration] = useState<number | null>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [playbackRate, setPlaybackRate] = useState<number>(1)
    const [error, setError] = useState<string | null>(null)
    const [loopPoints, setLoopPoints] = useState<LoopPoints>([null, null])

    const audioRef = useRef<HTMLAudioElement | null>(null)
    const waveSurferRef = useRef<HTMLDivElement | null>(null)

    // Initialize the audio element and add event listeners
    useEffect(() => {
        audioRef.current = new Audio(src)

        const audio = audioRef.current

        const onCanPlay = () => {
            audio.play()
        }

        const onPlay = () => {
            setIsPlaying(true)
        }

        const onPause = () => {
            setIsPlaying(false)
        }

        const onLoadedMetadata = () => {
            setAudioDuration(Math.floor(audio.duration))
        }

        const onError = () => {
            setError('Error loading audio')
        }

        // on play event, set isPlaying to true
        audio.addEventListener('play', onPlay)

        // on pause event, set isPlaying to false
        audio.addEventListener('pause', onPause)

        // on loadedmetadata event, set the audio duration
        audio.addEventListener('loadedmetadata', () => {
            setAudioDuration(Math.floor(audio.duration))
        })

        // on canplay event, play the audio
        audio.addEventListener('canplay', onCanPlay)

        // on error event, set the error
        audio.addEventListener('error', onError)

        return () => {
            audio.pause()
            audio.removeEventListener('play', onPlay)
            audio.removeEventListener('loadedmetadata', onLoadedMetadata)
            audio.removeEventListener('canplay', onCanPlay)
            audio.removeEventListener('error', onError)
            audioRef.current = null
        }
    }, [src])

    // on time update, update the current time
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const hasAB =
            loopPoints && loopPoints[0] !== null && loopPoints[1] !== null

        const onTimeUpdate = () => {
            if (hasAB && audio.currentTime >= loopPoints[1]!) {
                audio.currentTime = loopPoints[0]!
            } else {
                setCurrentTime(audio.currentTime)
                onAudioTimeUpdate(audio.currentTime)
            }
        }

        audio.addEventListener('timeupdate', onTimeUpdate)

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate)
        }
    }, [loopPoints, onAudioTimeUpdate])

    // wave surfer
    useEffect(() => {
        if (!waveSurferRef.current) return
        if (!audioRef.current) return

        const waveSurfer = WaveSurfer.create({
            container: waveSurferRef.current,
            url: src,
            media: audioRef.current,
            // 这个参数可以调整波形图的密度，数字越小越密集
            minPxPerSec: 35,
        })

        return () => {
            waveSurfer.destroy()
        }
    }, [src])

    const handleTogglePlay = useCallback(async () => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
            return
        }

        try {
            await audio.play()
        } catch (error) {
            console.error(error)
        }
    }, [isPlaying])

    const handleMoveBy = (seconds: number) => {
        const audio = audioRef.current
        if (!audio) {
            console.error('audio is null')
            return
        }
        audio.currentTime += seconds
    }

    const handleSetLoop = useCallback(() => {
        if (loopPoints[0] == null) {
            setLoopPoints([currentTime, null])
        } else if (loopPoints[1] == null) {
            setLoopPoints([loopPoints[0], currentTime])
        } else {
            setLoopPoints([null, null])
        }
    }, [currentTime, loopPoints])

    // hot key: play / pause
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // alt is option on mac
            if (event.altKey && event.code === 'Space') {
                event.preventDefault() // Prevent scrolling on some browsers
                handleTogglePlay()
            } else if (event.altKey && event.code === 'ArrowLeft') {
                handleMoveBy(-2)
            } else if (event.altKey && event.code === 'ArrowRight') {
                handleMoveBy(2)
            } else if (event.altKey && event.code === 'ArrowUp') {
                event.preventDefault() // Prevent default actions
                handleSetLoop()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleSetLoop, handleTogglePlay])

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current
        if (!audio) {
            console.error('audio is null')
            return
        }
        audio.currentTime = Number(event.target.value)
    }

    const handleSetPlayBackRate = (speed: number) => {
        const audio = audioRef.current
        if (!audio) {
            console.error('audio is null')
            return
        }
        audio.playbackRate = speed
        setPlaybackRate(speed)
    }

    if (error) {
        return (
            <div className="my-4 rounded bg-red-500 p-2 text-white">
                {error}
            </div>
        )
    }

    return (
        <div>
            <HotkeyExplain />

            {/* todo t3: 不使用绝对值 */}
            <div className="w-[1200px]" ref={waveSurferRef} />

            {audioDuration && (
                <div className="mb-4">
                    <Slider
                        playing={isPlaying}
                        togglePlay={handleTogglePlay}
                        currentTime={currentTime}
                        audioDuration={audioDuration}
                        onSeek={handleSeek}
                    />
                </div>
            )}

            <div className="flex items-center justify-between">
                <JumpSelector options={JUMP_SECONDS} moveBy={handleMoveBy} />
                <PlayBackSelector
                    options={PLAY_BACK_OPTIONS}
                    playbackRate={playbackRate}
                    setPlaybackRate={handleSetPlayBackRate}
                />
            </div>

            <div className="my-2 flex items-center gap-4">
                {loopPoints[0] !== null && (
                    <div>A {formatTime(loopPoints[0])}</div>
                )}
                {loopPoints[1] !== null && (
                    <div>B {formatTime(loopPoints[1])}</div>
                )}
            </div>
        </div>
    )
}
