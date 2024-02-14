import { getExerciseBook } from '@/fetchData/serverFetch'

type Props = {
    bookId: string | number
}
export default async function ExerciseBookTopCard({ bookId }: Props) {
    const book = await getExerciseBook(bookId)
    return (
        <div className="">
            <div>{book.title}</div>
        </div>
    )
}
