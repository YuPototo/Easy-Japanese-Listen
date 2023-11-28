'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import supabase from '@/database/supabaseClient'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateAlbumPage() {
    const router = useRouter()
    const [albumTitle, setAlbumTitle] = useState('')

    const handleCreateAlbum = async () => {
        const { data, error } = await supabase
            .from('album')
            .insert({ album_title: albumTitle })
            .select()

        // todo: handle error
        if (error) {
            console.error(error)
            return
        }

        const albumId = data[0].id

        router.push(`/edit/listen/album/${albumId}`)
    }

    return (
        <div>
            <h1>新增一个 album</h1>
            <div className="mt-8">
                <Input
                    type="text"
                    placeholder="Album Title"
                    onChange={(e) => {
                        setAlbumTitle(e.target.value)
                    }}
                />
                <Button className="mt-4" onClick={handleCreateAlbum}>
                    提交
                </Button>
            </div>
        </div>
    )
}
