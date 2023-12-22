import supabase from '@/database/supabaseClient'
import { AlbumWithCover } from '@/types/EnhancedType'
import { useEffect, useState } from 'react'
import { getCovers } from '../utils/getCovers'

export function useAlbumList({ publicOnly = true }: { publicOnly: boolean }) {
    const [albums, setAlbums] = useState<AlbumWithCover[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAlbums = async () => {
            setIsLoading(true)

            let query = supabase.from('album').select('*')

            if (publicOnly) {
                query = query.eq('is_public', true)
            }

            const { data, error } = await query

            if (error) {
                console.log(error)
                setError(error.message)
            } else {
                const albumsWithCover = await getCovers({ albums: data })
                setAlbums(albumsWithCover)
            }

            setIsLoading(false)
        }
        fetchAlbums()
    }, [publicOnly])

    return { albums, isLoading, error }
}
