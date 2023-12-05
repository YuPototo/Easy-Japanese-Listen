import { expect, test } from 'vitest'
import { createSectionTranscription } from '../helpers'
import { AudioSection } from '@/types/AudioSection'
import { TranscriptionPart } from '@/types/Transcription'

test('empty section and empty transcription', () => {
    const sections: AudioSection[] = []
    const transcription: TranscriptionPart[] = []
    const result = createSectionTranscription(sections, transcription)

    expect(result).toEqual([])
})

test('empty section and non-empty transcription', () => {
    const sections: AudioSection[] = []
    const transcription: TranscriptionPart[] = [
        {
            type: 'filler',
            endTime: 2.51,
        },
        {
            text: '弁当屋で男のアルバイトの人と店長が話しています。',
            type: 'content',
            endTime: 8.36,
        },
    ]

    const result = createSectionTranscription(sections, transcription)

    expect(result).toEqual([
        {
            transcription: [
                {
                    type: 'filler',
                    endTime: 2.51,
                    gloabalIndex: 0,
                },
                {
                    text: '弁当屋で男のアルバイトの人と店長が話しています。',
                    type: 'content',
                    endTime: 8.36,
                    gloabalIndex: 1,
                },
            ],
        },
    ])
})

test('1 section and empty transcription', () => {
    const sections: AudioSection[] = [
        {
            title: '1',
            startIndex: 0,
        },
    ]
    const transcription: TranscriptionPart[] = []
    const result = createSectionTranscription(sections, transcription)

    expect(result).toEqual([
        {
            title: '1',
            transcription: [],
        },
    ])
})

test('1 section and 1 transcription', () => {
    const sections: AudioSection[] = [
        {
            title: '1',
            startIndex: 0,
        },
    ]
    const transcription: TranscriptionPart[] = [
        {
            text: '弁当屋で男のアルバイトの人と店長が話しています。',
            type: 'content',
            endTime: 8.36,
        },
    ]
    const result = createSectionTranscription(sections, transcription)

    expect(result).toEqual([
        {
            title: '1',
            transcription: [
                {
                    text: '弁当屋で男のアルバイトの人と店長が話しています。',
                    type: 'content',
                    endTime: 8.36,
                    gloabalIndex: 0,
                },
            ],
        },
    ])
})

test('2 section and many transcriptions', () => {
    const sections: AudioSection[] = [
        {
            title: '1',
            startIndex: 0,
        },
        {
            title: '2',
            startIndex: 3,
        },
    ]

    const transcription: TranscriptionPart[] = [
        {
            text: 'sentence 0',
            type: 'content',
            endTime: 0,
        },
        {
            text: 'sentence 1',
            type: 'content',
            endTime: 1,
        },
        {
            text: 'sentence 2',
            type: 'content',
            endTime: 2,
        },
        {
            text: 'sentence 3',
            type: 'content',
            endTime: 3,
        },
        {
            text: 'sentence 4',
            type: 'content',
            endTime: 4,
        },
        {
            text: 'sentence 5',
            type: 'content',
            endTime: 5,
        },
    ]
    const result = createSectionTranscription(sections, transcription)

    expect(result).toEqual([
        {
            title: '1',
            transcription: [
                {
                    text: 'sentence 0',
                    type: 'content',
                    endTime: 0,
                    gloabalIndex: 0,
                },
                {
                    text: 'sentence 1',
                    type: 'content',
                    endTime: 1,
                    gloabalIndex: 1,
                },
                {
                    text: 'sentence 2',
                    type: 'content',
                    endTime: 2,
                    gloabalIndex: 2,
                },
            ],
        },
        {
            title: '2',
            transcription: [
                {
                    text: 'sentence 3',
                    type: 'content',
                    endTime: 3,
                    gloabalIndex: 3,
                },
                {
                    text: 'sentence 4',
                    type: 'content',
                    endTime: 4,
                    gloabalIndex: 4,
                },
                {
                    text: 'sentence 5',
                    type: 'content',
                    endTime: 5,
                    gloabalIndex: 5,
                },
            ],
        },
    ])
})

test('section has no title', () => {
    const sections: AudioSection[] = [
        {
            startIndex: 0,
        },
    ]
    const transcription: TranscriptionPart[] = [
        {
            text: '弁当屋で男のアルバイトの人と店長が話しています。',
            type: 'content',
            endTime: 8.36,
        },
    ]
    const result = createSectionTranscription(sections, transcription)

    expect(result).toEqual([
        {
            transcription: [
                {
                    text: '弁当屋で男のアルバイトの人と店長が話しています。',
                    type: 'content',
                    endTime: 8.36,
                    gloabalIndex: 0,
                },
            ],
        },
    ])
})

test('section start from non-zero index', () => {
    const sections: AudioSection[] = [
        {
            title: '2',
            startIndex: 2,
        },
    ]
    const transcription: TranscriptionPart[] = [
        {
            text: 'sentence 0',
            type: 'content',
            endTime: 0,
        },
        {
            text: 'sentence 1',
            type: 'content',
            endTime: 1,
        },
        {
            text: 'sentence 2',
            type: 'content',
            endTime: 2,
        },
        {
            text: 'sentence 3',
            type: 'content',
            endTime: 3,
        },
    ]
    const result = createSectionTranscription(sections, transcription)

    expect(result).toEqual([
        {
            transcription: [
                {
                    text: 'sentence 0',
                    type: 'content',
                    endTime: 0,
                    gloabalIndex: 0,
                },
                {
                    text: 'sentence 1',
                    type: 'content',
                    endTime: 1,
                    gloabalIndex: 1,
                },
            ],
        },
        {
            title: '2',
            transcription: [
                {
                    text: 'sentence 2',
                    type: 'content',
                    endTime: 2,
                    gloabalIndex: 2,
                },
                {
                    text: 'sentence 3',
                    type: 'content',
                    endTime: 3,
                    gloabalIndex: 3,
                },
            ],
        },
    ])
})
