import { Button } from '@/components/ui/button'
import AudioInfo from './AudioInfo'
import AudioWavePlayer from './AudioWavePlayer'
import AudioContent from './AudioContent'
import { AudioSection } from '@/types/schema/audioSectionSchema'
import { Transcription } from '@/types/schema/transcriptionSchema'
import { useAudioContentEditorState } from './StateProvider'

export default function ContentEditor({
    onSubmit,
}: {
    onSubmit: (sections: AudioSection[], transcription: Transcription) => void
}) {
    const { audio } = useAudioContentEditorState()

    const handleSubmit = () => {
        onSubmit(audio.sections, audio.transcription)
    }

    return (
        <>
            <AudioInfo />
            <AudioWavePlayer />

            <AudioContent />

            <div className="mt-10">
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </>
    )
}
