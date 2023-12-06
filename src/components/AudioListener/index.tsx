import { Transcription } from '@/types/schema/transcriptionSchema'

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
        <div className="flex flex-grow flex-col items-center rounded">
            <AudioListenerProvider
                transcription={transcription}
                audioUrl={audioUrl}
            >
                <Listener onFinish={onFinish} />
            </AudioListenerProvider>
        </div>
    )
}
