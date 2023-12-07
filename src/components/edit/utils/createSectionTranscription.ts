import { TranscriptionPart } from '@/types/schema/transcriptionSchema'
import { AudioSection } from '@/types/schema/audioSectionSchema'

type IndexedTranscriptionPart = TranscriptionPart & {
    // index here is the index of the transcription part in the whole transcription
    // todo: rename this to globalIndex
    gloabalIndex: number
}

export type SectionTranscription = {
    title?: string
    transcription: IndexedTranscriptionPart[]
}

export function createSectionTranscription(
    sections: AudioSection[],
    transcription: TranscriptionPart[],
): SectionTranscription[] {
    // case 1: empty section
    if (sections.length === 0) {
        // case 1-1: non-empty transcription
        if (transcription.length > 0) {
            return [
                {
                    transcription: transcription.map((part, index) => ({
                        ...part,
                        gloabalIndex: index,
                    })),
                },
            ]
        }
        // case 1-2: empty transcription
        return []
    }

    // case 2: non-empty section
    if (sections.length >= 1) {
        let sectionsCopy = [...sections]
        if (sectionsCopy[0].startIndex !== 0) {
            sectionsCopy = [
                {
                    startIndex: 0,
                },
                ...sectionsCopy,
            ]
        }
        return sectionsCopy.map(({ title, startIndex }, index) => {
            const endIndex =
                index === sectionsCopy.length - 1
                    ? transcription.length
                    : sectionsCopy[index + 1].startIndex

            return {
                title,
                // transcription: transcription.slice(startIndex, endIndex),
                transcription: transcription
                    .slice(startIndex, endIndex)
                    .map((part, index) => ({
                        ...part,
                        gloabalIndex: index + startIndex,
                    })),
            }
        })
    }

    console.error('createSectionTranscription: unexpected case')
    return []
}
