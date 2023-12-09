import {
    useAudioContentEditorDispatch,
    useAudioContentEditorState,
} from './StateProvider'
import AudioForEdit from '@/components/edit/WaveAudio'

export default function AudioWavePlayer() {
    const { audio } = useAudioContentEditorState()
    const dispatch = useAudioContentEditorDispatch()

    const audioUrl =
        audio.audioSrc ??
        `${process.env.NEXT_PUBLIC_AUDIO_BASE_URL}/${audio.fileName}`

    const handleUpdateTime = (time: number) => {
        dispatch({ type: 'UPDATE_CURRENT_TIME', payload: time })
    }

    return (
        <div className="mt-6">
            <AudioForEdit src={audioUrl} onTimeUpdate={handleUpdateTime} />
        </div>
    )
}
