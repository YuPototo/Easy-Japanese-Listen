import { Button } from '../ui/button'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'
import Slider from '../Slider'
import MainOperator from './MainOperator'
import AllTranscription from './AllTranscription'

export default function OnePassMode() {
    return (
        <div className="mb-64 flex flex-grow flex-col items-center">
            <AllTranscription />
            <div className="fixed bottom-0 flex w-full flex-col gap-4 bg-background pt-2">
                <SubOperator />
                <MainOperator />
            </div>
        </div>
    )
}

function SubOperator() {
    const { audio: audioSlice, onePassMode } = useAudioListenerState()
    const { duration, currentTime } = audioSlice

    const dispatch = useAudioListenerDispatch()

    const handleShowTranscription = () => {
        dispatch({
            type: 'TOGGLE_SHOW_TRANSCRIPTION',
        })
    }

    return (
        <>
            <div>
                <Slider
                    audioDuration={duration}
                    currentTime={currentTime}
                    onSeek={(e) => {
                        // todo p1: seek
                        console.log(e)
                    }}
                    togglePlay={() => {}}
                />
            </div>

            <div className="w-full bg-background text-center">
                <Button fill="outline" onClick={handleShowTranscription}>
                    {onePassMode.showTranscription ? '隐藏原文' : '显示原文'}
                </Button>
            </div>
        </>
    )
}
