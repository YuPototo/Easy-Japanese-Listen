import { Album, Track } from '@/database/dbTypeHelper'
import supabase from '@/database/supabaseClient'
import { useEffect, useState } from 'react'

// todo: loading, error
export function useAlbumInfo(albumId: string | number) {
    const [album, setAlbum] = useState<Album | null>(null)
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

    return album
}

export function useTrackList(albumId: string | number) {
    const [tracks, setTracks] = useState<Track[] | null>(null)

    useEffect(() => {
        const fetchTracks = async () => {
            const { data, error } = await supabase
                .from('track')
                .select('*')
                .eq('album_id', albumId)
                .order('id', { ascending: true })
            if (error) console.log(error)
            else setTracks(data)
        }
        fetchTracks()
    }, [albumId])

    return tracks
}
