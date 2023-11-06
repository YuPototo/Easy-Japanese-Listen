import Link from 'next/link'

export default async function Page() {
    return (
        <main className="">
            todo: show album list
            <Link href="/album/edit/new">Add Album</Link>
        </main>
    )
}
