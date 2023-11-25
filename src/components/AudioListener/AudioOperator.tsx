import { Check, Pause, PlayCircle } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
    playMode: 'bySentence' | 'all'
    isPlaying: boolean
    slowPlay: boolean
    handleTogglePlay: () => void
    handleTogglePlayBackRate: () => void
    handleChangePlayMode: () => void
}

export default function AudioOperator({
    playMode,
    isPlaying,
    slowPlay,
    handleTogglePlay,
    handleTogglePlayBackRate,
    handleChangePlayMode,
}: Props) {
    return (
        <div className="flex justify-around my-6 w-full">
            <Button
                fill="outline"
                btnColor="gray"
                onClick={handleChangePlayMode}
            >
                {playMode == 'bySentence' ? '全文' : '分句'}
            </Button>

            <Button
                fill="outline"
                btnColor={isPlaying ? 'gray' : 'orange'}
                size="icon"
                onClick={handleTogglePlay}
            >
                {isPlaying ? <Pause size={20} /> : <PlayCircle size={20} />}
            </Button>

            <Button
                fill="outline"
                btnColor="gray"
                onClick={handleTogglePlayBackRate}
                className="flex gap-2"
            >
                {slowPlay && <Check />}慢
            </Button>
        </div>
    )
}
