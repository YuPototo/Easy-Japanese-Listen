import { isContentType } from '@/types/schema/transcriptionSchema'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useAudioListenerState } from './StateProvider'

type Props = {
    mainOperator: React.ReactNode
}

export default function OnePassMode({ mainOperator }: Props) {
    const [showText, setShowText] = useState(false)

    const { transcription } = useAudioListenerState()

    const contentOnly = transcription.filter(isContentType)

    return (
        <div className="mb-20 flex flex-grow flex-col items-center">
            <div className="mb-24 flex-grow">
                {showText ? (
                    contentOnly.map((sentence, i) => (
                        <div key={i} className="my-2 flex gap-2">
                            <div>{sentence.speaker}</div>
                            <div>{sentence.text}</div>
                        </div>
                    ))
                ) : (
                    <div className="my-4 flex flex-col gap-4">
                        <div className="h-10 w-8/12 rounded bg-gray-700"></div>
                        <div className="h-10 w-5/12 rounded bg-gray-700"></div>
                        <div className="h-10 w-10/12 rounded bg-gray-700"></div>
                        <div className="h-10 w-5/12 rounded bg-gray-700"></div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 flex w-full flex-col gap-4 bg-background pt-2">
                <SubOperator
                    showText={showText}
                    onShowText={() => setShowText(!showText)}
                />
                {mainOperator}
            </div>
        </div>
    )
}

function SubOperator({
    showText,
    onShowText,
}: {
    showText: boolean
    onShowText: () => void
}) {
    const { audio: audioSlice } = useAudioListenerState()
    const { duration, currentTime } = audioSlice

    return (
        <>
            <div>
                Slider: {currentTime}/{duration}
            </div>

            <div className="w-full bg-background text-center">
                <Button fill="outline" onClick={onShowText}>
                    {showText ? '隐藏原文' : '显示原文'}
                </Button>
            </div>
        </>
    )
}
