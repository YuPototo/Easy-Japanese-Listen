import { useEffect, useMemo, useRef, useState } from 'react'
import { useAudioListenerState } from './StateProvider'
import {
    IndexedTranscriptionPart,
    createSectionTranscription,
} from '@/lib/createSectionTranscription'
import { cn } from '@/lib/utils'

export default function AllTranscription() {
    const { sections, transcription } = useAudioListenerState()

    const audioSections = useMemo(
        () => createSectionTranscription(sections, transcription),
        [sections, transcription],
    )

    return (
        <div>
            {audioSections.map((section, index) => (
                <div key={index} className="mt-6">
                    <SectionTitle title={section.title} />
                    <div>
                        <SectionContent transcription={section.transcription} />
                    </div>
                </div>
            ))}
        </div>
    )
}

function SectionTitle({ title }: { title?: string }) {
    return <div className="mb-4">--- {title ?? '⭐️'} ---</div>
}

function SectionContent({
    transcription,
}: {
    transcription: IndexedTranscriptionPart[]
}) {
    const { onePassMode } = useAudioListenerState()

    const showTranscription = onePassMode.showTranscription

    return (
        <div className="flex flex-col gap-4">
            {transcription
                .filter((el) => el.type === 'content')
                .map((el) => (
                    <MaskTranscriptionPart
                        key={el.globalIndex}
                        part={el}
                        showAll={showTranscription}
                    />
                ))}
        </div>
    )
}

// todo: fix the prop. It should be indexed content
function MaskTranscriptionPart({
    part,
    showAll,
}: {
    part: IndexedTranscriptionPart
    showAll: boolean
}) {
    // 现在的 show 是 local state
    // 如果 showAll 从 true 变为 false，不会让这里变为 hide
    const [showPart, setShowPart] = useState(false)
    const { transcriptionPartIndex } = useAudioListenerState()

    const sentenceRef = useRef<HTMLDivElement>(null)

    const globalIndex = part.globalIndex

    useEffect(() => {
        if (transcriptionPartIndex == globalIndex) {
            sentenceRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }
    }, [transcriptionPartIndex, globalIndex])

    const show = showAll || showPart
    return (
        <div className="relative w-fit" ref={sentenceRef}>
            <div
                className={cn(
                    'absolute inset-0 rounded transition-all',
                    show ? 'invisible' : 'hover:cursor-pointer',
                    transcriptionPartIndex === part.globalIndex
                        ? 'bg-green-500'
                        : 'bg-gray-600',
                )}
                onClick={() => setShowPart(true)}
            ></div>
            <div
                className={cn(
                    'flex gap-4',
                    transcriptionPartIndex === part.globalIndex &&
                        'text-green-500',
                )}
            >
                {/* @ts-expect-error */}
                <div>{part.speaker}</div>
                {/* @ts-expect-error */}
                <div>{part.text}</div>
            </div>
        </div>
    )
}
