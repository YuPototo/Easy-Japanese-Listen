import { Button } from '@/components/ui/button'
import {
    useAudioContentEditorDispatch,
    useAudioContentEditorState,
} from './StateProvider'
import { cn } from '@/lib/utils'
import { useMemo, useRef } from 'react'
import { createSectionTranscription } from '../utils/createSectionTranscription'
import AudioSection from './AudioSection'
import TranscriptionPartEditor from './TranscriptionPartEditor'
import { SPEAKER_LIST } from '@/constants'

export default function AudioContent() {
    const { addNewTranscriptionPart, audio, currentTime } =
        useAudioContentEditorState()
    const dispatch = useAudioContentEditorDispatch()

    // use this to scroll to the end of the list
    const endOfList = useRef<HTMLDivElement>(null)

    const { sections, transcription } = audio

    const audioSections = useMemo(
        () => createSectionTranscription(sections, transcription),
        [sections, transcription],
    )

    const hasFirstSection = sections[0]?.startIndex === 0

    return (
        <>
            <div
                className={cn(
                    addNewTranscriptionPart ? 'h-[100px]' : 'max-h-[600px]',
                    'sentence-list overflow-y-scroll rounded bg-green-900 px-5 py-5',
                )}
            >
                {audioSections.map((section, sectionIndex) => (
                    <AudioSection
                        key={sectionIndex}
                        section={section}
                        sectionIndex={sectionIndex}
                        hasFirstSection={hasFirstSection}
                    />
                ))}
                <div ref={endOfList}></div>
            </div>

            {addNewTranscriptionPart ? (
                <TranscriptionPartEditor
                    isNew={true}
                    speakerList={SPEAKER_LIST}
                    currentTime={currentTime}
                />
            ) : (
                <div className="my-5">
                    <Button
                        fill="outline"
                        onClick={() => dispatch({ type: 'ADD_NEW_PART' })}
                    >
                        Add New Sentence
                    </Button>
                </div>
            )}
        </>
    )
}
