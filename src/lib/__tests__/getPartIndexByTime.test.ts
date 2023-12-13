import { expect, test, describe } from 'vitest'
import { TranscriptionPart } from '@/types/schema/transcriptionSchema'
import { getPartIndexByTime } from '../getPartIndexByTime'

describe('getPartIndexByTime', () => {
    test('', () => {
        const parts: TranscriptionPart[] = [
            {
                type: 'filler',
                endTime: 2.51,
            },
            {
                text: '弁当屋で男のアルバイトの人と店長が話しています。',
                type: 'content',
                endTime: 8.36,
            },
            {
                type: 'filler',
                endTime: 9999,
            },
        ]

        expect(getPartIndexByTime(0, parts)).toBe(0)
        expect(getPartIndexByTime(1, parts)).toBe(0)
        expect(getPartIndexByTime(2.51, parts)).toBe(1)
        expect(getPartIndexByTime(5, parts)).toBe(1)
        expect(getPartIndexByTime(8.36, parts)).toBe(2)
        expect(getPartIndexByTime(20, parts)).toBe(2)
    })
})
