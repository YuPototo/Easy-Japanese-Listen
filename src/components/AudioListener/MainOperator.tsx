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
        <div className="flex justify-around my-6 w-full">
            <Button
                fill="outline"
                btnColor="gray"
                // @ts-expect-error dispatch could be null?
                onClick={() => dispatch({ type: 'toggleMode' })}
            >
                {playMode == 'bySentence' ? '全文' : '分句'}
            </Button>

            <Button
                fill="outline"
                btnColor={isPlaying ? 'gray' : 'orange'}
                size="icon"
                // @ts-expect-error dispatch could be null?
                onClick={() => dispatch({ type: 'togglePlay' })}
            >
                {isPlaying ? <Pause size={20} /> : <PlayCircle size={20} />}
            </Button>

            <Button
                fill="outline"
                btnColor="gray"
                // @ts-expect-error dispatch could be null?
                onClick={() => dispatch({ type: 'toggleSlowPlay' })}
                className="flex gap-2"
            >
                {slowPlay && <Check />}慢
            </Button>
        </div>
    )
}
