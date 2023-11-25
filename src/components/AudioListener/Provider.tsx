import { Dispatch, createContext, useContext, useReducer } from 'react'

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

    sentenceContent: {
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
    sentenceContent: {
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
    const [state, dispatch] = useReducer(audioListenerReducer, initialState)

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
): AudioListenerState {
    switch (action.type) {
        case 'dataLoaded': {
            return {
                ...state,
                listenerState: 'loaded',
            }
        }

        case 'enterPlay': {
            return {
                ...state,
                listenerState: 'playing',
            }
        }

        case 'toggleMode': {
            return {
                ...state,
                audio: {
                    ...state.audio,
                    playMode:
                        state.audio.playMode === 'bySentence'
                            ? 'onePass'
                            : 'bySentence',
                },
            }
        }

        case 'startPlay': {
            return {
                ...state,
                audio: {
                    ...state.audio,
                    isPlaying: true,
                },
            }
        }

        case 'pausePlay': {
            return {
                ...state,
                audio: {
                    ...state.audio,
                    isPlaying: false,
                },
            }
        }

        case 'toggleSlowPlay': {
            return {
                ...state,
                audio: {
                    ...state.audio,
                    slowPlay: !state.audio.slowPlay,
                },
            }
        }

        case 'audioLoaded': {
            return {
                ...state,
                audio: {
                    ...state.audio,
                    // @ts-expect-error action needs to be typed
                    duration: action.payload.duration,
                },
            }
        }

        case 'audioTimeUpdate': {
            return {
                ...state,
                audio: {
                    ...state.audio,
                    // @ts-expect-error action needs to be typed
                    currentTime: action.payload.currentTime,
                },
            }
        }

        case 'transcriptionPartIndexInc': {
            return {
                ...state,
                transcriptionPartIndex: state.transcriptionPartIndex + 1,
            }
        }

        case 'contentIndexInc': {
            return {
                ...state,
                contentIndex: state.contentIndex + 1,
            }
        }

        case 'understood': {
            return {
                ...state,
                sentenceContent: {
                    ...state.sentenceContent,
                    understood: true,
                },
            }
        }

        case 'resetUnderstood': {
            return {
                ...state,
                sentenceContent: {
                    ...state.sentenceContent,
                    understood: false,
                },
            }
        }

        case 'incRepeatCount': {
            return {
                ...state,
                sentenceContent: {
                    ...state.sentenceContent,
                    repeatTime: state.sentenceContent.repeatTime + 1,
                },
            }
        }

        case 'resetRepeatCount': {
            return {
                ...state,
                sentenceContent: {
                    ...state.sentenceContent,
                    repeatTime: 0,
                },
            }
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
