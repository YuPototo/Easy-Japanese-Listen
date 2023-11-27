import { Button } from '../ui/button'
import { PlayCircle } from 'lucide-react'
import MainOperator from './MainOperator'
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
        <div className="flex flex-col rounded items-center">
            <HiddenAudio onFinish={onFinish} />

            {listenerState === 'loadError' && <LoadErrorStage />}

            {listenerState === 'loading' && <LoadingStage />}

            {listenerState === 'loaded' && <BeforeStudyStage />}

            {listenerState === 'studying' && <StudyStage />}
        </div>
    )
}

function StudyStage() {
    const { audio: audioSlice } = useAudioListenerState()

    const { playMode } = audioSlice

    return (
        <div>
            {playMode === 'bySentence' ? <BySentenceMode /> : <OnePassMode />}

            <MainOperator />
        </div>
    )
}

function LoadingStage() {
    return <div>Loading ...</div>
}

function BeforeStudyStage() {
    const dispatch = useAudioListenerDispatch()

    return (
        <div className="mt-32 text-center">
            <Button size="lg" onClick={() => dispatch({ type: 'START_STUDY' })}>
                <div className="flex gap-2 items-center">
                    <PlayCircle color="white" size={30} /> <p>播放</p>
                </div>
            </Button>
        </div>
    )
}

function LoadErrorStage() {
    return (
        <div>
            Audio resource load error
            <div>todo: add more info or call to action </div>
        </div>
    )
}
