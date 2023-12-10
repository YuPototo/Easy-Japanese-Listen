import SectionTitle from './SectionTitle'
import SectionTitleEditor from './SectionTitleEditor'
import { SectionTranscription } from '../utils/createSectionTranscription'
import { useAudioContentEditorState } from './StateProvider'
import TranscriptionPart from './TranscriptionPart'
import TranscriptionPartEditor from './TranscriptionPartEditor'
import { SPEAKER_LIST } from '@/constants'

/*
    TODO p3: pass only section index
*/

type Props = {
    section: SectionTranscription
    sectionIndex: number
    hasFirstSection: boolean
}

export default function AudioSection({
    section,
    sectionIndex,
    hasFirstSection,
}: Props) {
    const {
        currentTime,
        updateSectionTitleIndex,
        updateTranscriptionPartIndex,
    } = useAudioContentEditorState()

    return (
        <div className="m-2">
            {updateSectionTitleIndex === sectionIndex ? (
                <SectionTitleEditor
                    title={section.title}
                    sectionIndex={sectionIndex}
                />
            ) : (
                <SectionTitle
                    sectionIndex={sectionIndex}
                    hasFirstSection={hasFirstSection}
                    title={section.title}
                />
            )}

            {section.transcription.map((part) => {
                const partGlobalIndex = part.globalIndex

                if (updateTranscriptionPartIndex === partGlobalIndex) {
                    return (
                        <TranscriptionPartEditor
                            isNew={false}
                            key={partGlobalIndex}
                            transcriptionPart={part}
                            speakerList={SPEAKER_LIST}
                            globalIndex={partGlobalIndex}
                            currentTime={currentTime}
                        />
                    )
                }

                return (
                    <TranscriptionPart
                        key={partGlobalIndex}
                        sentenceGlobalIndex={partGlobalIndex}
                        transcriptionPart={part}
                    />
                )
            })}
        </div>
    )
}
