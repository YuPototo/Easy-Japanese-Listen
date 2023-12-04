import ContentSentence from './ContentSentence'
import { Button } from '../ui/button'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'
import { cn } from '@/lib/utils'

export default function BySentenceMode() {
    const {
        transcription,
        contentIndex,
        transcriptionPartIndex,
        currentSentence,
    } = useAudioListenerState()

    const { understood, repeatTime } = currentSentence

    const dispatch = useAudioListenerDispatch()

    const transcriptionPart = transcription[transcriptionPartIndex]

    const isFiller = transcriptionPart.type === 'filler'

    return (
        <div className="flex w-full flex-grow flex-col items-center justify-between">
            <div className="my-6 self-end text-gray-400 transition-opacity">
                {transcriptionPartIndex + 1}/{transcription.length}
            </div>
            <div className="w-full">
                {transcriptionPart.type === 'content' && (
                    <ContentSentence
                        key={contentIndex}
                        repeatCount={repeatTime}
                        understood={understood}
                        text={transcriptionPart.text}
                    />
                )}

                <div
                    className={cn(
                        'my-5 text-center transition-opacity',
                        understood || isFiller ? 'opacity-100' : 'opacity-0',
                    )}
                >
                    ......
                </div>
            </div>

            <div className="mx-auto my-5 mb-7">
                <Button
                    size="lg"
                    onClick={() => {
                        dispatch({ type: 'SENTENCE_UNDERSTOOD' })
                    }}
                    disabled={understood || isFiller}
                >
                    听懂了
                </Button>
            </div>
        </div>
    )
}
