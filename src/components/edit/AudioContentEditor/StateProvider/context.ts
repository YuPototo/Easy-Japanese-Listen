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
    currentTime: 0,
    addNewTranscriptionPart: false,
    updateSectionTitleIndex: -1,
    updateTranscriptionPartIndex: -1,
}

export const AudioContentEditorContext =
    createContext<AudioContentEditorState>(initialState)

//  dispatch context

type AudioContentEditorDispatch = React.Dispatch<AudioContentEditorAction>

export const AudioContentEditorDispatchContext =
    createContext<AudioContentEditorDispatch>({} as AudioContentEditorDispatch)
