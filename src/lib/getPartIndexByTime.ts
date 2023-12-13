import { TranscriptionPart } from '@/types/schema/transcriptionSchema'

/**
 * Given a time and a list of TranscriptionPart, return the index of the part
 */
export function getPartIndexByTime(
    time: number,
    parts: TranscriptionPart[],
): number {
    let index = 0
    for (const part of parts) {
        if (part.endTime > time) {
            return index
        }
        index += 1
    }
    return index
}

export function getPartAndContentIndexByTime(
    time: number,
    parts: TranscriptionPart[],
): {
    partIndex: number
    contentIndex: number
} {
    const partIndex = getPartIndexByTime(time, parts)
    const contentParts = parts.filter((el) => el.type === 'content')
    const contentIndex = getPartIndexByTime(time, contentParts)
    return { partIndex, contentIndex }
}
