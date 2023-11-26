import { createContext } from 'react'
import { AudioListenerAction, AudioListenerState } from './type'

export const initialState: AudioListenerState = {
    audioUrl: '',
    listenerState: 'loading',
    transcription: [],
    transcriptionPartIndex: 0,
    contentIndex: 0,
    audio: {
        playMode: 'bySentence',
        isPlaying: false,
        slowPlay: false,
        duration: 0,
        currentTime: 0,
    },
    currentSentence: {
        understood: false,
        repeatTime: 0,
    },
}

export const AudioListenerContext =
    createContext<AudioListenerState>(initialState)

//  dispatch context

type AudioListenerDispatch = React.Dispatch<AudioListenerAction>

export const AudioListenerDispatchContext =
    createContext<AudioListenerDispatch>({} as AudioListenerDispatch)
