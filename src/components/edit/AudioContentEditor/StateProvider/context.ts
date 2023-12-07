import { createContext } from 'react'
import { AudioContentEditorState, AudioContentEditorAction } from './type'

export const initialState: AudioContentEditorState = {
    audio: {
        fileName: '',
        audioTitle: '',
        audioSrc: null,
        transcription: [],
        sections: [],
    },
    addNewTranscriptionPart: false,
}

export const AudioContentEditorContext =
    createContext<AudioContentEditorState>(initialState)

//  dispatch context

type AudioContentEditorDispatch = React.Dispatch<AudioContentEditorAction>

export const AudioContentEditorDispatchContext =
    createContext<AudioContentEditorDispatch>({} as AudioContentEditorDispatch)
