import formatTime from '@/lib/formatTime'
import Slider from '../Slider'
import { Button } from '../ui/button'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'

export default function OnePassOperator() {
    const { audio: audioSlice, onePassMode } = useAudioListenerState()
    const { duration, currentTime } = audioSlice
    const { aPoint, bPoint, showTranscription } = onePassMode

    const hasAbPOints = aPoint !== null || bPoint !== null

    const dispatch = useAudioListenerDispatch()

    const handleShowTranscription = () => {
        dispatch({
            type: 'TOGGLE_SHOW_TRANSCRIPTION',
        })
    }

    const handleSeekTime = (time: number) => {
        dispatch({
            type: 'SEEK_TIME',
            payload: time,
        })
    }

    const handleJumpTime = (deltaTime: number) => {
        dispatch({
            type: 'MOVE_TIME_BY',
            payload: deltaTime,
        })
    }

    return (
        <>
            {hasAbPOints && (
                <div className="flex gap-16">
                    {aPoint && <div>A: {formatTime(aPoint)}</div>}
                    {bPoint && <div>B: {formatTime(bPoint)}</div>}
                </div>
            )}

            <Slider
                audioDuration={duration}
                currentTime={currentTime}
                onSeek={(e) => {
                    handleSeekTime(e.target.valueAsNumber)
                }}
            />

            <div className="flex w-full justify-between bg-background text-center">
                <AbPointOperator />
                <Button fill="outline" onClick={handleShowTranscription}>
                    {showTranscription ? '隐藏原文' : '显示原文'}
                </Button>
                <Button fill="outline" onClick={() => handleJumpTime(-5)}>
                    -5
                </Button>
                <Button fill="outline" onClick={() => handleJumpTime(5)}>
                    +5
                </Button>
            </div>
        </>
    )
}

function AbPointOperator() {
    const { onePassMode, audio } = useAudioListenerState()
    const { aPoint, bPoint, showTranscription } = onePassMode
    const dispatch = useAudioListenerDispatch()

    const abStatus = getAbStatus(aPoint, bPoint)

    const handleClickButtonA = () => {
        if (abStatus === 'NoAB') {
            dispatch({
                type: 'SET_A_POINT',
                payload: audio.currentTime,
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
    }

    const handleClickButtonB = () => {
        if (abStatus === 'A') {
            dispatch({
                type: 'SET_B_POINT',
                payload: audio.currentTime,
            })
        } else {
            dispatch({
                type: 'CLEAR_B_POINT',
            })
        }
    }

    return (
        <>
            <Button fill="outline" onClick={handleClickButtonA}>
                {getButtonAText(abStatus)}
            </Button>
            <Button
                disabled={abStatus === 'NoAB'}
                fill="outline"
                onClick={handleClickButtonB}
            >
                {bPoint === null ? 'B' : '- B'}
            </Button>
        </>
    )
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
