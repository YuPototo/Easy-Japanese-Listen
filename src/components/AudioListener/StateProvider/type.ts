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
        slowPlay: boolean
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
    }
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
