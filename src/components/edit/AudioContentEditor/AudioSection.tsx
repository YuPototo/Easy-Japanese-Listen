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
    const dispatch = useAudioContentEditorDispatch()

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
                    onUpdate={() =>
                        dispatch({
                            type: 'START_UPDATE_SECTION_TITLE',
                            payload: sectionIndex,
                        })
                    }
                />
            )}

            {section.transcription.map((part, partIndex) => (
                <TranscriptionPart
                    key={partIndex}
                    transcriptionPart={part}
                    // todo
                    onUpdate={() => {}}
                    // todo
                    onAddSectionAbove={() => {}}
                />
            ))}
        </div>
    )
}
