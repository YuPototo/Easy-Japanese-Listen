import Link from 'next/link'
import Image from 'next/image'
import ModuleCard from '@/components/ModuleCard'
import { Headphones } from 'lucide-react'

export default async function Home() {
    return (
        <main className="">
            <div className="mt-16 flex items-center justify-center gap-4">
                <Image
                    src="/icons/wave_2_64.png"
                    alt="icon"
                    width="48"
                    height="48"
                />
                <h1 className="text-2xl">日语轻松学</h1>
            </div>
            <div className="mt-16 flex flex-col items-center">
                <ModuleCard href="/listen" title="听力练习">
                    <Headphones size={64} />
                </ModuleCard>
            </div>
        </main>
    )
}
