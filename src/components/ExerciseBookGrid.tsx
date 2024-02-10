'use server'

import { getExerciseBookList } from '@/fetchData/server'

export default async function ExerciseBookGridServer() {
    const data = await getExerciseBookList()

    return (
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:flex-wrap">
            {data.map((book, i) => (
                <div key={book.id}>{book.title}</div>
            ))}
        </div>
    )
}
