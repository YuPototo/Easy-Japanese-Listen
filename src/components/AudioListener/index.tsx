import { Transcription } from '@/types/Transcription'

import { AudioListenerProvider } from './StateProvider'
import Listener from './Listener'

type Props = {
    audioUrl: string
    transcription: Transcription
    onFinish: () => void
}

export default function AudioListener({
    audioUrl,
    transcription,
    onFinish,
}: Props) {
    return (
        <AudioListenerProvider
            transcription={transcription}
            audioUrl={audioUrl}
        >
            <Listener onFinish={onFinish} />
        </AudioListenerProvider>
    )
}
