import SectionTitle from './SectionTitle'
import SectionTitleEditor from './SectionTitleEditor'
import { SectionTranscription } from '../utils/createSectionTranscription'
import {
    useAudioContentEditorDispatch,
    useAudioContentEditorState,
} from './StateProvider'
import TranscriptionPart from './TranscriptionPart'

/*
    TODO: pass only section index
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
    const { updateSectionTitleIndex } = useAudioContentEditorState()

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

            {section.transcription.map((part, partIndex) => (
                <TranscriptionPart
                    key={partIndex}
                    sentenceGlobalIndex={part.gloabalIndex}
                    transcriptionPart={part}
                    // todo
                    onUpdate={() => {}}
                />
            ))}
        </div>
    )
}
