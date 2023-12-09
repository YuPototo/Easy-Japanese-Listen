import { AudioSection } from '@/types/schema/audioSectionSchema'
import {
    Transcription,
    TranscriptionPart,
} from '@/types/schema/transcriptionSchema'

export interface AudioContentEditorState {
    audio: {
        fileName: string
        audioTitle: string
        transcription: Transcription
        sections: AudioSection[]
        audioSrc?: string | null
    }
    currentTime: number
    addNewTranscriptionPart: boolean
    updateSectionTitleIndex: number
    updateTranscriptionPartIndex: number
}

export type AudioContentEditorAction =
    | {
          type: 'ADD_NEW_PART'
      }
    | {
          type: 'START_UPDATE_SECTION_TITLE'
          payload: number
      }
    | {
          type: 'CANCEL_UPDATE_SECTION_TITLE'
      }
    | {
          type: 'UPDATE_SECTION_TITLE'
          payload: {
              sectionIndex: number
              title?: string
          }
      }
    | {
          type: 'DELETE_SECTION_TITLE'
          payload: number
      }
    | {
          type: 'ADD_NEW_SECTION'
          payload: number
      }
    | {
          type: 'START_UPDATE_TRANSCRIPTION_PART'
          payload: number
      }
    | {
          type: 'CANCEL_UPDATE_TRANSCRIPTION_PART'
      }
    | {
          type: 'DELETE_TRANSCRIPTION_PART'
          payload: number
      }
    | {
          type: 'UPDATE_TRANSCRIPTION_PART'
          payload: {
              index: number
              transcriptionPart: TranscriptionPart
          }
      }
    | {
          type: 'CANCEL_ADD_TRANSCRIPTION_PART'
      }
    | {
          type: 'ADD_TRANSCRIPTION_PART'
          payload: TranscriptionPart
      }
    | {
          type: 'UPDATE_CURRENT_TIME'
          payload: number
      }
