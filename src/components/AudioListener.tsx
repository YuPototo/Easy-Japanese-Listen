import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Check, Pause, PlayCircle } from 'lucide-react'
import { Transcription } from '@/types/Transcription'
import Sentence from './Sentence'

type Props = {
    audioUrl: string
    transcription: Transcription
    onFinish: () => void
}

export default function AudioListener({
    audioUrl,
    transcription,
    onFinish,
}: Props) {
    const [playMode, setPlayMode] = useState<'bySentence' | 'all'>('bySentence')
    const [isPlaying, setIsPlaying] = useState(false)
    const [slowPlay, setSlowPlay] = useState(false)

    // 这里只考虑 type = 'content' 的句子
    const [contentIndex, setContentIndex] = useState(0)

    const [listenerState, setListenerState] = useState<
        'loading' | 'loaded' | 'playing'
    >('loading')

    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (audio === null) {
            return
        }

        const onCanPlay = () => {
            setListenerState('loaded')
        }

        audio.addEventListener('canplay', onCanPlay)

        return () => {
            audio.removeEventListener('canplay', onCanPlay)
        }
    }, [audioRef])

    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            if (slowPlay) {
                audio.playbackRate = 0.75
            } else {
                audio.playbackRate = 1
            }
        }
    }, [slowPlay])

    const handleStartPlay = () => {
        if (audioRef.current === null) {
            console.error('audioRef.current is null')
            return
        }

        setListenerState('playing')
        audioRef.current.play()
    }

    const handleTogglePlay = () => {
        if (audioRef.current === null) {
            console.error('audioRef.current is null')
            return
        }

        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            audioRef.current.play()
            setIsPlaying(true)
        }
    }

    const contentLength = transcription.filter(
        (el) => el.type === 'content',
    ).length

    return (
        <div className="flex flex-col rounded items-center">
            <audio
                className="my-4"
                ref={audioRef}
                src={audioUrl}
                // onTimeUpdate={handleAudioTimeUpdate}
                // onEnded={handleAudioEnded}
            />

            {listenerState === 'loading' && <div>Loading...</div>}

            {listenerState === 'loaded' && (
                <div className="mt-32 text-center">
                    <Button size="lg" onClick={handleStartPlay}>
                        <div className="flex gap-2 items-center">
                            <PlayCircle color="white" size={30} /> <p>播放</p>
                        </div>
                    </Button>
                </div>
            )}

            {listenerState === 'playing' && (
                <div>
                    {playMode === 'bySentence' ? (
                        <div>
                            分句模式
                            <div className="my-6">
                                句子：{contentIndex + 1}/{contentLength}
                            </div>
                        </div>
                    ) : (
                        <div>全文模式: todo</div>
                    )}
                    <AudioOperator
                        playMode={playMode}
                        isPlaying={isPlaying}
                        slowPlay={slowPlay}
                        handleTogglePlay={handleTogglePlay}
                        handleTogglePlayBackRate={() =>
                            setSlowPlay((prev) => !prev)
                        }
                        handleChangePlayMode={() =>
                            setPlayMode((prev) =>
                                prev === 'bySentence' ? 'all' : 'bySentence',
                            )
                        }
                    />
                </div>
            )}
        </div>
    )
}

function AudioOperator({
    playMode,
    isPlaying,
    slowPlay,
    handleTogglePlay,
    handleTogglePlayBackRate,
    handleChangePlayMode,
}: {
    playMode: 'bySentence' | 'all'
    isPlaying: boolean
    slowPlay: boolean
    handleTogglePlay: () => void
    handleTogglePlayBackRate: () => void
    handleChangePlayMode: () => void
}) {
    return (
        <div className="flex justify-around my-6 w-full">
            <Button
                fill="outline"
                btnColor="gray"
                onClick={handleChangePlayMode}
            >
                {playMode == 'bySentence' ? '全文' : '分句'}
            </Button>

            <Button
                fill="outline"
                btnColor={isPlaying ? 'gray' : 'orange'}
                size="icon"
                onClick={handleTogglePlay}
            >
                {isPlaying ? <Pause size={20} /> : <PlayCircle size={20} />}
            </Button>

            <Button
                fill="outline"
                btnColor="gray"
                onClick={handleTogglePlayBackRate}
                className="flex gap-2"
            >
                {slowPlay && <Check />}慢
            </Button>
        </div>
    )
}
