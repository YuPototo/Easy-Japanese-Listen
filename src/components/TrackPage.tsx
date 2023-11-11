'use client'

import { Album, Track } from '@/database/dbTypeHelper'
import supabase from '@/database/supabaseClient'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AudioPlayer from './AudioPlayer'
import { TranscriptionSchema } from '@/lib/validator'
import { BUCKET_NAME } from '@/constants'

type Props = {
    albumId: string | number
    trackId: string | number
}

export default function TrackPage({ albumId, trackId }: Props) {
    const [album, setAlbum] = useState<Album | null>(null)
    const [track, setTrack] = useState<Track | null>(null)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)

    useEffect(() => {
        const fetchAlbum = async () => {
            const { data, error } = await supabase
                .from('album')
                .select('*')
                .eq('id', albumId)
            if (error) console.log(error)
            else setAlbum(data[0])
        }
        fetchAlbum()
    }, [albumId])

    useEffect(() => {
        const fetchTrack = async () => {
            const { data, error } = await supabase
                .from('track')
                .select('*')
                .eq('id', trackId)
            if (error) console.log(error)
            else {
                setTrack(data[0])
                const { data: audioData } = supabase.storage
                    .from(BUCKET_NAME)
                    .getPublicUrl(data[0].storage_path)
                setAudioUrl(audioData.publicUrl)
            }
        }
        fetchTrack()
    }, [trackId])

    return (
        <div>
            <div className="flex gap-2 items-center">
                <Link href={`/album/${albumId}`}>{album?.album_title}</Link>
                <ChevronRight size={16} />
                <div>{track?.track_title}</div>
            </div>

            {track !== null && audioUrl !== null && (
                <div className="mt-6 w-full">
                    <AudioPlayerWrapper
                        title={track.track_title}
                        audioUrl={audioUrl}
                        transcription={track.transcription}
                    />
                </div>
            )}
        </div>
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
            audioUrl={audioUrl}
            transcription={parseTranscription.data}
        />
    )
}
