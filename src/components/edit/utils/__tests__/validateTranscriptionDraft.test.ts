import { expect, test } from 'vitest'

import { validateTranscriptionDraft } from '../validateTranscriptionDraft'

test('empty draft should fail', () => {
    const draft = [] as unknown
    const result = validateTranscriptionDraft(draft)

    expect(result).toEqual({
        success: false,
        error: 'draft is empty',
    })
})

test('Not array should fail', () => {
    const draft = {}
    const result = validateTranscriptionDraft(draft)

    expect(result).toEqual({
        success: false,
        error: 'draft is not an array',
    })
})

test('Bad transcription schema should fail', () => {
    const draft = [
        {
            endTime: 9999,
            text: 'hello', // filler type should not have text
        },
    ] as unknown
    const result = validateTranscriptionDraft(draft)

    expect(result.success).toBeFalsy()
    expect(result.error).toContain('Invalid')
})

test('last sentence should end with 9999', () => {
    const draft = [
        {
            type: 'filler',
            endTime: 9998,
        },
    ] as unknown
    const result = validateTranscriptionDraft(draft)

    expect(result.success).toBeFalsy()
    expect(result.error).toContain('Last sentence must end with 9999')
})

test('sentence end time should be larger than previous one', () => {
    const draft = [
        {
            type: 'filler',
            endTime: 10,
        },
        {
            type: 'filler',
            endTime: 5,
        },
        {
            type: 'filler',
            endTime: 9999,
        },
    ] as unknown
    const result = validateTranscriptionDraft(draft)

    expect(result.success).toBeFalsy()
    expect(result.error).toBe(
        'Sentence 1 end time 10 is smaller than sentence 0 end time 5',
    )
})
