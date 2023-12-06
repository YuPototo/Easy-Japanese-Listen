import z from 'zod'

export const AudioSectionSchema = z
    .object({
        title: z.string().optional(),
        startIndex: z.number(),
    })
    .strict()

export type AudioSection = z.infer<typeof AudioSectionSchema>

export const AudioSectionListSchema = z.array(AudioSectionSchema)
