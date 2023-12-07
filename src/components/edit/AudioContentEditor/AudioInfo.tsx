import { useAudioContentEditorState } from './StateProvider'

export default function AudioInfo() {
    const { audio } = useAudioContentEditorState()

    return (
        <div className="my-6">
            <div>title: {audio.audioTitle}</div>
            <div>file name: {audio.fileName}</div>
        </div>
    )
}
