import { describe, expect, test } from 'vitest'
import { TranscriptionPartSchema } from '../transcriptionSchema'

describe('TranscriptionPartSchema', () => {
    test('Filler type ', () => {
        const draft = {
            type: 'filler',
            endTime: 9999,
        }

        const result = TranscriptionPartSchema.safeParse(draft)
        expect(result.success).toBeTruthy()
    })

    test('correct content type', () => {
        const draft = {
            type: 'content',
            text: 'hello',
            endTime: 10,
        }

        const result = TranscriptionPartSchema.safeParse(draft)
        expect(result.success).toBeTruthy()
    })

    test('content type, speaker', () => {
        const draft = {
            type: 'content',
            text: 'hello',
            speaker: 'speaker',
            endTime: 10,
        }

        const result = TranscriptionPartSchema.safeParse(draft)
        expect(result.success).toBeTruthy()
    })

    test('No type failure', () => {
        const draft = {
            endTime: 9999,
        }

        const result = TranscriptionPartSchema.safeParse(draft)
        expect(result.success).toBeFalsy()
    })

    test('Filler failure: no endtime', () => {
        const draft = {
            type: 'filler',
        }

        const result = TranscriptionPartSchema.safeParse(draft)
        expect(result.success).toBeFalsy()
    })

    test('Filler failure: fields from content type', () => {
        const draft1 = {
            type: 'filler',
            endTime: 9999,
            speaker: 'speaker',
        }

        const result1 = TranscriptionPartSchema.safeParse(draft1)
        expect(result1.success).toBeFalsy()

        const draft2 = [
            {
                type: 'filler',
                endTime: 9999,
                text: 'hello',
            },
        ]
        const result2 = TranscriptionPartSchema.safeParse(draft2)
        expect(result2.success).toBeFalsy()
    })
})
