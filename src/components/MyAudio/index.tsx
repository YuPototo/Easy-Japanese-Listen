'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'
import Slider from './Slider'
import { AbLooper } from './AbLooper'
import { Button } from '../ui/button'
import WaveSurfer from 'wavesurfer.js'

interface indexProps {
    src: string
    onError: (message: string) => void
    onTimeUpdate: (currentTime: number) => void
}

const JUMP_SECONDS = [-10, -5, -2, 2, 5, 10]
const PLAY_BACK_OPTIONS = [0.8, 0.9, 1, 1.1, 1.2]

const SmartAudio: FC<indexProps> = ({ src, onError, onTimeUpdate }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [audioDuraton, setAudioDuration] = useState(0)
    const [aPoint, setAPoint] = useState<number | null>(null)
    const [bPoint, setBPoint] = useState<number | null>(null)
    const [playbackRate, setPlaybackRate] = useState<number>(1)

    const waveSurferRef = useRef<HTMLDivElement | null>(null)

    // Initialize the audio element
    useEffect(() => {
        const newAudio = new Audio(src)
        audioRef.current = newAudio
        setAudio(newAudio)
        newAudio.play()

        return () => {
            newAudio.pause()
            audioRef.current = null
            setAudio(null)
        }
    }, [src])

    // wave surfer
    useEffect(() => {
        if (!waveSurferRef.current) return
        if (!audioRef.current) return

        const waveSurfer = WaveSurfer.create({
            container: waveSurferRef.current,
            url: src,
            media: audioRef.current,
            minPxPerSec: 50,
        })

        return () => {
            waveSurfer.destroy()
        }
    }, [src])

    // auto play
    useEffect(() => {
        audio?.play().then(() => setPlaying(true))
    }, [audio])

    // set audio duration
    useEffect(() => {
        audio?.addEventListener('loadedmetadata', () => {
            setAudioDuration(Math.floor(audio.duration))
        })
    }, [audio])

    // play event listener
    useEffect(() => {
        audio?.addEventListener('play', () => {
            setPlaying(true)
        })
    }, [audio])

    // pause event listener
    useEffect(() => {
        audio?.addEventListener('pause', () => {
            setPlaying(false)
        })
    }, [audio])

    // error event listener
    useEffect(() => {
        audio?.addEventListener('error', () => {
            onError('Audio load error, maybe not url is wrong')
        })
    }, [audio, onError])

    // time update event listener
    useEffect(() => {
        const handleTimeUpdate = () => {
            audio !== null && setCurrentTime(audio.currentTime)

            // Add this condition to handle A/B looping
            if (
                aPoint !== null &&
                bPoint !== null &&
                audio &&
                audio.currentTime >= bPoint
            ) {
                audio.currentTime = aPoint
            }

            onTimeUpdate(audio!.currentTime)
        }

        audio?.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            audio?.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [audio, aPoint, bPoint, onTimeUpdate])

    // change playback rate
    useEffect(() => {
        if (audio) audio.playbackRate = playbackRate
    }, [audio, playbackRate])

    const togglePlay = useCallback(() => {
        if (playing) {
            audio?.pause()
        } else {
            audio?.play()
        }
    }, [audio, playing])

    const moveBy = useCallback(
        (seconds: number) => {
            if (!audio) return

            let newTime = audio.currentTime + seconds

            if (aPoint !== null && bPoint !== null) {
                if (seconds < 0 && newTime < aPoint) {
                    newTime = aPoint
                } else if (seconds > 0 && newTime > bPoint) {
                    newTime = bPoint
                }
            }

            audio.currentTime = Math.min(audioDuraton, Math.max(0, newTime))
        },
        [audio, audioDuraton, aPoint, bPoint],
    )

    const handleABSetter = useCallback(() => {
        if (aPoint === null) {
            setAPoint(currentTime)
        } else if (bPoint === null) {
            setBPoint(currentTime)
        } else {
            setAPoint(null)
            setBPoint(null)
        }
    }, [aPoint, bPoint, currentTime])

    // right arrow to move forward
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // alt is option on mac
            if (event.altKey && event.code === 'Space') {
                event.preventDefault() // Prevent scrolling on some browsers
                togglePlay()
            } else if (event.altKey && event.code === 'ArrowLeft') {
                moveBy(-2)
            } else if (event.altKey && event.code === 'ArrowRight') {
                moveBy(2)
            } else if (event.altKey && event.code === 'ArrowUp') {
                event.preventDefault() // Prevent default actions
                handleABSetter()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [togglePlay, moveBy, handleABSetter])

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!audio) return
        const newTime = parseInt(event.target.value, 10)
        setCurrentTime(newTime)
        audio.currentTime = newTime
    }

    return (
        <div className="">
            <HotkeyExplain />
            <PlayBackKey
                playbackRate={playbackRate}
                setPlaybackRate={setPlaybackRate}
            />

            {/* todo: 不使用绝对值 */}
            <div className="w-[1000px]" ref={waveSurferRef} />

            <Slider
                playing={playing}
                togglePlay={togglePlay}
                currentTime={currentTime}
                audioDuraton={audioDuraton}
                handleSeek={handleSeek}
            />
            <SetJumpSeconds moveBy={moveBy} />

            <AbLooper
                aPoint={aPoint}
                bPoint={bPoint}
                onSetPoint={handleABSetter}
            />
        </div>
    )
}

export default SmartAudio

function HotkeyExplain() {
    const [show, setShow] = useState(false)
    return (
        <div className="my-4 flex flex-col gap-2">
            <div className="flex gap-4 items-center">
                <h3>Hotkey</h3>
                <Button
                    onClick={() => setShow((prev) => !prev)}
                    size="sm"
                    fill="outline"
                >
                    {show ? 'hide' : 'show'}
                </Button>
            </div>
            {show && (
                <>
                    <div className="flex gap-8">
                        <code className="bg-gray-700 px-2">alt + space</code>{' '}
                        <div> play/pause</div>
                    </div>
                    <div className="flex gap-8">
                        <code className="bg-gray-700 px-2">alt + left</code>{' '}
                        <div>move back 2 seconds</div>
                    </div>
                    <div className="flex gap-8">
                        <code className="bg-gray-700 px-2">alt + right</code>{' '}
                        <div>move forward 2 seconds</div>
                    </div>
                    <div className="flex gap-8">
                        <code className="bg-gray-700 px-2">alt + up</code>{' '}
                        <div>set A/B point</div>
                    </div>
                </>
            )}
        </div>
    )
}

function PlayBackKey({
    playbackRate,
    setPlaybackRate,
}: {
    playbackRate: number
    setPlaybackRate: (speed: number) => void
}) {
    return (
        <div className=" flex items-center gap-4">
            <div> playback</div>
            {PLAY_BACK_OPTIONS.map((speed) => (
                <Button
                    size="sm"
                    fill={playbackRate === speed ? 'fill' : 'outline'}
                    key={speed}
                    onClick={() => setPlaybackRate(speed)}
                >
                    {speed}
                </Button>
            ))}
        </div>
    )
}

function SetJumpSeconds({ moveBy }: { moveBy: (seconds: number) => void }) {
    return (
        <div className="flex gap-4">
            {JUMP_SECONDS.map((second) => (
                <Button
                    size="sm"
                    fill="outline"
                    key={second}
                    onClick={() => moveBy(second)}
                >
                    {second < 0 ? '-' : '+'} {Math.abs(second)} s
                </Button>
            ))}
        </div>
    )
}
