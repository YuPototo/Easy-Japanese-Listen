import AudioPlayer from '@/components/AudioPlayer'
import { BUCKET_NAME } from '@/constants'
import { Database } from '@/database/database.types'
import { TranscriptionSchema } from '@/lib/validator'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// todo: refactor this page

type PageParam = {
    params: { id: string }
}

export default async function Page({ params }: PageParam) {
    const track = await getTrack(params.id)

    return (
        <main className="m-4 flex flex-col items-center">
            {'error' in track ? (
                <div className="text-red-500">{track.error}</div>
            ) : (
                <div>
                    <h1 className="mt-10 text-lg">{track.title}</h1>
                    <AudioPlayerWrapper
                        audioUrl={track.audioUrl}
                        transcription={track.transcription}
                    />
                </div>
            )}
        </main>
    )
}

function AudioPlayerWrapper({
    audioUrl,
    transcription,
}: {
    audioUrl: string
    transcription: unknown
}) {
    // Should I useMemo here?
    const parseTranscription = TranscriptionSchema.safeParse(transcription)

    if (!parseTranscription.success) {
        return (
            <div className="text-red-500">invalid transcription structure</div>
        )
    }

    return (
        <AudioPlayer
            audioUrl={audioUrl}
            transcription={parseTranscription.data}
        />
    )
}

type Track = {
    id: number
    title: string
    audioUrl: string
    transcription: unknown
}

type TrackError = {
    error: string
}

async function getTrack(id: string): Promise<Track | TrackError> {
    const supabase = createClientComponentClient<Database>()

    let { data, error: trackError } = await supabase
        .from('track')
        .select('*')
        .eq('id', id)

    if (trackError) {
        console.error(trackError)
        return { error: trackError.message }
    }

    if (data === null) {
        console.error('No data')
        return { error: 'Audio data not found' }
    }

    const track = data[0]

    // audioData is { publicUrl: string }, will not be null
    const { data: audioData } = await supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(track.storage_path)

    return {
        id: track.id,
        title: track.track_title,
        audioUrl: audioData.publicUrl,
        transcription: track.transcription,
    }
}
