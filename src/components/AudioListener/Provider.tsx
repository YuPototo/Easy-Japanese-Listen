import { Dispatch, createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'

export interface AudioListenerState {
    listenerState: 'loading' | 'loaded' | 'playing'

    transcriptionPartIndex: number
    contentIndex: number

    audio: {
        playMode: 'bySentence' | 'onePass'
        isPlaying: boolean
        slowPlay: boolean
        duration: number
        currentTime: number
    }

    currentSentence: {
        understood: boolean
        repeatTime: number
    }
}

export const initialState: AudioListenerState = {
    listenerState: 'loading',
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

const AudioListenerContext = createContext<AudioListenerState>(initialState)

type DispatchFunction = Dispatch<{ type: string }>

const AudioListenerDispatchContext = createContext<DispatchFunction | null>(
    null,
)

export function AudioListenerProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [state, dispatch] = useImmerReducer(
        audioListenerReducer,
        initialState,
    )

    return (
        <AudioListenerContext.Provider value={state}>
            <AudioListenerDispatchContext.Provider value={dispatch}>
                {children}
            </AudioListenerDispatchContext.Provider>
        </AudioListenerContext.Provider>
    )
}

function audioListenerReducer(
    state: AudioListenerState,
    action: { type: string },
) {
    switch (action.type) {
        case 'dataLoaded': {
            state.listenerState = 'loaded'
            break
        }

        case 'enterPlay': {
            state.listenerState = 'playing'
            break
        }

        case 'toggleMode': {
            const currentMode = state.audio.playMode
            state.audio.playMode =
                currentMode === 'bySentence' ? 'onePass' : 'bySentence'
            break
        }

        case 'startPlay': {
            state.audio.isPlaying = true
            break
        }

        case 'pausePlay': {
            state.audio.isPlaying = false
            break
        }

        case 'toggleSlowPlay': {
            state.audio.slowPlay = !state.audio.slowPlay
            break
        }

        case 'audioLoaded': {
            // @ts-expect-error action needs to be typed
            state.audio.duration = action.payload.duration
            break
        }

        case 'audioTimeUpdate': {
            // @ts-expect-error action needs to be typed
            state.audio.currentTime = action.payload.currentTime
            break
        }

        case 'transcriptionPartIndexInc': {
            state.transcriptionPartIndex += 1
            break
        }

        case 'contentIndexInc': {
            state.contentIndex += 1
            break
        }

        case 'understood': {
            state.currentSentence.understood = true
            break
        }

        case 'resetUnderstood': {
            state.currentSentence.understood = false
            break
        }

        case 'incRepeatCount': {
            state.currentSentence.repeatTime += 1
            break
        }

        case 'resetRepeatCount': {
            state.currentSentence.repeatTime = 0
            break
        }

        default: {
            throw new Error('Unknown action: ' + action.type)
        }
    }
}

export function useAudioListenerDispatch() {
    return useContext(AudioListenerDispatchContext)
}

export function useAudioListenerState() {
    return useContext(AudioListenerContext)
}
