import Slider from '../Slider'
import { Button } from '../ui/button'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'

export default function OnePassOperator() {
    const { audio: audioSlice, onePassMode } = useAudioListenerState()
    const { duration, currentTime } = audioSlice

    const dispatch = useAudioListenerDispatch()

    const handleShowTranscription = () => {
        dispatch({
            type: 'TOGGLE_SHOW_TRANSCRIPTION',
        })
    }

    const handleSeekTime = (time: number) => {
        dispatch({
            type: 'SEEK_TIME',
            payload: time,
        })
    }

    return (
        <>
            <div>
                <Slider
                    audioDuration={duration}
                    currentTime={currentTime}
                    onSeek={(e) => {
                        handleSeekTime(e.target.valueAsNumber)
                    }}
                    togglePlay={() => {}}
                />
            </div>

            <div className="w-full bg-background text-center">
                <Button fill="outline">A</Button>
                <Button fill="outline">B</Button>
                <Button fill="outline" onClick={handleShowTranscription}>
                    {onePassMode.showTranscription ? '隐藏原文' : '显示原文'}
                </Button>
                <Button fill="outline">-5</Button>
                <Button fill="outline">+5</Button>
            </div>
        </>
    )
}
