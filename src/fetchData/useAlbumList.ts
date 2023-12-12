import { IMAGE_BUCKET_NAME, DEFAULT_ALUM_COVER } from '@/constants'
import { Album } from '@/database/dbTypeHelper'
import supabase from '@/database/supabaseClient'
import { AlbumWithCover } from '@/types/EnhancedType'
import { useEffect, useState } from 'react'

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

async function getCovers({ albums }: { albums: Album[] }) {
    // get album cover
    const albumsWithCover: AlbumWithCover[] = []

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i]

        let coverPath = album.cover_path ? album.cover_path : DEFAULT_ALUM_COVER

        const { data: coverUrl } = await supabase.storage
            .from(IMAGE_BUCKET_NAME)
            .getPublicUrl(coverPath)

        albumsWithCover.push({
            ...album,
            coverUrl: coverUrl.publicUrl,
        })
    }

    return albumsWithCover
}
