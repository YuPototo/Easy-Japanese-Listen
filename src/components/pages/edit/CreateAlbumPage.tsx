'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import supabase from '@/database/supabaseClient'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateAlbum() {
    const router = useRouter()
    const [albumTitle, setAlbumTitle] = useState('')

    const handleCreateAlbum = async () => {
        const { error } = await supabase
            .from('album')
            .insert({ album_title: albumTitle })

        // todo: handle error
        if (error) {
            console.error(error)
            return
        }

        // when no error: go to album edit page

        // todo: go to that album's edit page
        router.push('/edit')
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
