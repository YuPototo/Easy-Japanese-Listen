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
}

export type AudioContentEditorAction = {
    type: 'ADD_NEW_PART'
}
