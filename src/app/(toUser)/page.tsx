import Link from 'next/link'

export default async function Home() {
    return (
        <main className="">
            <div className="mt-16 flex items-center justify-center gap-4">
                {/* <Image src="/headset64.png" alt="icon" width="48" height="48" /> */}
                <h1 className="text-2xl">日语轻松学</h1>
            </div>
            <div className="mt-16">
                <Link href="/listen">轻松听</Link>
            </div>
        </main>
    )
}
