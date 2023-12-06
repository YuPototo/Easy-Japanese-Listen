import { TranscriptionPart } from '@/types/schema/transcriptionSchema'
import { createSectionTranscription } from './utils/createSectionTranscription'
import { useMemo } from 'react'
import SentenceEditor from './SentenceEditor'
import Sentence from './Sentence'
import { SPEAKER_LIST } from '@/constants'
import SectionTitle from './SectionTitle'
import SectionTitleEditor from './SectionTitleEditor'
import { AudioSection } from '@/types/schema/audioSectionSchema'

type Props = {
    currentTime: number
    updateSentenceIndex: number | null
    updateSectionIndex: number | null
    sections: AudioSection[]
    transcription: TranscriptionPart[]
    onCloseSentenceEditor: () => void
    onOpenSentenceUpdator: (index: number) => void
    onOpenSectionUpdator: (index: number) => void
    onCloseSectionEditor: () => void
    onDeleteSentence: (index: number) => void
    onDeleteSectionTitle: (index: number) => void
    onSaveSectionTitle: (title: string, index: number) => void
    onSaveTranscription: (
        transcriptionPart: TranscriptionPart,
        index: number,
    ) => void
    onAddSection: (aboveIndex: number) => void
}

export default function TranscriptionTree({
    currentTime,
    updateSentenceIndex,
    updateSectionIndex,
    sections,
    transcription,
    onCloseSentenceEditor,
    onOpenSentenceUpdator,
    onCloseSectionEditor,
    onOpenSectionUpdator,
    onDeleteSentence,
    onDeleteSectionTitle,
    onSaveTranscription,
    onSaveSectionTitle,
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
                        {sectionIndex === updateSectionIndex ? (
                            <SectionTitleEditor
                                title={section.title}
                                onClose={onCloseSectionEditor}
                                onDelete={() =>
                                    onDeleteSectionTitle(sectionIndex)
                                }
                                onSave={(title) =>
                                    onSaveSectionTitle(title, sectionIndex)
                                }
                            />
                        ) : (
                            <SectionTitle
                                sectionIndex={sectionIndex}
                                hasFirstSection={hasFirstSection}
                                title={section.title}
                                onUpdate={() =>
                                    onOpenSectionUpdator(sectionIndex)
                                }
                            />
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
