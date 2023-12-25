import { Pause, PlayCircle } from 'lucide-react'
import { Button } from '../ui/button'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'
import SpeedSelector from './SpeedSelector'

export default function MainOperator() {
    const { audio } = useAudioListenerState()
    const { playMode, isPlaying } = audio

    const dispatch = useAudioListenerDispatch()

    return (
        <div className="flex w-full justify-around p-2 pb-5">
            <Button
                fill="outline"
                onClick={() => dispatch({ type: 'TOGGLE_MODE' })}
            >
                {playMode == 'bySentence' ? '全文' : '分句'}
            </Button>

            <div
                className="flex items-center hover:cursor-pointer"
                onClick={() => dispatch({ type: 'TOGGLE_PLAY_AUDIO' })}
            >
                {isPlaying ? (
                    <Pause size={35} color="#EA580C" strokeWidth={1} />
                ) : (
                    <PlayCircle size={35} color="#EA580C" strokeWidth={1} />
                )}
            </div>

            <SpeedSelector />
        </div>
    )
}
