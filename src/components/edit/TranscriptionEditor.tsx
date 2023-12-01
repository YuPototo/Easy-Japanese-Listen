'use client'

import { TranscriptionPart } from '@/types/Transcription'
import { useEffect, useRef, useState } from 'react'
import Sentence from './Sentence'
import SentenceEditor from './SentenceEditor'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import AudioForEdit from '../WaveAudio'
import { TranscriptionSchema } from '@/lib/validator'

const SPEAKER_LIST = ['男', '女  ', 'A', 'B']

type Props = {
    fileName: string
    audioUrl?: string | null
    audioTitle: string
    initialTranscription: TranscriptionPart[]
    startWithNewSentence?: boolean
    onSubmit: (transcription: TranscriptionPart[]) => void
}
export default function TranscriptionEditor({
    fileName,
    audioUrl,
    audioTitle,
    initialTranscription,
    startWithNewSentence = false,
    onSubmit,
}: Props) {
    const [transcriptionDraft, setTranscriptionDraft] =
        useState<TranscriptionPart[]>(initialTranscription)
    const [currentTime, setCurrentTime] = useState(0)
    const [updateSentenceIndex, setUpateSentenceIndex] = useState<
        number | null
    >(null)
    const [newSentence, setNewSentence] = useState(startWithNewSentence)

    // use this to scroll to the end of the list
    const endOfList = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (newSentence && endOfList.current) {
            endOfList.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [newSentence])

    const handleUpdateSentence = (
        transcriptionPart: TranscriptionPart,
        index: number,
    ) => {
        setTranscriptionDraft((prev) => {
            const newTranscription = [...prev]
            newTranscription[index] = transcriptionPart
            return newTranscription
        })
        setUpateSentenceIndex(null)
    }

    const handleAddSentence = (transcriptionPart: TranscriptionPart) => {
        setTranscriptionDraft((prev) => [...prev, transcriptionPart])

        // use a timeout because the new sentence editor will be unmounted first
        // and then mounted again
        setTimeout(() => {
            setNewSentence(true)
        }, 500)
    }

    const handleDeleteSentence = (index: number) => {
        setTranscriptionDraft((prev) => {
            const newTranscription = [...prev]
            newTranscription.splice(index, 1)
            return newTranscription
        })
        setUpateSentenceIndex(null)
    }

    const handleSubmit = () => {
        const { success, error } = validateDraft(transcriptionDraft)
        if (!success) {
            // todo: handle error
            alert(error)
            return
        }
        onSubmit(transcriptionDraft)
    }

    // todo: refactor this logic
    const audioSrc =
        audioUrl ?? `${process.env.NEXT_PUBLIC_AUDIO_BASE_URL}/${fileName}`

    return (
        <div>
            <div className="my-6">
                <div>title: {audioTitle}</div>
                <div>file name: {fileName}</div>
            </div>

            <div className="my-2">
                <AudioForEdit src={audioSrc} onTimeUpdate={setCurrentTime} />
            </div>

            <div
                className={cn(
                    newSentence ? 'h-[100px]' : 'max-h-[600px]',
                    'sentence-list overflow-y-scroll rounded bg-green-900 px-5 py-5',
                )}
            >
                {transcriptionDraft.map((sentence, index) => (
                    <div className="my-4" key={index}>
                        {updateSentenceIndex === index ? (
                            <SentenceEditor
                                isNew={false}
                                currentTime={currentTime}
                                transcriptionPart={sentence}
                                speakerList={SPEAKER_LIST}
                                onClose={() => setUpateSentenceIndex(null)}
                                onSave={(transcriptionPart) =>
                                    handleUpdateSentence(
                                        transcriptionPart,
                                        index,
                                    )
                                }
                                onDelete={() => handleDeleteSentence(index)}
                            />
                        ) : (
                            <Sentence
                                transcriptionPart={sentence}
                                onUpdate={() => setUpateSentenceIndex(index)}
                            />
                        )}
                    </div>
                ))}
                <div ref={endOfList}></div>
            </div>

            {newSentence ? (
                <div className="my-5">
                    <SentenceEditor
                        isNew={true}
                        currentTime={currentTime}
                        speakerList={SPEAKER_LIST}
                        onClose={() => setNewSentence(false)}
                        onSave={handleAddSentence}
                    />
                </div>
            ) : (
                <div className="my-5">
                    <Button fill="outline" onClick={() => setNewSentence(true)}>
                        Add New Sentence
                    </Button>
                </div>
            )}

            <div className="mt-10">
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}

function validateDraft(draft: unknown) {
    if (!Array.isArray(draft)) {
        return { success: false, error: 'draft is not an array' }
    }

    if (draft.length === 0) {
        return { success: false, error: 'draft is empty' }
    }

    try {
        TranscriptionSchema.parse(draft)
    } catch (err) {
        // @ts-expect-error
        return { success: false, error: err.message }
    }

    const lastSentence = draft[draft.length - 1] as TranscriptionPart

    if (lastSentence.endTime !== 9999) {
        return {
            success: false,
            error: 'Last sentence must end with 9999',
        }
    }

    // validate that the latter sentence's end time should be larger than the previous one
    for (let i = 1; i < draft.length; i++) {
        const prevSentence = draft[i - 1] as TranscriptionPart
        const currSentence = draft[i] as TranscriptionPart

        if (prevSentence.endTime > currSentence.endTime) {
            return {
                success: false,
                error: `Sentence ${i} end time ${
                    prevSentence.endTime
                } is smaller than sentence ${i - 1} end time ${
                    currSentence.endTime
                }`,
            }
        }
    }

    return { success: true, error: null }
}
