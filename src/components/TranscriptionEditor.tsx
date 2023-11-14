'use client'

import { TranscriptionPart } from '@/types/Transcription'
import { useEffect, useRef, useState } from 'react'
import Sentence from './Sentence'
import SentenceEditor from './SentenceEditor'
import { Button } from './ui/button'

type Props = {
    fileName: string
    audioTitle: string
    initialTranscription: TranscriptionPart[]
    startWithNewSentence?: boolean
    onSubmit: (transcription: TranscriptionPart[]) => void
    onError: (message: string) => void
}
export default function TranscriptionEditor({
    fileName,
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

    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
        }

        audio.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

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
    }

    const handleDeleteSentence = (index: number) => {
        setTranscriptionDraft((prev) => {
            const newTranscription = [...prev]
            newTranscription.splice(index, 1)
            return newTranscription
        })
        setUpateSentenceIndex(null)
    }

    return (
        <div>
            <div className="my-6">
                <div>title: {audioTitle}</div>
                <div>file name: {fileName}</div>
            </div>

            <div className="my-6">
                <audio
                    ref={audioRef}
                    controls
                    src={`${process.env.NEXT_PUBLIC_AUDIO_BASE_URL}/${fileName}`}
                    onError={() => onError('Audio Error, maybe not found')}
                />
            </div>

            <div>
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
            </div>

            {newSentence ? (
                <div>
                    <SentenceEditor
                        isNew={true}
                        currentTime={currentTime}
                        onClose={() => setNewSentence(false)}
                        onSave={handleAddSentence}
                    />
                </div>
            ) : (
                <div>
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
