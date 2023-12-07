import { TranscriptionPart } from '@/types/schema/transcriptionSchema'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import formatTime from '@/lib/formatTime'

type Props = {
    transcriptionPart: TranscriptionPart
    onUpdate: () => void
    onAddSectionAbove: () => void
}

export default function TranscriptionPart({
    transcriptionPart,
    onUpdate,
    onAddSectionAbove,
}: Props) {
    const [isHover, setIsHover] = useState(false)

    const isFiller = transcriptionPart.type === 'filler'

    return (
        <div
            className={'my-2 flex items-center gap-4 p-1 hover:bg-green-800'}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className="w-[50px]">
                {isFiller ? '' : transcriptionPart.speaker}
            </div>

            <div className="h-full w-[500px] ">
                {isFiller ? (
                    <div className="h-6 w-[300px] rounded bg-gray-800"></div>
                ) : (
                    transcriptionPart.text
                )}
            </div>
            <div>{formatTime(transcriptionPart.endTime)}</div>
            {isHover && (
                <div className="flex gap-2">
                    <Button size="sm" fill="outline" onClick={onUpdate}>
                        update
                    </Button>
                    <Button
                        size="sm"
                        fill="outline"
                        onClick={onAddSectionAbove}
                    >
                        add section above
                    </Button>
                </div>
            )}
        </div>
    )
}
