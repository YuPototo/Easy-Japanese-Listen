import { TranscriptionPart } from '@/types/Transcription'
import { Button } from './ui/button'

type Props = {
    transcriptionPart: TranscriptionPart
    onUpdate: () => void
}

export default function Sentence({ transcriptionPart, onUpdate }: Props) {
    if (transcriptionPart.type === 'filler') {
        return (
            <div className="flex gap-4 items-center">
                <div className="w-[50px]"></div>
                <div className="h-6 w-[500px]">
                    <div className="bg-gray-800 h-full w-[300px] rounded"></div>
                </div>
                <div>{transcriptionPart.endTime}</div>
                <Button size="sm" fill="outline" onClick={onUpdate}>
                    update
                </Button>
            </div>
        )
    }
    return (
        <div className="flex gap-4 items-center">
            <div className="w-[50px]">{transcriptionPart.speaker}</div>
            <div className="w-[500px]">{transcriptionPart.text}</div>
            <div>{transcriptionPart.endTime}</div>
            <Button size="sm" fill="outline" onClick={onUpdate}>
                update
            </Button>
        </div>
    )
}
