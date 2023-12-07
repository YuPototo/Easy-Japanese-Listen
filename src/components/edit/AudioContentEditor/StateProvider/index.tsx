import { useImmerReducer } from 'use-immer'
import {
    AudioContentEditorContext,
    AudioContentEditorDispatchContext,
    initialState,
} from './context'
import { audioContentReducer } from './reducer'
import { useContext } from 'react'
import { Transcription } from '@/types/schema/transcriptionSchema'
import { AudioSection } from '@/types/schema/audioSectionSchema'

type Props = {
    children: React.ReactNode
    audio: {
        fileName: string
        audioTitle: string
        audioSrc?: string | null
        transcription: Transcription
        sections: AudioSection[]
    }
}

export function AudioContentEditorProvider({ children, audio }: Props) {
    const fixInitialState = { ...initialState, audio }
    const [state, dispatch] = useImmerReducer(
        audioContentReducer,
        fixInitialState,
    )

    return (
        <AudioContentEditorContext.Provider value={state}>
            <AudioContentEditorDispatchContext.Provider value={dispatch}>
                {children}
            </AudioContentEditorDispatchContext.Provider>
        </AudioContentEditorContext.Provider>
    )
}

export function useAudioContentEditorDispatch() {
    return useContext(AudioContentEditorDispatchContext)
}

export function useAudioContentEditorState() {
    return useContext(AudioContentEditorContext)
}
