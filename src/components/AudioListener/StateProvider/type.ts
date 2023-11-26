import { Transcription } from '@/types/Transcription'

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

export type AudioListenerAction =
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
          type: 'TOGGLE_SLOW_PLAY'
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
          type: 'SENENCE_REPEATED'
      }
