import AudioPlayer from '@/components/AudioPlayer'
import { BUCKET_NAME } from '@/constants'
import { Database } from '@/database/database.types'
import { TranscriptionSchema } from '@/lib/validator'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

type PageParam = {
    params: { albumId: string; trackId: string }
}

export default async function Page({ params }: PageParam) {
    const albumTitle = await getAlbumTitle(params.albumId)
    const track = await getTrack(params.trackId)

    const isTrack = 'id' in track

    return (
        <main className="m-4 flex flex-col items-center">
            <div className="flex gap-2">
                <Link href={`/album/${params.albumId}`}>{albumTitle}</Link>
                &gt;
                <div>{isTrack && track.title}</div>
            </div>

            {isTrack && (
                <AudioPlayerWrapper
                    title={track.title}
                    audioUrl={track.audioUrl}
                    transcription={track.transcription}
                />
            )}

            {'error' in track && (
                <div className="text-red-500">{track.error}</div>
            )}
        </main>
    )
}

function AudioPlayerWrapper({
    audioUrl,
    transcription,
    title,
}: {
    title: string
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
            title={title}
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

async function getAlbumTitle(id: string): Promise<string> {
    const supabase = createClientComponentClient<Database>()

    const { data, error } = await supabase
        .from('album')
        .select('album_title')
        .eq('id', id)

    if (error) {
        console.error(error)
        return 'Error'
    }

    if (data === null) {
        console.error('No data')
        return 'Error'
    }

    return data[0].album_title
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
    const { data: audioData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(track.storage_path)

    return {
        id: track.id,
        title: track.track_title,
        audioUrl: audioData.publicUrl,
        transcription: track.transcription,
    }
}
