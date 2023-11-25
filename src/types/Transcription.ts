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

export type TranscriptionPart = Filler | Content

export type Transcription = TranscriptionPart[]

export function isContentType(sentence: Filler | Content): sentence is Content {
    return sentence.type === 'content'
}
