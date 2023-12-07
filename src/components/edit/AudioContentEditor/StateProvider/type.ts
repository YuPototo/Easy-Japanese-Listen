import { AudioSection } from '@/types/schema/audioSectionSchema'
import { Transcription } from '@/types/schema/transcriptionSchema'

export interface AudioContentEditorState {
    audio: {
        fileName: string
        audioTitle: string
        transcription: Transcription
        sections: AudioSection[]
        audioSrc?: string | null
    }
    addNewTranscriptionPart: boolean
    updateSectionTitleIndex: number
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
