import { describe, expect, test } from 'vitest'
import { AudioSectionSchema } from '../audioSectionSchema'

describe('AudioSectionSchema', () => {
    test('correct', () => {
        const draft = {
            title: 'title',
            startIndex: 0,
        }

        const result = AudioSectionSchema.safeParse(draft)
        expect(result.success).toBeTruthy()
    })

    test('Correct: No title', () => {
        const draft = {
            startIndex: 0,
        }

        const result = AudioSectionSchema.safeParse(draft)
        expect(result.success).toBeTruthy()
    })

    test('Invalid: No start index', () => {
        const draft = {
            title: 'title',
        }

        const result = AudioSectionSchema.safeParse(draft)
        expect(result.success).toBeFalsy()
    })
})
