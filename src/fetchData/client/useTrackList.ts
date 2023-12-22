import { Track } from '@/database/dbTypeHelper'
import supabase from '@/database/supabaseClient'
import { useEffect, useState } from 'react'

export function useTrackList(albumId: string | number) {
    const [tracks, setTracks] = useState<Track[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [loadingSuccess, setLoadingSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTracks = async () => {
            setIsLoading(true)

            const { data, error } = await supabase
                .from('track')
                .select('*')
                .eq('album_id', albumId)
                .order('position_index', { ascending: true })

            if (error) {
                console.error(error)
                setError(error.message)
                setIsLoading(false)
                return
            }

            if (data) {
                setTracks(data)
                setLoadingSuccess(true)
                setIsLoading(false)
            }
        }
        fetchTracks()
    }, [albumId])

    return { tracks, isLoading, loadingSuccess, error }
}
