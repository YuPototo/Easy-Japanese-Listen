import AlbumGrid from '@/components/AlbumGrid'
import Image from 'next/image'

export default async function ListenHomePage() {
    return (
        <main className="">
            <div className="mt-16 flex items-center justify-center gap-4">
                <Image
                    src="/icons/headset64.png"
                    alt="icon"
                    width="48"
                    height="48"
                />
                <h1 className="text-2xl">日语轻松听</h1>
            </div>
            <div className="mt-16">
                <AlbumGrid />
            </div>
        </main>
    )
}
