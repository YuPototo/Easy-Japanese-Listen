import { Button } from '../ui/button'
import { PlayCircle } from 'lucide-react'
import { Transcription } from '@/types/Transcription'
import AudioOperator from './AudioOperator'
import MainAreaBySentence from './MainAreaBySentence'
import MainAreaAll from './MainAreaAll'
import {
    useAudioListenerState,
    useAudioListenerDispatch,
} from './StateProvider'
import HiddenAudio from './HiddenAudio'

type Props = {
    audioUrl: string
    transcription: Transcription
    onFinish: () => void
}

export default function Listener({ audioUrl, transcription, onFinish }: Props) {
    const { audio: audioSlice, listenerState } = useAudioListenerState()
    const { playMode } = audioSlice
    const dispatch = useAudioListenerDispatch()

    return (
        <div className="flex flex-col rounded items-center">
            <HiddenAudio
                audioUrl={audioUrl}
                transcription={transcription}
                onFinish={onFinish}
            />

            {listenerState === 'loading' && <div>Loading...</div>}

            {listenerState === 'loaded' && (
                <div className="mt-32 text-center">
                    <Button
                        size="lg"
                        /* @ts-expect-error */
                        onClick={() => dispatch({ type: 'startPlay' })}
                    >
                        <div className="flex gap-2 items-center">
                            <PlayCircle color="white" size={30} /> <p>播放</p>
                        </div>
                    </Button>
                </div>
            )}

            {listenerState === 'playing' && (
                <div>
                    {playMode === 'bySentence' ? (
                        <MainAreaBySentence transcription={transcription} />
                    ) : (
                        <MainAreaAll transcription={transcription} />
                    )}

                    <AudioOperator />
                </div>
            )}
        </div>
    )
}
