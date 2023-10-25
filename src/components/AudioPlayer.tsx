'use client'

import { useState } from 'react'

type Props = {
    sentences: string[]
    breakpoints: number[]
}
export default function AudioPlayer({ sentences, breakpoints }: Props) {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const [sentenceIndex, setSentenceIndex] = useState(0)
    const [understood, setUnderstood] = useState(false)
    const [showSentence, setShowSentence] = useState(false)
    const [repeatTime, setRepeatTime] = useState(0)

    const handleAudioTimeUpdate = () => {
        const currentTime = audio?.currentTime
        if (currentTime === undefined) {
            return
        }
        const currentBreakpoint = breakpoints[sentenceIndex] ?? Infinity
        const lastBreakpoint = breakpoints[sentenceIndex - 1] ?? 0

        if (currentTime < currentBreakpoint) return

        if (understood) {
            setSentenceIndex(sentenceIndex + 1)
            setUnderstood(false)
            setShowSentence(false)
            setRepeatTime(0)
        } else {
            audio!.currentTime = lastBreakpoint
            setRepeatTime(repeatTime + 1)
        }
    }

    const handleAudioEnded = () => {
        if (!understood) {
            const lastBreakpoint = breakpoints[sentenceIndex - 1] ?? 0
            audio!.currentTime = lastBreakpoint
            audio?.play()
        }
    }

    return (
        <div className="m-4">
            <audio
                controls
                ref={setAudio}
                src="https://assets.riyu.love/audios/2020_12_n3_1_1.mp3"
                onTimeUpdate={handleAudioTimeUpdate}
                onEnded={handleAudioEnded}
            />
            <div>current sentence: {sentences[sentenceIndex]}</div>

            <div>repeat time: {repeatTime}</div>

            <button onClick={() => setUnderstood(true)}>听懂了</button>

            <button onClick={() => setShowSentence(true)}>show sentence</button>

            {showSentence && <div>{sentences[sentenceIndex]}</div>}
        </div>
    )
}
