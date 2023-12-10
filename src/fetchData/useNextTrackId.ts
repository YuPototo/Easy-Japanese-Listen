import supabase from '@/database/supabaseClient'
import { useEffect, useState } from 'react'

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
