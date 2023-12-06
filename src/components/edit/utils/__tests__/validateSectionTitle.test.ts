import { expect, test } from 'vitest'

import { validateSectionTitle } from '../validateSectionTitle'

test('Should be array', () => {
    const draft = {}
    const result = validateSectionTitle(draft)

    expect(result).toEqual({
        success: false,
        error: 'draft is not an array',
    })
})

test('No startIndex', () => {
    const draft = [
        {
            title: 'test',
        },
    ]
    const result = validateSectionTitle(draft)

    expect(result.success).toBeFalsy()
    expect(result.error).toContain('startIndex')
})

test('Invalid: Extra field', () => {
    const draft = [
        {
            title: 'test',
            startIndex: 0,
            extra: 'extra',
        },
    ]
    const result = validateSectionTitle(draft)

    expect(result.success).toBeFalsy()
    expect(result.error).toContain('extra')
})

test('No title is fine', () => {
    const draft = [
        {
            startIndex: 0,
        },
    ]
    const result = validateSectionTitle(draft)

    expect(result.success).toBeTruthy()
})
