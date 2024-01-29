import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { kuaileFont } from '@/lib/font'

export default function NavBar() {
    return (
        <div className="inset-x-0 top-0 z-50 h-fit border-b bg-[#36302C] py-2">
            <div className="container mx-auto flex h-full items-center justify-between gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/icons/wave_2_64.png"
                        alt="logo"
                        width={32}
                        height={32}
                    />
                    <p
                        className={cn(
                            kuaileFont.className,
                            'text-sm font-medium',
                        )}
                    >
                        日语轻松练
                    </p>
                </Link>

                <div className="flex items-center gap-2">
                    <Link href="/youtubeLooper">Youtube Looper</Link>
                </div>
            </div>
        </div>
    )
}
