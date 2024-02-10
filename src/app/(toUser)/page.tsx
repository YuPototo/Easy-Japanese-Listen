import Image from 'next/image'
import { kuaileFont } from '@/lib/font'
import { cn } from '@/lib/utils'
import AlbumGrid from '@/components/AlbumGrid'
import ExerciseBookGrid from '@/components/ExerciseBookGrid'

export const revalidate = 3600 // revalidate the data at most every hour

// todo: use a component to describe sections

export default async function Home() {
    return (
        <main className="">
            <div className="mb-12">
                <div className="mt-10 flex items-center justify-center gap-4">
                    <Image
                        src="/icons/wave_2_64.png"
                        alt="icon"
                        width="48"
                        height="48"
                    />
                    <h1 className={cn(kuaileFont.className, ' text-2xl')}>
                        JLPT 练习
                    </h1>
                </div>
                <div className="mx-auto mt-8 w-10/12 ">
                    <ExerciseBookGrid />
                </div>
            </div>
            <div className="mb-12">
                <div className="mt-10 flex items-center justify-center gap-4">
                    <Image
                        src="/icons/wave_2_64.png"
                        alt="icon"
                        width="48"
                        height="48"
                    />
                    <h1 className={cn(kuaileFont.className, ' text-2xl')}>
                        精听
                    </h1>
                </div>
                <div className="mx-auto mt-8 w-10/12 ">
                    <AlbumGrid />
                </div>
            </div>
        </main>
    )
}
