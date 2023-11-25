import { useState } from 'react'

type Props = {
    repeatCount: number
    text: string
}

export default function ContentSentence({ repeatCount, text }: Props) {
    const [showSentence, setShowSentence] = useState(false)

    return (
        <div className="flex flex-col items-center my-10">
            {showSentence ? (
                <div className="text-xl">{text}</div>
            ) : (
                <div className="w-full  flex flex-col gap-4 items-center">
                    <div
                        onClick={() => setShowSentence(true)}
                        className="w-10/12 h-10 bg-gray-700 rounded"
                    ></div>
                    <div className="text-gray-500">重复次数: {repeatCount}</div>
                </div>
            )}
        </div>
    )
}
