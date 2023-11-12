'use client'

import { Input } from './ui/input'
import { useState } from 'react'
import RadioGroup from './ui/radioGroup'
import { Button } from './ui/button'
import { TranscriptionPart } from '@/types/Transcription'

type Props = {
    isNew: boolean
    transcriptionPart?: TranscriptionPart
    currentTime: number
    onClose: () => void
    onSave: (transcriptionPart: TranscriptionPart) => void
    onDelete?: () => void
}

const initialDraft = {
    type: 'content',
}

export default function SentenceEditor({
    isNew,
    transcriptionPart,
    currentTime,
    onSave,
    onClose,
    onDelete,
}: Props) {
    const [transcriptionPartDraft, setTranscriptionDraft] =
        //@ts-ignore
        useState<TranscriptionPart>(transcriptionPart ?? initialDraft)
    const [message, setMessage] = useState('')

    const handleSetType = (t: string) => {
        //@ts-ignore
        setTranscriptionDraft((prev) => ({ ...prev, type: t }))
    }

    // todo: add more validation
    const handleSave = () => {
        const { type: sentenceType, endTime } = transcriptionPartDraft

        if (!endTime) {
            setMessage('end time is required')
            return
        }

        if (sentenceType === 'content') {
            const { text, speaker } = transcriptionPartDraft

            if (!text) {
                setMessage('text is required for `content` type')
                return
            }

            const payload = speaker ? { speaker, text } : { text }

            onSave({
                type: sentenceType,
                endTime,
                ...payload,
            })
        } else {
            onSave({
                type: sentenceType,
                endTime,
            })
        }

        onClose()
    }

    const handleSpeakerChange = (value: string) => {
        //@ts-ignore
        setTranscriptionDraft((prev) => ({ ...prev, speaker: value }))
    }

    const handleTextChange = (value: string) => {
        //@ts-ignore
        setTranscriptionDraft((prev) => ({ ...prev, text: value }))
    }

    const handleEndTimeChange = (value: number) => {
        //@ts-ignore
        setTranscriptionDraft((prev) => ({ ...prev, endTime: value }))
    }

    const handleUseNow = () => {
        //@ts-ignore
        setTranscriptionDraft((prev) => ({ ...prev, endTime: currentTime }))
    }

    const sentenceType = transcriptionPartDraft.type
    // @ts-ignore
    const speaker = transcriptionPartDraft.speaker
    // @ts-ignore
    const text = transcriptionPartDraft.text
    // @ts-ignore
    const endTime = transcriptionPartDraft.endTime

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
                    selected={transcriptionPartDraft.type}
                    onChange={(value) => handleSetType(value as any)}
                />
            </div>

            {sentenceType === 'content' && (
                <div className="mb-10 flex gap-8 items-center">
                    <div className="w-[80px]">speaker</div>
                    <Input
                        className="w-[120px]"
                        value={speaker || ''}
                        onChange={(e) => handleSpeakerChange(e.target.value)}
                    />
                </div>
            )}

            {sentenceType === 'content' && (
                <div className="mb-10 flex gap-8 items-center">
                    <div className="w-[80px]">text</div>
                    <Input
                        value={text}
                        onChange={(e) => handleTextChange(e.target.value)}
                    />
                </div>
            )}

            <div className="mb-10 flex gap-8 items-center">
                <div className="w-[80px]">end time</div>
                <Input
                    value={endTime || ''}
                    className="w-[120px]"
                    type="number"
                    onChange={(e) =>
                        handleEndTimeChange(parseFloat(e.target.value))
                    }
                />
                <Button fill="outline" onClick={handleUseNow}>
                    Use Now
                </Button>
            </div>

            <div className="flex gap-4">
                <Button fill="outline" onClick={handleSave}>
                    Confirm
                </Button>
                <Button fill="outline" onClick={onClose}>
                    Close
                </Button>

                {isNew || (
                    <Button
                        className="ml-auto"
                        btnColor="red"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                )}
            </div>
        </div>
    )
}
