import { Transcription } from '@/types/schema/transcriptionSchema'

export function setNextSpeaker(lastSpeaker?: string): string {
    if (lastSpeaker === 'A') {
        return 'B'
    }

    if (lastSpeaker === 'B') {
        return 'A'
    }

    if (lastSpeaker === '男') {
        return '女'
    }

    if (lastSpeaker === '女') {
        return '男'
    }

    return ''
}

export function getLastSpeaker(
    transcriptionDraft: Transcription,
): string | undefined {
    // get last part
    const latestPart = transcriptionDraft[transcriptionDraft.length - 1]

    if (!latestPart) {
        return
    }

    if (latestPart.type === 'filler') {
        return
    }

    return latestPart.speaker
}

export default function guessNextSpeaker(transcription: Transcription) {
    const lastSpeaker = getLastSpeaker(transcription)

    return setNextSpeaker(lastSpeaker)
}
