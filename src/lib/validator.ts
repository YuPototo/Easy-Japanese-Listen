import z from 'zod'

export const TranscriptionPartSchema = z.discriminatedUnion('type', [
    z.object({ type: z.literal('filler'), endTime: z.number() }).strict(),
    z
        .object({
            type: z.literal('content'),
            endTime: z.number(),
            text: z.string(),
            speaker: z.string().optional(),
        })
        .strict(),
])

// todo: use the zod type instead of my custom type
// export type TranscriptionPart = z.infer<typeof TranscriptionPartSchema>

export const TranscriptionSchema = z.array(TranscriptionPartSchema)

export const AudioSectionSchema = z
    .object({
        title: z.string().optional(),
        startIndex: z.number(),
    })
    .strict()

export const AudioSectionListSchema = z.array(AudioSectionSchema)
