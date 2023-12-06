import { TranscriptionSchema } from '@/lib/validator'
import { TranscriptionPart } from '@/types/Transcription'

export function validateTranscriptionDraft(draft: unknown) {
    if (!Array.isArray(draft)) {
        return { success: false, error: 'draft is not an array' }
    }

    if (draft.length === 0) {
        return { success: false, error: 'draft is empty' }
    }

    try {
        TranscriptionSchema.parse(draft)
    } catch (err) {
        // @ts-expect-error
        return { success: false, error: err.message }
    }

    const lastSentence = draft[draft.length - 1] as TranscriptionPart

    if (lastSentence.endTime !== 9999) {
        return {
            success: false,
            error: 'Last sentence must end with 9999',
        }
    }

    // validate that the latter sentence's end time should be larger than the previous one
    for (let i = 1; i < draft.length; i++) {
        const prevSentence = draft[i - 1] as TranscriptionPart
        const currSentence = draft[i] as TranscriptionPart

        if (prevSentence.endTime > currSentence.endTime) {
            return {
                success: false,
                error: `Sentence ${i} end time ${
                    prevSentence.endTime
                } is smaller than sentence ${i - 1} end time ${
                    currSentence.endTime
                }`,
            }
        }
    }

    return { success: true, error: null }
}
