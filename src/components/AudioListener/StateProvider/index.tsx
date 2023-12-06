import { Transcription } from '@/types/schema/transcriptionSchema'
import { useImmerReducer } from 'use-immer'
import {
    AudioListenerContext,
    AudioListenerDispatchContext,
    initialState,
} from './context'
import { audioListenerReducer } from './reducer'
import { useContext } from 'react'

type Props = {
    children: React.ReactNode
    transcription: Transcription
    audioUrl: string
}
export function AudioListenerProvider({
    children,
    transcription,
    audioUrl,
}: Props) {
    const [state, dispatch] = useImmerReducer(
        audioListenerReducer,
        initialState,
    )

    return (
        <AudioListenerContext.Provider
            value={{ ...state, transcription, audioUrl }}
        >
            <AudioListenerDispatchContext.Provider value={dispatch}>
                {children}
            </AudioListenerDispatchContext.Provider>
        </AudioListenerContext.Provider>
    )
}

export function useAudioListenerDispatch() {
    return useContext(AudioListenerDispatchContext)
}

export function useAudioListenerState() {
    return useContext(AudioListenerContext)
}
