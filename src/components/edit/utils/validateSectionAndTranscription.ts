import { AudioSection } from '@/types/AudioSection'
import { Transcription } from '@/types/Transcription'

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
