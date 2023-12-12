import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

type Props = {
    understood: boolean
    repeatCount: number
    text: string
}

export default function ContentSentence({
    understood,
    repeatCount,
    text,
}: Props) {
    const [showSentence, setShowSentence] = useState(false)

    useEffect(() => {
        // 重复4次后，显示句子
        if (repeatCount >= 3 || understood) {
            setShowSentence(true)
        }
    }, [repeatCount, understood])

    return (
        <div className="mt-10 flex flex-col items-center">
            <div className="relative rounded p-2">
                <div
                    onClick={() => setShowSentence(true)}
                    className={cn(
                        'absolute inset-0 z-10 h-full w-full rounded bg-gray-600 transition-all',
                        {
                            'bg-gray-600': repeatCount === 0,
                            'bg-gray-500': repeatCount === 1,
                            'bg-gray-400': repeatCount === 2,
                        },
                        showSentence ? 'invisible' : 'hover:cursor-pointer',
                    )}
                ></div>
                <div className="relative">{text}</div>
            </div>
        </div>
    )
}
