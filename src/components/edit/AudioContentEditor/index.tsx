import { Transcription } from '@/types/schema/transcriptionSchema'
import ContentEditor from './ContentEditor'
import { AudioContentEditorProvider } from './StateProvider'
import { AudioSection } from '@/types/schema/audioSectionSchema'

type Props = {
    audio: {
        fileName: string
        audioTitle: string
        transcription: Transcription
        sections?: AudioSection[]
    }
    onSubmit: (sections: AudioSection[], transcription: Transcription) => void
}

export default function AudioContentEditor({ audio, onSubmit }: Props) {
    // todo: make section required in the schema
    const fixedAudio = { ...audio, sections: audio.sections ?? [] }

    return (
        <>
            <AudioContentEditorProvider audio={fixedAudio}>
                <ContentEditor onSubmit={onSubmit} />
            </AudioContentEditorProvider>
        </>
    )
}
