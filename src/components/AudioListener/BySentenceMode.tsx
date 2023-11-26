import ContentSentence from './ContentSentence'
import { Button } from '../ui/button'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'
import { useMemo } from 'react'

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

    const contentLength = useMemo(
        () => transcription.filter((el) => el.type === 'content').length,
        [transcription],
    )

    return (
        <div>
            <div className="my-6">
                句子：{contentIndex + 1}/{contentLength}
            </div>
            <div className="w-full">
                {transcriptionPart.type === 'content' && (
                    <ContentSentence
                        key={contentIndex}
                        repeatCount={repeatTime}
                        text={transcriptionPart.text}
                    />
                )}
            </div>

            <div className="my-5 mb-7 mx-auto">
                <Button
                    size="lg"
                    fill="outline"
                    onClick={() => {
                        dispatch({ type: 'SENTENCE_UNDERSTOOD' })
                    }}
                    disabled={understood || transcriptionPart.type === 'filler'}
                >
                    听懂了
                </Button>
            </div>
        </div>
    )
}
