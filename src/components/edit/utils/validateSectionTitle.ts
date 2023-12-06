import { AudioSectionListSchema } from '@/types/schema/audioSectionSchema'

export function validateSectionTitle(draft: unknown) {
    if (!Array.isArray(draft)) {
        return { success: false, error: 'draft is not an array' }
    }

    const result = AudioSectionListSchema.safeParse(draft)

    if (!result.success) {
        return {
            success: false,
            error: result.error.message,
        }
    }

    return { success: true, error: null }
}
