import { Transcription } from '@/types/schema/transcriptionSchema'
import { AudioSection } from '@/types/schema/audioSectionSchema'

export function validateSectionAndTranscription(
    transcription: Transcription,
    sections: AudioSection[],
) {
    for (const section of sections) {
        if (transcription[section.startIndex] === undefined) {
            return {
                success: false,
                error: `Section startIndex ${section.startIndex} could not be found in transcription`,
            }
        }
    }

    return { success: true, error: null }
}
