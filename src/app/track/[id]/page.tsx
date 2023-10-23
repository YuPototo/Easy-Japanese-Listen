import { BUCKET_NAME } from '@/constants'
import { Database } from '@/database/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type PageParam = {
    params: { id: string }
}

export default async function Page({ params }: PageParam) {
    const track = await getTrack(params.id)
    return (
        <main className="">
            {track !== null && (
                <div>
                    <h1 className="mt-10 text-lg">{track.title}</h1>
                    <audio controls src={track.audioUrl} />
                </div>
            )}
        </main>
    )
}

type Track = {
    id: number
    title: string
    audioUrl: string
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

    const { data: audioData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(track.storage_path)

    return {
        id: track.id,
        title: track.track_title,
        audioUrl: audioData.publicUrl,
    }
}
