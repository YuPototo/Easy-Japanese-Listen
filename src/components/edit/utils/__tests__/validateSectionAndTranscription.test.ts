import { expect, test } from 'vitest'

import { validateSectionAndTranscription } from '../validateSectionAndTranscription'
import { Transcription } from '@/types/Transcription'

test('Section startIndex 0 could not be found in transcription', () => {
    const transcription: Transcription = []
    const sections = [
        {
            startIndex: 0,
        },
    ]

    const result = validateSectionAndTranscription(transcription, sections)

    expect(result.success).toBeFalsy()
    expect(result.error).toContain(
        'Section startIndex 0 could not be found in transcription',
    )
})

test('Section startIndex 1 could not be found in transcription', () => {
    const transcription: Transcription = [
        {
            type: 'filler',
            endTime: 9999,
        },
    ]
    const sections = [
        {
            startIndex: 1,
        },
    ]

    const result = validateSectionAndTranscription(transcription, sections)

    expect(result.success).toBeFalsy()
    expect(result.error).toContain(
        'Section startIndex 1 could not be found in transcription',
    )
})
