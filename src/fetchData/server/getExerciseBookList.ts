import { cache } from 'react'
import supabase from '@/database/supabaseClient'
import { getExerciseBookWithCover } from '../utils/getCovers'

export const getExerciseBookList = cache(async () => {
    const { data, error } = await supabase
        .from('exercise_book')
        .select('*')
        .eq('is_public', true)

    if (!data) {
        console.error('No Exercise Book from DB')
        return []
    }

    if (error) {
        console.error(error)
        return []
    }

    const albumsWithCover = await getExerciseBookWithCover(data)

    return albumsWithCover
})
