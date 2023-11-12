'use client'

import { Input } from './ui/input'
import { useState } from 'react'
import RadioGroup from './ui/radioGroup'
import { Button } from './ui/button'
import { TranscriptionPart } from '@/types/Transcription'

type OnSaveSentence = (transcriptionPart: TranscriptionPart) => void

type Props = {
    initialTranscriptionPart?: TranscriptionPart
    currentTime: number
    saveSentence: OnSaveSentence
}

export default function SentenceEditor({
    initialTranscriptionPart,
    currentTime,
    saveSentence,
}: Props) {
    const [sentenceType, setSentenceType] = useState<'content' | 'filler'>(
        initialTranscriptionPart?.type ?? 'content',
    )

    const initialText =
        (initialTranscriptionPart !== undefined &&
            initialTranscriptionPart.type === 'content' &&
            initialTranscriptionPart.text) ??
        ''

    const [text, setText] = useState(initialText || null)
    const [endTime, setEndTime] = useState<number | null>(
        initialTranscriptionPart?.endTime ?? null,
    )

    const initialSpeaker =
        initialTranscriptionPart !== undefined &&
        initialTranscriptionPart.type === 'content' &&
        initialTranscriptionPart.speaker

    const [speaker, setSpeaker] = useState<string | null>(
        initialSpeaker || null,
    )

    const [message, setMessage] = useState('')

    const handleUseNow = () => {
        setEndTime(currentTime)
    }

    const handleSave = () => {
        if (!endTime) {
            setMessage('end time is required')
            return
        }
        if (sentenceType === 'content' && !text) {
            setMessage('text is required')
            return
        }

        if (sentenceType === 'filler') {
            saveSentence({
                type: sentenceType,
                endTime,
            })
            setEndTime(null)
            setSentenceType('content')
            return
        } else {
            if (!speaker) {
                saveSentence({
                    type: sentenceType,
                    endTime,
                    //@ts-ignore
                    text,
                })
            } else {
                saveSentence({
                    speaker: speaker,
                    type: sentenceType,
                    endTime,
                    //@ts-ignore
                    text,
                })
            }

            setText('')
            setEndTime(null)
            setSentenceType('content')
            setSpeaker(null)
            return
        }
    }

    return (
        <div className="bg-gray-900 p-8 rounded">
            <div>
                {message && (
                    <div className="bg-red-500 text-white p-2 rounded">
                        {message}
                    </div>
                )}
            </div>
            <div className="mb-10 flex gap-8 items-center">
                <div className="w-[80px]">type</div>
                <RadioGroup
                    items={[
                        { label: 'content', value: 'content' },
                        { label: 'filler', value: 'filler' },
                    ]}
                    selected={sentenceType}
                    onChange={(value) => setSentenceType(value as any)}
                />
            </div>

            {sentenceType === 'content' && (
                <div className="mb-10 flex gap-8 items-center">
                    <div className="w-[80px]">speaker</div>
                    <Input
                        className="w-[120px]"
                        value={speaker || ''}
                        onChange={(e) => setSpeaker(e.target.value)}
                    />
                </div>
            )}

            {sentenceType === 'content' && (
                <div className="mb-10 flex gap-8 items-center">
                    <div className="w-[80px]">text</div>
                    <Input
                        //@ts-ignore
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            )}

            <div className="mb-10 flex gap-8 items-center">
                <div className="w-[80px]">end time</div>
                <Input
                    value={endTime || ''}
                    className="w-[120px]"
                    type="number"
                    onChange={(e) => setEndTime(parseFloat(e.target.value))}
                />
                <Button fill="outline" onClick={handleUseNow}>
                    Use Now
                </Button>
            </div>

            <div>
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    )
}
