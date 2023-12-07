import { useAudioContentEditorState } from './StateProvider'
import AudioForEdit from '@/components/edit/WaveAudio'

export default function AudioWavePlayer() {
    const { audio } = useAudioContentEditorState()

    const audioUrl =
        audio.audioSrc ??
        `${process.env.NEXT_PUBLIC_AUDIO_BASE_URL}/${audio.fileName}`

    return (
        <div className="mt-6">
            <AudioForEdit
                src={audioUrl}
                // todo:
                onTimeUpdate={() => console.log('todo')}
            />
        </div>
    )
}
