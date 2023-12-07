import SectionTitle from '../SectionTitle'
import { SectionTranscription } from '../utils/createSectionTranscription'
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
    return (
        <div>
            <SectionTitle
                sectionIndex={sectionIndex}
                hasFirstSection={hasFirstSection}
                title={section.title}
                onUpdate={() => {}}
            />
            <div>
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
        </div>
    )
}
