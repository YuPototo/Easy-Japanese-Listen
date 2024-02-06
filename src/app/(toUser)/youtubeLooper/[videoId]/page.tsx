'use client'

import { AbRepeatAction } from '@/components/AudioListener/StateProvider/type'
import { Button } from '@/components/ui/button'
import formatTime from '@/lib/formatTime'
import clsx from 'clsx'
import React, {
    useRef,
    useState,
    useReducer,
    useEffect,
    useCallback,
} from 'react'
import { OnProgressProps } from 'react-player/base'
import ReactPlayer from 'react-player/youtube'

type PageParam = {
    params: { videoId: string }
}

type LoopRange = [number, number] | [number, number | null] | [null, null]

const initialLoopRange: LoopRange = [null, null]

export default function YoutubeLooperPage({ params }: PageParam) {
    const [playing, setPlaying] = useState<boolean>(true)
    const [loopRange, dispatch] = useReducer(loopRangeReducer, initialLoopRange)
    const [hideOverlay, setHideOverlay] = useState<boolean>(false)

    const videoRef = useRef<ReactPlayer>(null)

    const handleTogglePlay = useCallback(() => {
        setPlaying((prev) => !prev)
    }, [])

    const [loopStart, loopEnd] = loopRange

    const moveBy = useCallback(
        (bySeconds: number) => {
            if (!videoRef.current) {
                console.error('videoRef is not set')
                return
            }

            const currentTime = videoRef.current.getCurrentTime()

            if (loopStart && loopEnd) {
                if (currentTime + bySeconds < loopStart) {
                    videoRef.current.seekTo(loopStart)
                } else if (currentTime + bySeconds > loopEnd) {
                    videoRef.current.seekTo(loopEnd)
                } else {
                    videoRef.current.seekTo(currentTime + bySeconds)
                }
            } else {
                videoRef.current.seekTo(currentTime + bySeconds)
            }
        },
        [loopStart, loopEnd],
    )

    const abStatus = getAbStatus(loopStart, loopEnd)

    const handleClickButtonA = useCallback(() => {
        if (!videoRef.current) {
            console.error('videoRef is not set')
            return
        }

        if (abStatus === 'NoAB') {
            dispatch({
                type: 'SET_A_POINT',
                payload: videoRef.current.getCurrentTime(),
            })
        } else if (abStatus === 'A') {
            dispatch({
                type: 'CLEAR_A_POINT',
            })
        } else {
            dispatch({
                type: 'CLEAR_AB_POINT',
            })
        }
    }, [abStatus])

    const handleClickButtonB = useCallback(() => {
        if (!videoRef.current) {
            console.error('videoRef is not set')
            return
        }

        if (abStatus === 'A') {
            dispatch({
                type: 'SET_B_POINT',
                payload: videoRef.current.getCurrentTime(),
            })
        } else {
            dispatch({
                type: 'CLEAR_B_POINT',
            })
        }
    }, [abStatus])

    // right arrow to move forward
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && event.code === 'Space') {
                event.preventDefault() // Prevent scrolling on some browsers
                handleTogglePlay()
            } else if (event.code === 'ArrowLeft') {
                moveBy(-5)
            } else if (event.code === 'ArrowRight') {
                moveBy(5)
            } else if (event.shiftKey && event.key === 'A') {
                event.preventDefault() // Prevent default actions
                handleClickButtonA()
            } else if (event.shiftKey && event.key === 'B') {
                event.preventDefault() // Prevent default actions
                handleClickButtonB()
            } else if (event.shiftKey && event.key === 'O') {
                event.preventDefault() // Prevent default actions
                setHideOverlay((prev) => !prev)
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleTogglePlay, moveBy, handleClickButtonA, handleClickButtonB])

    const handleProgress = (props: OnProgressProps) => {
        const { playedSeconds } = props
        const [loopStart, loopEnd] = loopRange
        if (loopStart && loopEnd) {
            if (playedSeconds >= loopEnd) {
                videoRef.current?.seekTo(loopStart)
            }
        }
    }

    const moveProgressBy = (toSeconds: number) => {
        if (videoRef.current) {
            const currentTime = videoRef.current.getCurrentTime()
            videoRef.current.seekTo(currentTime + toSeconds)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative h-[300px] w-full md:h-[600px]">
                <div className="absolute left-0 top-0 h-full w-full">
                    <ReactPlayer
                        controls
                        ref={videoRef}
                        playing={playing}
                        width="100%"
                        height="100%"
                        url={`https://www.youtube.com/watch?v=${params.videoId}`}
                        onProgress={handleProgress}
                    />
                </div>
                <div
                    className={clsx(
                        'absolute bottom-0 h-[80px] w-full bg-gray-600 md:h-[120px]',
                        { invisible: hideOverlay },
                    )}
                ></div>
            </div>

            <div className="my-4 flex flex-col gap-4">
                <div className="flex gap-4">
                    <Button btnColor="gray" onClick={handleClickButtonA}>
                        {getButtonAText(abStatus)}
                    </Button>

                    <Button
                        btnColor="gray"
                        onClick={handleClickButtonB}
                        disabled={loopStart === null}
                    >
                        {loopEnd === null ? 'B' : '- B'}
                    </Button>
                </div>

                <div className="flex gap-4">
                    <Button btnColor="gray" onClick={() => moveProgressBy(-5)}>
                        -5
                    </Button>
                    <Button btnColor="gray" onClick={() => moveProgressBy(5)}>
                        +5
                    </Button>
                </div>

                <Button
                    btnColor="gray"
                    onClick={() => setHideOverlay((prev) => !prev)}
                >
                    {hideOverlay ? 'Show' : 'Hide'} overlay
                </Button>

                <Button
                    fill="outline"
                    btnColor="orange"
                    onClick={handleTogglePlay}
                    size="lg"
                >
                    {playing ? 'Pause' : 'Play'}
                </Button>
            </div>

            <div className="mt-4 flex gap-4">
                <div className={clsx({ invisible: loopStart === null })}>
                    A: {loopStart && formatTime(loopStart)}
                </div>
                <div className={clsx({ invisible: loopEnd === null })}>
                    B: {loopEnd && formatTime(loopEnd)}
                </div>
            </div>

            <HotKeys />
        </div>
    )
}

function HotKeys() {
    const [showHotkeys, setShowHotkeys] = useState<boolean>(false)

    return (
        <div className="mt-12">
            <Button
                btnColor="gray"
                onClick={() => setShowHotkeys((prev) => !prev)}
            >
                Hotkeys
            </Button>
            {showHotkeys && (
                <div className="">
                    <div>Shift + Space: Play/Pause</div>
                    <div>Left: -5s</div>
                    <div>Right: +5s</div>
                    <div>
                        Shift + A: Set A point, or cancel A point, or cancel AB
                        points
                    </div>
                    <div>Shift + B: Set B point, or cancel B point</div>
                    <div>Shift + O: Toggle Overlay</div>
                </div>
            )}
        </div>
    )
}

function loopRangeReducer(state: LoopRange, action: AbRepeatAction): LoopRange {
    switch (action.type) {
        case 'SET_A_POINT':
            return [action.payload, null]
        case 'SET_B_POINT':
            if (state[0] === null) {
                throw new Error('A point is not set')
            }
            return [state[0], action.payload]
        case 'CLEAR_A_POINT':
            if (state[1] !== null) {
                throw new Error(
                    "B point shouldn't be set when clearing A point",
                )
            }
            return [null, state[1]]
        case 'CLEAR_B_POINT':
            return [state[0], null]
        case 'CLEAR_AB_POINT':
            return [null, null]
        default: {
            // @ts-expect-error if you see ts error, it means you forgot to handle an action
            throw new Error('Unknown action: ' + action.type)
        }
    }
}

function getAbStatus(
    aPoint: number | null,
    bPoint: number | null,
): 'NoAB' | 'A' | 'AB' {
    if (aPoint === null && bPoint === null) {
        return 'NoAB'
    } else if (aPoint !== null && bPoint === null) {
        return 'A'
    } else if (aPoint !== null && bPoint !== null) {
        return 'AB'
    }
    throw new Error('unreachable')
}

function getButtonAText(abStatus: 'NoAB' | 'A' | 'AB'): 'A' | '- A' | '- AB' {
    if (abStatus === 'NoAB') {
        return 'A'
    } else if (abStatus === 'A') {
        return '- A'
    } else {
        return '- AB'
    }
}
