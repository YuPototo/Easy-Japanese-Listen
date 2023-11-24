import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { PlayCircle } from 'lucide-react'

type Props = {
    audioUrl: string
}

export default function AudioListener({ audioUrl }: Props) {
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

    const handleStartPlay = () => {
        if (audioRef.current === null) {
            console.error('audioRef.current is null')
            return
        }

        setListenerState('playing')
        audioRef.current.play()
    }

    return (
        <div className="flex flex-col rounded items-center">
            <audio
                className="my-4"
                autoPlay
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

            {listenerState === 'playing' && <div>todo: playing</div>}
        </div>
    )
}
