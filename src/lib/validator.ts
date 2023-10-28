import z from 'zod'

export const TranscriptionSchema = z.array(
    z.union([
        z.object({
            type: z.literal('filler'),
            endTime: z.number(),
        }),
        z.object({
            type: z.literal('content'),
            content: z.string(),
            endTime: z.number(),
            autoSkip: z.boolean().optional(),
            speaker: z.string().optional(),
        }),
    ]),
)
