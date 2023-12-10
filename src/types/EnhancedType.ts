import { Album, Track } from '@/database/dbTypeHelper'
import { Transcription } from './schema/transcriptionSchema'
import { AudioSection } from './schema/audioSectionSchema'

export type AlbumWithCover = Album & { coverUrl: string }

// todo p3: how to return the right type from Supabase?
export type EnhancedTrack = Track & { transcription: Transcription } & {
    sections: AudioSection[]
}
