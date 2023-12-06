import z from 'zod'

const FillerSchema = z
    .object({ type: z.literal('filler'), endTime: z.number() })
    .strict()

const ContentSchema = z
    .object({
        type: z.literal('content'),
        endTime: z.number(),
        text: z.string(),
        speaker: z.string().optional(),
    })
    .strict()

export const TranscriptionPartSchema = z.discriminatedUnion('type', [
    FillerSchema,
    ContentSchema,
])

export const TranscriptionSchema = z.array(TranscriptionPartSchema)

export type Filler = z.infer<typeof FillerSchema>
export type Content = z.infer<typeof ContentSchema>
export type TranscriptionPart = z.infer<typeof TranscriptionPartSchema>
export type Transcription = z.infer<typeof TranscriptionSchema>

export function isContentType(sentence: Filler | Content): sentence is Content {
    return sentence.type === 'content'
}
