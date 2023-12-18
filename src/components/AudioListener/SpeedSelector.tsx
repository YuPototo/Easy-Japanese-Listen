import { useState } from 'react'
import { Button } from '../ui/button'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'

export default function SpeedSelector() {
    const [showSelector, setShowSelector] = useState(false)
    const dispatch = useAudioListenerDispatch()

    const { audio } = useAudioListenerState()

    const { playbackRate } = audio

    const handleChangePlaybackRate = (rate: number) => {
        dispatch({
            type: 'SET_PLAYBACK_RATE',
            payload: rate,
        })
        setShowSelector(false)
    }

    return (
        <div className="relative">
            {showSelector && (
                <div className="absolute bottom-0 mb-16 flex flex-col gap-3 rounded bg-gray-600 p-2">
                    <Button
                        fill="outline"
                        onClick={() => handleChangePlaybackRate(0.7)}
                    >
                        0.7x
                    </Button>
                    <Button
                        fill="outline"
                        onClick={() => handleChangePlaybackRate(1)}
                    >
                        1.0x
                    </Button>
                    <Button
                        fill="outline"
                        onClick={() => handleChangePlaybackRate(1.3)}
                    >
                        1.3x
                    </Button>
                </div>
            )}
            <Button
                fill="outline"
                // show play back rate selection
                onClick={() => setShowSelector(!showSelector)}
                className="flex gap-2"
            >
                {TransformNumberText(playbackRate)}x
            </Button>
        </div>
    )
}

/**
 * transform 1 to 1.0,
 *  1.5 to 1.5,
 *  0.8 to 0.8
 */
function TransformNumberText(num: number): string {
    if (num === 1) {
        return '1.0'
    }
    return num.toString()
}
