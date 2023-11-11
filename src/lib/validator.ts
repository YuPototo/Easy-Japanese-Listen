import z from 'zod'

export const TranscriptionSchema = z.array(
    z.union([
        z.object({
            type: z.literal('filler'),
            endTime: z.number(),
        }),
        z.object({
            type: z.literal('content'),
            text: z.string(),
            endTime: z.number(),
            speaker: z.string().optional(),
        }),
    ]),
)
