import AlbumGrid from '@/components/AlbumGrid'
import { kuaileFont } from '@/lib/font'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// 这个页面完全没有使用

export default async function ListenHomePage() {
    return (
        <main className="">
            <div className="flex items-center justify-center gap-4">
                <Image
                    src="/icons/headset64.png"
                    alt="icon"
                    width="48"
                    height="48"
                />
                <h1 className={cn(kuaileFont.className, 'text-2xl')}>精听</h1>
            </div>
            <div className="mt-16">
                <AlbumGrid />
            </div>
        </main>
    )
}
