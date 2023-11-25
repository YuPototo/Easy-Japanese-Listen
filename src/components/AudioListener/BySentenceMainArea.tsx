import { Transcription } from '@/types/Transcription'
import ContentSentence from './ContentSentence'
import { Button } from '../ui/button'

type Props = {
    understood: boolean
    transcriptionPart: Transcription[number]
    contentIndex: number
    contentLength: number
    repeatTime: number
    onUnderstood: () => void
}

export default function BySentenceMainArea({
    understood,
    transcriptionPart,
    contentIndex,
    contentLength,
    repeatTime,
    onUnderstood,
}: Props) {
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
                    onClick={onUnderstood}
                    disabled={understood || transcriptionPart.type === 'filler'}
                >
                    听懂了
                </Button>
            </div>
        </div>
    )
}
