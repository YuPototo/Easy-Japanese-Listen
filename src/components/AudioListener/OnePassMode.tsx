import { Transcription, isContentType } from '@/types/Transcription'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useAudioListenerState } from './StateProvider'

export default function OnePassMode() {
    const [showText, setShowText] = useState(false)

    const { audio: audioSlice, transcription } = useAudioListenerState()
    const { duration, currentTime } = audioSlice

    const contentOnly = transcription.filter(isContentType)

    return (
        <div>
            <div>
                {showText ? (
                    contentOnly.map((sentence, i) => (
                        <div key={i} className="flex gap-2 my-2">
                            <div>{sentence.speaker}</div>
                            <div>{sentence.text}</div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col gap-4 my-4">
                        <div className="w-8/12 h-10 bg-gray-700 rounded"></div>
                        <div className="w-5/12 h-10 bg-gray-700 rounded"></div>
                        <div className="w-10/12 h-10 bg-gray-700 rounded"></div>
                        <div className="w-5/12 h-10 bg-gray-700 rounded"></div>
                    </div>
                )}
            </div>

            <div>
                Slider: {currentTime}/{duration}
            </div>

            <div className="flex gap-2">
                <Button fill="outline">A</Button>
                <Button fill="outline">B</Button>
                <Button fill="outline">显示原文</Button>
                <Button fill="outline">-5</Button>
                <Button fill="outline">+5</Button>
            </div>
        </div>
    )
}
