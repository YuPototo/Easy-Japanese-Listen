'use client'

import { TranscriptionPart } from '@/types/schema/transcriptionSchema'
import { useEffect, useRef, useState } from 'react'
import SentenceEditor from './SentenceEditor'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import AudioForEdit from './WaveAudio'
import { SPEAKER_LIST } from '@/constants'
import TranscriptionTree from './TranscriptionTree'
import { validateTranscriptionDraft } from './utils/validateTranscriptionDraft'
import { validateSectionTitle } from './utils/validateSectionTitle'
import { validateSectionAndTranscription } from './utils/validateSectionAndTranscription'
import { AudioSection } from '@/types/schema/audioSectionSchema'

type Props = {
    fileName: string
    audioUrl?: string | null
    audioTitle: string
    initialTranscription: TranscriptionPart[]
    initialSections?: AudioSection[]
    startWithNewSentence?: boolean
    onSubmit: (
        sections: AudioSection[],
        transcription: TranscriptionPart[],
    ) => void
}
export default function TranscriptionEditor({
    fileName,
    audioUrl,
    audioTitle,
    initialTranscription,
    initialSections,
    startWithNewSentence = false,
    onSubmit,
}: Props) {
    const [sectionDraft, setSectionDraft] = useState<AudioSection[]>(
        initialSections ?? [],
    )
    const [transcriptionDraft, setTranscriptionDraft] =
        useState<TranscriptionPart[]>(initialTranscription)

    const [currentTime, setCurrentTime] = useState(0)

    const [updateSentenceIndex, setUpateSentenceIndex] = useState<
        number | null
    >(null)

    const [updateSectionIndex, setUpdateSectionIndex] = useState<number | null>(
        null,
    )

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
        window.confirm('要删除吗？记得确认 section 的位置')

        setTranscriptionDraft((prev) => {
            const newTranscription = [...prev]
            newTranscription.splice(index, 1)
            return newTranscription
        })

        // todo: 处理 section 的 startIndex 变化。以后放在 context reducer 里面做。

        setUpateSentenceIndex(null)
    }

    const handleSubmit = () => {
        const transcriptionValidateResult =
            validateTranscriptionDraft(transcriptionDraft)

        if (!transcriptionValidateResult.success) {
            const message = `transcription validation failed: ${transcriptionValidateResult.error}`
            alert(message)
            return
        }

        const sectionValidateResult = validateSectionTitle(sectionDraft)

        if (!sectionValidateResult.success) {
            const message = `section validation failed: ${sectionValidateResult.error}`
            alert(message)
            return
        }

        const sectionAndTranscriptionValidation =
            validateSectionAndTranscription(transcriptionDraft, sectionDraft)

        if (!sectionAndTranscriptionValidation.success) {
            const message = `Failure: ${sectionAndTranscriptionValidation.error}`
            alert(message)
            return
        }

        onSubmit(sectionDraft, transcriptionDraft)
    }

    const handleAddSection = (aboveIndex: number) => {
        // chech if the aboveIndex is already in a section
        const aboveSection = sectionDraft.findIndex(
            (section) => section.startIndex === aboveIndex,
        )

        if (aboveSection !== -1) {
            alert('这个位置已经有 section 了')
            return
        }

        const newSection: AudioSection = {
            startIndex: aboveIndex,
        }

        setSectionDraft((prev) => {
            const newSections = [...prev]
            newSections.push(newSection)

            // reorder the sections
            newSections.sort((a, b) => a.startIndex - b.startIndex)
            return newSections
        })
    }

    const handleSaveSectionTitle = (title: string, index: number) => {
        setSectionDraft((prev) => {
            const newSections = [...prev]
            if (title === '') {
                delete newSections[index].title
                return newSections
            } else {
                newSections[index].title = title
                return newSections
            }
        })
        setUpdateSectionIndex(null)
    }

    const handleDeleteSectionTitle = (index: number) => {
        window.confirm('要删除吗?')

        setSectionDraft((prev) => {
            const newSections = [...prev]
            newSections.splice(index, 1)
            return newSections
        })
        setUpdateSectionIndex(null)
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
                <TranscriptionTree
                    currentTime={currentTime}
                    updateSentenceIndex={updateSentenceIndex}
                    updateSectionIndex={updateSectionIndex}
                    sections={sectionDraft}
                    transcription={transcriptionDraft}
                    onCloseSentenceEditor={() => setUpateSentenceIndex(null)}
                    onOpenSentenceUpdator={setUpateSentenceIndex}
                    onOpenSectionUpdator={setUpdateSectionIndex}
                    onCloseSectionEditor={() => setUpdateSectionIndex(null)}
                    onDeleteSentence={handleDeleteSentence}
                    onDeleteSectionTitle={handleDeleteSectionTitle}
                    onSaveTranscription={handleUpdateSentence}
                    onSaveSectionTitle={handleSaveSectionTitle}
                    onAddSection={handleAddSection}
                />

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
