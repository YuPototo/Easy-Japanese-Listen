import Link from 'next/link'

export default function Page() {
    return (
        <div className="flex flex-col items-center gap-10">
            <div className="mt-16 flex flex-col items-center">
                <div>
                    <Link href="/edit/listen">精听</Link>
                </div>
            </div>
        </div>
    )
}
