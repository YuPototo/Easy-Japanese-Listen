import AlbumGrid from '@/components/AlbumGrid'
import Image from 'next/image'

export default async function Home() {
    return (
        <main className="">
            <div className="flex gap-4 items-center justify-center mt-16">
                <Image src="/headset64.png" alt="icon" width="48" height="48" />
                <h1 className="text-2xl">日语轻松听</h1>
            </div>
            <div className="mt-16">
                <AlbumGrid />
            </div>
        </main>
    )
}
