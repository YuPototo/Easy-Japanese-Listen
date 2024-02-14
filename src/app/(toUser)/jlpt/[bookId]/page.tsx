'use server'

import ExerciseBookContents from '@/components/ExerciseBookContents'
import ExerciseBookTopCard from '@/components/ExerciseBookTopCard'

/**
 * Show book info
 * Show book content
 */

type PageParam = {
    params: { bookId: string }
}

export default async function ExerciseBookDetail({ params }: PageParam) {
    return (
        <main className="">
            <ExerciseBookTopCard bookId={params.bookId} />
            <ExerciseBookContents bookId={params.bookId} />
        </main>
    )
}
