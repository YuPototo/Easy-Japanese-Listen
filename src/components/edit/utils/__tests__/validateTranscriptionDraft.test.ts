import { expect, test } from 'vitest'

import { validateTranscriptionDraft } from '../validateTranscriptionDraft'

test('empty draft should fail', () => {
    // @ts-ignore
    const draft = []
    // @ts-expect-error we are testing invalid input
    const result = validateTranscriptionDraft(draft)

    expect(result).toEqual({
        success: false,
        error: 'draft is empty',
    })
})
