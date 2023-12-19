import Image from 'next/image'
import ModuleCard from '@/components/ModuleCard'
import { Headphones } from 'lucide-react'
import { kuaileFont } from '@/lib/font'
import { cn } from '@/lib/utils'
import AlbumGrid from '@/components/AlbumGrid'

export default async function Home() {
    return (
        <main className="">
            <div className="flex items-center justify-center gap-4">
                <Image
                    src="/icons/wave_2_64.png"
                    alt="icon"
                    width="48"
                    height="48"
                />
                <h1 className={cn(kuaileFont.className, 'text-2xl')}>
                    日语轻松练 - 精听
                </h1>
            </div>
            <div className="mt-16">
                <AlbumGrid />
            </div>
        </main>
    )
}
