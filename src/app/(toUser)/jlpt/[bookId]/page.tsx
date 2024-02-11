'use server'

import { getExerciseBook } from '@/fetchData/server'

/**
 * Show book info
 * Show book content
 */

type PageParam = {
    params: { bookId: string }
}

export default async function ExerciseBookDetail({ params }: PageParam) {
    const book = await getExerciseBook(params.bookId)
    return (
        <main className="">
            <div>{book.title}</div>
        </main>
    )
}
