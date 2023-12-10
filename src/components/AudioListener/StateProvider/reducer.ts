import { AudioListenerAction, AudioListenerState } from './type'

export function audioListenerReducer(
    state: AudioListenerState,
    action: AudioListenerAction,
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

        case 'AUDIO_LOAD_ERROR': {
            state.listenerState = 'loadError'
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
            state.audio.duration = action.payload.duration
            break
        }

        case 'AUDIO_TIME_UPDATE': {
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
            // action.type should be exhaustive, as a result,
            // TS will complain that type is never, which is right
            // When there is no error, then we have unhandled action
            // @ts-expect-error
            throw new Error('Unknown action: ' + action.type)
        }
    }
}
