import { AudioSection } from '@/types/schema/audioSectionSchema'
import { Transcription } from '@/types/schema/transcriptionSchema'

export interface AudioListenerState {
    audioUrl: string
    transcription: Transcription
    sections: AudioSection[]

    listenerState: 'loading' | 'loaded' | 'studying' | 'loadError'

    transcriptionPartIndex: number // 当前正在听的句子的 index
    contentIndex: number

    audio: {
        playMode: 'bySentence' | 'onePass'
        isPlaying: boolean
        playbackRate: number
        duration: number
        currentTime: number
        jumpToTime: number | null
    }

    currentSentence: {
        understood: boolean
        repeatTime: number
    }
    onePassMode: {
        showTranscription: boolean
        aPoint: number | null
        bPoint: number | null
    }
}

export type AbRepeatAction =
    | {
          type: 'SET_A_POINT'
          payload: number
      }
    | {
          type: 'SET_B_POINT'
          payload: number
      }
    | {
          type: 'CLEAR_A_POINT'
      }
    | {
          type: 'CLEAR_B_POINT'
      }
    | {
          type: 'CLEAR_AB_POINT'
      }

export type AudioListenerAction =
    | {
          type: 'AUDIO_LOAD_ERROR'
      }
    | {
          type: 'DATA_LOADED'
      }
    | {
          type: 'START_STUDY'
      }
    | {
          type: 'TOGGLE_MODE'
      }
    | {
          type: 'TOGGLE_PLAY_AUDIO'
      }
    | {
          type: 'SET_PLAYBACK_RATE'
          payload: number
      }
    | {
          type: 'AUDIO_METADATA_LOADED'
          payload: { duration: number }
      }
    | {
          type: 'AUDIO_TIME_UPDATE'
          payload: { currentTime: number }
      }
    | {
          type: 'FINISH_FILLER_SENTENCE'
      }
    | {
          type: 'FINISH_CONTENT_SENTENCE'
      }
    | {
          type: 'SENTENCE_UNDERSTOOD'
      }
    | {
          type: 'SENTENCE_REPEATED'
      }
    | {
          type: 'TOGGLE_SHOW_TRANSCRIPTION'
      }
    | {
          type: 'SEEK_TIME'
          payload: number
      }
    | { type: 'JUMP_TIME_FINISHED' }
    | {
          type: 'MOVE_TIME_BY'
          payload: number
      }
    | AbRepeatAction
