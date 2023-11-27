import { BUCKET_NAME } from '@/constants'
import { Album, Track } from '@/database/dbTypeHelper'
import supabase from '@/database/supabaseClient'
import { TranscriptionSchema } from '@/lib/validator'
import { useEffect, useState } from 'react'

/**
 * Fetch an album's info
 */
export function useAlbumInfo(albumId: string | number) {
    const [album, setAlbum] = useState<Album | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAlbum = async () => {
            setIsLoading(true)

            const { data, error } = await supabase
                .from('album')
                .select('*')
                .eq('id', albumId)
            if (error) {
                console.log(error)
                setError(error.message)
            } else {
                setAlbum(data[0])
            }

            setIsLoading(false)
        }
        fetchAlbum()
    }, [albumId])

    return { album, isLoading, error }
}

export function useAlbumList() {
    const [albums, setAlbums] = useState<Album[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAlbums = async () => {
            setIsLoading(true)

            const { data, error } = await supabase.from('album').select('*')
            if (error) console.log(error)
            else setAlbums(data)

            setIsLoading(false)
        }
        fetchAlbums()
    }, [])

    return { albums, isLoading, error }
}

// todo: add loading and error
export function useTrackList(albumId: string | number) {
    const [tracks, setTracks] = useState<Track[] | null>(null)

    useEffect(() => {
        const fetchTracks = async () => {
            const { data, error } = await supabase
                .from('track')
                .select('*')
                .eq('album_id', albumId)
                .order('position_index', { ascending: true })
            if (error) console.log(error)
            else setTracks(data)
        }
        fetchTracks()
    }, [albumId])

    return tracks
}

export function useTrack(trackId: string | number) {
    const [track, setTrack] = useState<Track | null>(null)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [loadingSuccess, setLoadingSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTracks = async () => {
            setIsLoading(true)

            const { data, error } = await supabase
                .from('track')
                .select('*')
                .eq('id', trackId)

            if (error) {
                console.error(error)
                setError(error.message)
                setIsLoading(false)
                setLoadingSuccess(false)
                return
            }

            // validate transcription schema
            const transcription = data[0].transcription
            try {
                TranscriptionSchema.parse(transcription)
            } catch (e) {
                console.error(e)
                setError('Invalid transcription schema')
                setLoadingSuccess(false)
                setIsLoading(false)
                return
            }

            setTrack(data[0])

            // get audio url: 一定会获取到一个链接
            const { data: audioData } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(data[0].storage_path)

            setAudioUrl(audioData.publicUrl)

            setIsLoading(false)
            setLoadingSuccess(true)
        }
        fetchTracks()
    }, [trackId])

    return { track, audioUrl, isLoading, loadingSuccess, error }
}

export function useNextTrackId(trackId: string | number) {
    const [isLoading, setIsLoading] = useState(true)
    const [nextTrackId, setNextTrackId] = useState<number | null>(null)

    useEffect(() => {
        const fetchNextTrackId = async () => {
            setIsLoading(true)
            const trackInt =
                typeof trackId === 'string' ? parseInt(trackId) : trackId
            const { data, error } = await supabase.rpc('get_next_track', {
                current_track_id: trackInt,
            })
            if (error) {
                console.error(error)
                setIsLoading(false)
                return
            } else {
                setNextTrackId(data)
                setIsLoading(false)
            }
        }
        fetchNextTrackId()
    }, [trackId])

    return { nextTrackId, isLoading }
}
