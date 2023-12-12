'use client'

import AlbumGrid from '@/components/AlbumGrid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EditHomePage() {
    return (
        <div className="flex flex-col items-center gap-10">
            <div className="my-6">
                <AlbumGrid isEditing />
            </div>
            <Link href="/edit/listen/album/new">
                <Button>Add Album</Button>
            </Link>
        </div>
    )
}
