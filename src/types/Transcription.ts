export type Filler = {
    type: 'filler'
    endTime: number
}

export type Content = {
    type: 'content'
    text: string
    endTime: number
    speaker?: string
}

export type Transcription = (Filler | Content)[]
