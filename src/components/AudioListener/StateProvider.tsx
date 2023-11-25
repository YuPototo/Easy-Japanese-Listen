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
        /* Listener state */
        case 'dataLoaded': {
            // 如果没有这个条件，就会经常触发这个 action
            if (state.listenerState === 'loading') {
                state.listenerState = 'loaded'
            }
            break
        }

        case 'startPlay': {
            state.listenerState = 'playing'
            state.audio.isPlaying = true
            break
        }

        /* audio state */
        case 'toggleMode': {
            const currentMode = state.audio.playMode
            state.audio.playMode =
                currentMode === 'bySentence' ? 'onePass' : 'bySentence'
            break
        }

        case 'togglePlay': {
            state.audio.isPlaying = !state.audio.isPlaying
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

        case 'finishFiller': {
            state.transcriptionPartIndex += 1
            break
        }

        /* sentence state */
        case 'understood': {
            state.currentSentence.understood = true
            break
        }

        case 'repeatSentence': {
            state.currentSentence.repeatTime += 1
            break
        }

        case 'toNextContentSentence': {
            state.transcriptionPartIndex += 1
            state.contentIndex += 1
            state.currentSentence.understood = false
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
