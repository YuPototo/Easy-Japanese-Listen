import { Transcription } from '@/types/schema/transcriptionSchema'
import { useImmerReducer } from 'use-immer'
import {
    AudioListenerContext,
    AudioListenerDispatchContext,
    initialState,
} from './context'
import { audioListenerReducer } from './reducer'
import { useContext } from 'react'
import { AudioSection } from '@/types/schema/audioSectionSchema'

type Props = {
    children: React.ReactNode
    transcription: Transcription
    sections: AudioSection[]
    audioUrl: string
}

function AudioListenerProvider({
    children,
    transcription,
    sections,
    audioUrl,
}: Props) {
    const [state, dispatch] = useImmerReducer(audioListenerReducer, {
        ...initialState,
        transcription,
        audioUrl,
        sections,
    })

    return (
        <AudioListenerContext.Provider value={state}>
            <AudioListenerDispatchContext.Provider value={dispatch}>
                {children}
            </AudioListenerDispatchContext.Provider>
        </AudioListenerContext.Provider>
    )
}

AudioListenerProvider.displayName = 'AudioListenerProvider'
export default AudioListenerProvider

export function useAudioListenerDispatch() {
    return useContext(AudioListenerDispatchContext)
}

export function useAudioListenerState() {
    return useContext(AudioListenerContext)
}
