import AudioPlayer from '@/components/AudioPlayer'
import { BUCKET_NAME } from '@/constants'
import { Database } from '@/database/database.types'
import { Transcription } from '@/types/Transcription'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type PageParam = {
    params: { id: string }
}

export default async function Page({ params }: PageParam) {
    const track = await getTrack(params.id)
    return (
        <main className="m-4 flex flex-col items-center">
            {track !== null && (
                <div>
                    <h1 className="mt-10 text-lg">{track.title}</h1>
                    <AudioPlayer
                        audioUrl={track.audioUrl}
                        transcription={track.transcription}
                    />
                </div>
            )}
        </main>
    )
}

type Track = {
    id: number
    title: string
    audioUrl: string
    transcription: Transcription
}

async function getTrack(id: string): Promise<Track | null> {
    const supabase = createClientComponentClient<Database>()

    let { data, error } = await supabase.from('track').select('*').eq('id', id)

    if (error) {
        console.error(error)
        return null
    }

    if (data === null) {
        console.error('No data')
        return null
    }

    const track = data[0]

    // todo: what if we don't get the audio data?
    const { data: audioData } = await supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(track.storage_path)

    // todo: add runtime check for transcription

    return {
        id: track.id,
        title: track.track_title,
        audioUrl: audioData.publicUrl,
        transcription: track.transcription as Transcription,
    }
}
