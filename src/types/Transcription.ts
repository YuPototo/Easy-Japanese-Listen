export type Filler = {
    type: 'filler'
    endTime: number
}

export type Content = {
    type: 'content'
    content: string
    endTime: number
    autoSkip?: boolean // if true, player whould auto skip to next content
    speaker?: string
}

export type Transcription = (Filler | Content)[]
