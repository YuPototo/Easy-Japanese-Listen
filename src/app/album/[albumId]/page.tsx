import TrackList from '@/components/TrackList'
import { Database } from '@/database/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cache } from 'react'

export const revalidate = 3600 // revalidate the data at most every hour

type PageParam = {
    params: { albumId: string }
}

export default async function Page({ params }: PageParam) {
    const album = await getAlbum(params.albumId)

    return (
        <main>
            <h1>{album?.album_title}</h1>
            <div className="mt-12">
                <TrackList id={params.albumId} />
            </div>
        </main>
    )
}

const getAlbum = cache(async (albumId: string) => {
    const supabase = createClientComponentClient<Database>()
    const { data } = await supabase.from('album').select('*').eq('id', albumId)
    if (data) {
        return data[0]
    }
})
