import { Button } from '../ui/button'
import { Play } from 'lucide-react'
import BySentenceMode from './BySentenceMode'
import OnePassMode from './OnePassMode'
import {
    useAudioListenerState,
    useAudioListenerDispatch,
} from './StateProvider'
import HiddenAudio from './HiddenAudio'

type Props = {
    onFinish: () => void
}

export default function Listener({ onFinish }: Props) {
    const { listenerState } = useAudioListenerState()

    return (
        <>
            <HiddenAudio onFinish={onFinish} />

            {listenerState === 'loadError' && <LoadErrorStage />}

            {listenerState === 'loading' && <LoadingStage />}

            {listenerState === 'loaded' && <BeforeStudyStage />}

            {listenerState === 'studying' && <StudyStage />}
        </>
    )
}

function StudyStage() {
    const { audio: audioSlice } = useAudioListenerState()

    const { playMode } = audioSlice

    return (
        <div className="flex w-full flex-grow flex-col items-center justify-between">
            {playMode === 'bySentence' ? <BySentenceMode /> : <OnePassMode />}
        </div>
    )
}

function LoadingStage() {
    return <>Loading ...</>
}

function BeforeStudyStage() {
    const dispatch = useAudioListenerDispatch()

    return (
        <div className="flex flex-grow flex-col items-center justify-center">
            <div className="mb-12">
                <Button
                    size="lg"
                    onClick={() => dispatch({ type: 'START_STUDY' })}
                >
                    <div className="flex items-center gap-2">
                        <Play color="white" size={28} /> <p>播放</p>
                    </div>
                </Button>
            </div>
        </div>
    )
}

function LoadErrorStage() {
    return (
        <>
            Audio resource load error
            <div>todo p3: add more info or call to action </div>
        </>
    )
}
