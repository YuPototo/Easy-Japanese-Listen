import AudioPlayer, { Transcription } from '@/components/AudioPlayer'

const transcription = [
    {
        type: 'filler',
        endTime: 2,
    },
    {
        type: 'content',
        content: '这是第1句话',
        endTime: 4,
    },
    {
        type: 'content',
        content: '这是第2句话',
        endTime: 6,
    },
    {
        type: 'content',
        content: '这是第3句话',
        endTime: 8,
    },
    {
        type: 'content',
        content: '这是第4句话',
        endTime: 9999,
    },
] as Transcription[]

export default async function Page() {
    return (
        <main className="m-4 flex flex-col items-center">
            <div className="m-4">This is tmp page</div>
            <AudioPlayer
                audioUrl={'https://assets.riyu.love/audios/2020_12_n3_1_1.mp3'}
                transcription={transcription}
            />
        </main>
    )
}
