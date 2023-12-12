'use client'

import { AlbumWithCover } from '@/types/EnhancedType'
import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
    album: AlbumWithCover
    index: number
    isEditing?: boolean
}

// reason for not using more than 1 background:
//   I need to show the same background in album page. This means that I need to let
//    album page know which background to use. I have to pass the background as
//    url parameter.
//   I can do it later if I want to.

const background = [
    'linear-gradient(180deg, #18204C 0%, rgba(24, 32, 76, 0.03) 64.58%)',
    // 'linear-gradient(180deg, #09310A 0%, rgba(9, 49, 10, 0.03) 66.15%)',
    // 'linear-gradient(180deg, #3A2A02 0%, rgba(58, 42, 2, 0.03) 64.58%)',
]

export default function AlbumListCard({ album, index, isEditing }: Props) {
    const [isHover, setIsHover] = useState(false)

    return (
        <Link
            href={
                isEditing
                    ? `/edit/listen/album/${album.id}`
                    : `/listen/album/${album.id}`
            }
            style={{
                background: background[index % background.length],
            }}
            className="flex h-[140px] w-[310px] gap-4 rounded-md p-2"
            key={album.id}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Image
                className="rounded-md"
                src={album.coverUrl}
                alt={album.title}
                width="100"
                height="125"
            />
            <div className="flex flex-grow flex-col">
                <p>{album.title}</p>
                <div
                    className={cn(
                        'flex flex-grow items-center justify-center transition-opacity	',
                        isHover ? 'opacity-100' : 'opacity-0',
                    )}
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600">
                        <Play className="ml-1" color="#f0f0f0" size={23} />
                    </div>
                </div>
            </div>
        </Link>
    )
}
