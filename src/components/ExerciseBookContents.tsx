type Props = {
    bookId: string | number
}

type ChapterGroup = {
    title: string
    chapters: Chapter[]
}

type Chapter = {
    title: string
    id: string | number
}

const chapterGroups: ChapterGroup[] = [
    {
        title: 'Grammar',
        chapters: [
            { title: 'Chapter 1', id: 1 },
            { title: 'Chapter 2', id: 2 },
            { title: 'Chapter 3', id: 3 },
        ],
    },
    {
        title: 'Vocabulary',
        chapters: [
            { title: 'Chapter 1', id: 4 },
            { title: 'Chapter 2', id: 5 },
            { title: 'Chapter 3', id: 6 },
        ],
    },
]

export default async function ExerciseBookContents({ bookId }: Props) {
    return (
        <div>
            {chapterGroups.map((group, index) => (
                <div key={index}>
                    <h2>{group.title}</h2>
                    <ul>
                        {group.chapters.map((chapter) => (
                            <li key={chapter.id}>{chapter.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
