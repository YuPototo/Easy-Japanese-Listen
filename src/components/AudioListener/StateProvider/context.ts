import { createContext } from 'react'
import { AudioListenerAction, AudioListenerState } from './type'

export const initialState: AudioListenerState = {
    audioUrl: '',
    listenerState: 'loading',
    transcription: [],
    sections: [],
    transcriptionPartIndex: 0,
    contentIndex: 0,
    audio: {
        playMode: 'bySentence',
        isPlaying: false,
        slowPlay: false,
        duration: 0,
        currentTime: 0,
        jumpToTime: null,
    },
    currentSentence: {
        understood: false,
        repeatTime: 0,
    },
    onePassMode: {
        showTranscription: false,
        aPoint: null,
        bPoint: null,
    },
}

export const AudioListenerContext =
    createContext<AudioListenerState>(initialState)

//  dispatch context

type AudioListenerDispatch = React.Dispatch<AudioListenerAction>

export const AudioListenerDispatchContext =
    createContext<AudioListenerDispatch>({} as AudioListenerDispatch)
