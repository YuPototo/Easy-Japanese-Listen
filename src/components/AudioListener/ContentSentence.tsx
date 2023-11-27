import { useState } from 'react'

type Props = {
    repeatCount: number
    text: string
}

export default function ContentSentence({ repeatCount, text }: Props) {
    const [showSentence, setShowSentence] = useState(false)

    return (
        <div className="my-10 flex flex-col items-center">
            {showSentence ? (
                <div className="text-xl">{text}</div>
            ) : (
                <div className="flex  w-full flex-col items-center gap-4">
                    <div
                        onClick={() => setShowSentence(true)}
                        className="h-10 w-10/12 rounded bg-gray-700"
                    ></div>
                    <div className="text-gray-500">重复次数: {repeatCount}</div>
                </div>
            )}
        </div>
    )
}
