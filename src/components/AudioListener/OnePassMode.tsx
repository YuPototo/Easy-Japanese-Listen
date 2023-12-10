import { isContentType } from '@/types/schema/transcriptionSchema'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useAudioListenerState } from './StateProvider'

export default function OnePassMode() {
    const [showText, setShowText] = useState(false)

    const { audio: audioSlice, transcription } = useAudioListenerState()
    const { duration, currentTime } = audioSlice

    const contentOnly = transcription.filter(isContentType)

    return (
        <div className="mb-20 flex flex-grow flex-col items-center">
            <div className="flex-grow">
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

            <div>
                Slider: {currentTime}/{duration}
            </div>

            <div className="fixed bottom-20 w-full bg-background text-center">
                <Button fill="outline" onClick={() => setShowText(!showText)}>
                    {showText ? '隐藏原文' : '显示原文'}
                </Button>
            </div>
        </div>
    )
}
