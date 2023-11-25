import { Transcription } from '@/types/Transcription'
import { Dispatch, createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'

export interface AudioListenerState {
    audioUrl: string
    transcription: Transcription

    listenerState: 'loading' | 'loaded' | 'studying'

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

const AudioListenerContext = createContext<AudioListenerState>(initialState)

type DispatchFunction = Dispatch<{ type: string }>

const AudioListenerDispatchContext = createContext<DispatchFunction | null>(
    null,
)

export function AudioListenerProvider({
    children,
    transcription,
    audioUrl,
}: {
    children: React.ReactNode
    transcription: Transcription
    audioUrl: string
}) {
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

function audioListenerReducer(
    state: AudioListenerState,
    action: { type: string },
) {
    switch (action.type) {
        /* Listener state */
        case 'DATA_LOADED': {
            // 如果没有这个条件，就会经常触发这个 action
            if (state.listenerState === 'loading') {
                state.listenerState = 'loaded'
            }
            break
        }

        case 'START_STUDY': {
            state.listenerState = 'studying'
            state.audio.isPlaying = true
            break
        }

        /* audio state */
        case 'TOGGLE_MODE': {
            const currentMode = state.audio.playMode
            state.audio.playMode =
                currentMode === 'bySentence' ? 'onePass' : 'bySentence'
            break
        }

        case 'TOGGLE_PLAY_AUDIO': {
            state.audio.isPlaying = !state.audio.isPlaying
            break
        }

        case 'TOGGLE_SLOW_PLAY': {
            state.audio.slowPlay = !state.audio.slowPlay
            break
        }

        case 'AUDIO_METADATA_LOADED': {
            // @ts-expect-error action needs to be typed
            state.audio.duration = action.payload.duration
            break
        }

        case 'AUDIO_TIME_UPDATE': {
            // @ts-expect-error action needs to be typed
            state.audio.currentTime = action.payload.currentTime
            break
        }

        case 'FINISH_FILLER_SENTENCE': {
            state.transcriptionPartIndex += 1
            break
        }

        case 'FINISH_CONTENT_SENTENCE': {
            state.transcriptionPartIndex += 1
            state.contentIndex += 1
            state.currentSentence.understood = false
            state.currentSentence.repeatTime = 0
            break
        }

        /* sentence state */
        case 'SENTENCE_UNDERSTOOD': {
            state.currentSentence.understood = true
            break
        }

        case 'SENENCE_REPEATED': {
            state.currentSentence.repeatTime += 1
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