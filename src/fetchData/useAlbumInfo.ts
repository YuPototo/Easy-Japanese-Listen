import { IMAGE_BUCKET_NAME, DEFAULT_ALUM_COVER } from '@/constants'
import supabase from '@/database/supabaseClient'
import { AlbumWithCover, EnhancedTrack } from '@/types/EnhancedType'
import { useEffect, useState } from 'react'

/**
 * Fetch an album's info
 */
export function useAlbumInfo(albumId: string | number) {
    const [album, setAlbum] = useState<AlbumWithCover | null>(null)
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
                // get album cover
                let coverPath = data[0].cover_path
                    ? data[0].cover_path
                    : DEFAULT_ALUM_COVER

                const { data: coverUrl } = await supabase.storage
                    .from(IMAGE_BUCKET_NAME)
                    .getPublicUrl(coverPath)

                setAlbum({
                    ...data[0],
                    coverUrl: coverUrl.publicUrl,
                })
            }

            setIsLoading(false)
        }
        fetchAlbum()
    }, [albumId])

    return { album, isLoading, error }
}
