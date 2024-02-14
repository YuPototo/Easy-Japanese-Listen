import { cache } from 'react'
import supabase from '@/database/supabaseClient'
import { getExerciseBookWithCover } from '../utils/getCovers'

/**
 * Get all exercise books from the database
 */
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

    return await getExerciseBookWithCover(data)
})

/**
 * Get one exercise book from the database
 */
export const getExerciseBook = cache(async (id: string | number) => {
    const { data, error } = await supabase
        .from('exercise_book')
        .select('*')
        .eq('id', id)

    if (!data) {
        // todo: what would happen if there is error?
        throw new Error('No Exercise Book from DB')
    }

    if (error) {
        console.error(error)
        // todo: what would happen if there is error?
        throw new Error('Error in getExerciseBook')
    }

    const booksWithCover = await getExerciseBookWithCover(data)

    return booksWithCover[0]
})
