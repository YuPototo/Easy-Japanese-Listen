import { cache } from 'react'
import supabase from '@/database/supabaseClient'
import { getCovers } from '../utils/getCovers'

export const getAlbumList = cache(async () => {
    const { data, error } = await supabase
        .from('album')
        .select('*')
        .eq('is_public', true)

    if (!data) {
        console.error('No Album from Supabase')
        return []
    }

    if (error) {
        console.error(error)
        return []
    }

    const albumsWithCover = await getCovers({ albums: data })

    return albumsWithCover
})
