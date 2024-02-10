'use server'

import { getExerciseBookList } from '@/fetchData/server'
import MaterialCard from './MaterialCard'

export default async function ExerciseBookGridServer() {
    const data = await getExerciseBookList()

    return (
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:flex-wrap">
            {data.map((book, i) => (
                <MaterialCard
                    // todo: create the page
                    href={`/jlpt/book/${i}`}
                    coverUrl={book.coverUrl}
                    key={book.id}
                    title={book.title}
                    background="linear-gradient(180deg, #18204C 0%, rgba(24, 32, 76, 0.03) 64.58%)"
                />
            ))}
        </div>
    )
}
