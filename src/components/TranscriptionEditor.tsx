'use client'

import { TranscriptionPart } from '@/types/Transcription'
import { useEffect, useRef, useState } from 'react'
import Sentence from './Sentence'
import SentenceEditor from './SentenceEditor'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import SmartAudio from '@/components/MyAudio'

type Props = {
    fileName: string
    audioUrl?: string | null
    audioTitle: string
    initialTranscription: TranscriptionPart[]
    startWithNewSentence?: boolean
    onSubmit: (transcription: TranscriptionPart[]) => void
    onError: (message: string) => void
}
export default function TranscriptionEditor({
    fileName,
    audioUrl,
    audioTitle,
    initialTranscription,
    startWithNewSentence = false,
    onSubmit,
    onError,
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
                <SmartAudio
                    src={audioSrc}
                    onError={onError}
                    onTimeUpdate={(time) => setCurrentTime(time)}
                />
            </div>

            <div
                className={cn(
                    newSentence ? 'h-[100px]' : 'max-h-[600px]',
                    'sentence-list bg-green-900 py-5 px-5 rounded overflow-y-scroll',
                )}
            >
                {transcriptionDraft.map((sentence, index) => (
                    <div className="my-4" key={index}>
                        {updateSentenceIndex === index ? (
                            <SentenceEditor
                                isNew={false}
                                currentTime={currentTime}
                                transcriptionPart={sentence}
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
                <Button onClick={() => onSubmit(transcriptionDraft)}>
                    Submit
                </Button>
            </div>
        </div>
    )
}
