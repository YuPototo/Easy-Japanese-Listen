import { Check, Pause, PlayCircle } from 'lucide-react'
import { Button } from '../ui/button'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'

type Props = {}

export default function MainOperator({}: Props) {
    const { audio } = useAudioListenerState()
    const { playMode, isPlaying, slowPlay } = audio

    const dispatch = useAudioListenerDispatch()

    return (
        <div className="my-6 flex w-full justify-around">
            <Button
                fill="outline"
                onClick={() => dispatch({ type: 'TOGGLE_MODE' })}
            >
                {playMode == 'bySentence' ? '全文' : '分句'}
            </Button>

            <Button
                fill="outline"
                size="icon"
                onClick={() => dispatch({ type: 'TOGGLE_PLAY_AUDIO' })}
            >
                {isPlaying ? <Pause size={20} /> : <PlayCircle size={20} />}
            </Button>

            <Button
                fill="outline"
                onClick={() => dispatch({ type: 'TOGGLE_SLOW_PLAY' })}
                className="flex gap-2"
            >
                {slowPlay ? '常速' : '慢速'}
            </Button>
        </div>
    )
}
