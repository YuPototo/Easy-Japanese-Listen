import { getPartAndContentIndexByTime } from '@/lib/getPartIndexByTime'
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

            // 切换模式时会删除 ab point
            state.onePassMode.aPoint = null
            state.onePassMode.bPoint = null
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

        case 'SENTENCE_REPEATED': {
            state.currentSentence.repeatTime += 1
            break
        }

        /* one pass mode */
        case 'TOGGLE_SHOW_TRANSCRIPTION': {
            state.onePassMode.showTranscription =
                !state.onePassMode.showTranscription
            break
        }

        case 'SEEK_TIME': {
            state.audio.jumpToTime = action.payload

            const { partIndex, contentIndex } = getPartAndContentIndexByTime(
                action.payload,
                state.transcription,
            )

            state.transcriptionPartIndex = partIndex
            state.contentIndex = contentIndex

            break
        }

        case 'JUMP_TIME_FINISHED': {
            state.audio.jumpToTime = null
            break
        }

        case 'MOVE_TIME_BY': {
            const jumpToTime = state.audio.currentTime + action.payload
            state.audio.jumpToTime = jumpToTime

            const { partIndex, contentIndex } = getPartAndContentIndexByTime(
                jumpToTime,
                state.transcription,
            )

            state.transcriptionPartIndex = partIndex
            state.contentIndex = contentIndex

            break
        }

        case 'SET_A_POINT': {
            state.onePassMode.aPoint = action.payload
            break
        }

        case 'CLEAR_A_POINT': {
            state.onePassMode.aPoint = null
            break
        }

        case 'SET_B_POINT': {
            state.onePassMode.bPoint = action.payload
            break
        }

        case 'CLEAR_B_POINT': {
            state.onePassMode.bPoint = null
            break
        }

        case 'CLEAR_AB_POINT': {
            state.onePassMode.aPoint = null
            state.onePassMode.bPoint = null
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
