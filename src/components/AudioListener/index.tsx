import { Transcription } from '@/types/schema/transcriptionSchema'

import AudioListenerProvider from './StateProvider'
import Listener from './Listener'
import { AudioSection } from '@/types/schema/audioSectionSchema'

type Props = {
    audioUrl: string
    transcription: Transcription
    sections: AudioSection[]
    onFinish: () => void
}

export default function AudioListener({
    audioUrl,
    transcription,
    sections,
    onFinish,
}: Props) {
    return (
        <div className="flex flex-grow flex-col items-center rounded">
            <AudioListenerProvider
                transcription={transcription}
                audioUrl={audioUrl}
                sections={sections}
            >
                <Listener onFinish={onFinish} />
            </AudioListenerProvider>
        </div>
    )
}
