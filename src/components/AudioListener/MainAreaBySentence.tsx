import { Transcription } from '@/types/Transcription'
import ContentSentence from './ContentSentence'
import { Button } from '../ui/button'
import { useAudioListenerDispatch, useAudioListenerState } from './Provider'
import { useMemo } from 'react'

type Props = {
    transcription: Transcription
}

export default function MainAreaBySentence({ transcription }: Props) {
    const { contentIndex, sentenceContent } = useAudioListenerState()

    const { understood, repeatTime } = sentenceContent

    const dispatch = useAudioListenerDispatch()

    const transcriptionPart = transcription[contentIndex]

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
                        // @ts-expect-error dispatch could be null?
                        dispatch({ type: 'understood' })
                    }}
                    disabled={understood || transcriptionPart.type === 'filler'}
                >
                    听懂了
                </Button>
            </div>
        </div>
    )
}