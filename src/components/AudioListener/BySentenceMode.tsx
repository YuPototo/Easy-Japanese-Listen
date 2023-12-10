import ContentSentence from './ContentSentence'
import { Button } from '../ui/button'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'
import { cn } from '@/lib/utils'

type Props = {
    mainOperator: React.ReactNode
}

export default function BySentenceMode({ mainOperator }: Props) {
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
        <div className="mb-20 flex w-full flex-grow flex-col items-center">
            <div className="my-6 self-end text-gray-400 transition-opacity">
                {transcriptionPartIndex + 1}/{transcription.length}
            </div>
            <div className="w-full flex-grow">
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

            <div className="fixed bottom-0 flex w-full  flex-col gap-4 bg-background pt-2">
                <SubOperator
                    onUnderstood={() =>
                        dispatch({ type: 'SENTENCE_UNDERSTOOD' })
                    }
                    disabled={understood}
                    hide={isFiller}
                />

                {mainOperator}
            </div>
        </div>
    )
}

function SubOperator({
    hide,
    disabled,
    onUnderstood,
}: {
    hide: boolean
    disabled: boolean
    onUnderstood: () => void
}) {
    return (
        <div
            className={cn(
                'mx-auto transition-opacity',
                hide ? 'opacity-0' : 'opacity-100',
            )}
        >
            <Button size="lg" onClick={onUnderstood} disabled={disabled}>
                听懂了
            </Button>
        </div>
    )
}
