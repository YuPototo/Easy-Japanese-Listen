import { AudioSection } from '@/types/AudioSection'
import { TranscriptionPart } from '@/types/Transcription'
import { createSectionTranscription } from './helpers'
import { useMemo } from 'react'
import SentenceEditor from './SentenceEditor'
import Sentence from './Sentence'
import { SPEAKER_LIST } from '@/constants'

type Props = {
    currentTime: number
    updateSentenceIndex: number | null
    sections: AudioSection[]
    transcription: TranscriptionPart[]
    onCloseSentenceEditor: () => void
    onOpenSentenceUpdator: (index: number) => void
    onDeleteSentence: (index: number) => void
    onSaveTranscription: (
        transcriptionPart: TranscriptionPart,
        index: number,
    ) => void
    onAddSection: (aboveIndex: number) => void
}

export default function TranscriptionTree({
    currentTime,
    updateSentenceIndex,
    sections,
    transcription,
    onCloseSentenceEditor,
    onOpenSentenceUpdator,
    onDeleteSentence,
    onSaveTranscription,
    onAddSection,
}: Props) {
    const tree = useMemo(
        () => createSectionTranscription(sections, transcription),
        [sections, transcription],
    )

    const hasFirstSection = sections[0]?.startIndex === 0

    return (
        <div>
            {tree.map((section, sectionIndex) => {
                return (
                    <div key={sectionIndex}>
                        {/* todo: refactor following code */}
                        {sectionIndex === 0 && hasFirstSection && (
                            <div className="p-2">
                                --- {section.title ?? '⭐️'} ---
                            </div>
                        )}
                        {sectionIndex !== 0 && (
                            <div className="p-2">
                                --- {section.title ?? '⭐️'} ---
                            </div>
                        )}

                        {section.transcription.map((sentence) => (
                            <div className="my-4" key={sentence.gloabalIndex}>
                                {updateSentenceIndex ===
                                sentence.gloabalIndex ? (
                                    <SentenceEditor
                                        isNew={false}
                                        currentTime={currentTime}
                                        transcriptionPart={sentence}
                                        speakerList={SPEAKER_LIST}
                                        onClose={onCloseSentenceEditor}
                                        onSave={(transcriptionPart) =>
                                            onSaveTranscription(
                                                transcriptionPart,
                                                sentence.gloabalIndex,
                                            )
                                        }
                                        onDelete={() =>
                                            onDeleteSentence(
                                                sentence.gloabalIndex,
                                            )
                                        }
                                    />
                                ) : (
                                    <Sentence
                                        transcriptionPart={sentence}
                                        onUpdate={() =>
                                            onOpenSentenceUpdator(
                                                sentence.gloabalIndex,
                                            )
                                        }
                                        onAddSectionAbove={() =>
                                            onAddSection(sentence.gloabalIndex)
                                        }
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}
