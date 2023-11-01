import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/database/database.types'
import { cache } from 'react'
import Link from 'next/link'

export const revalidate = 3600 // revalidate the data at most every hour

const getAlbums = cache(async () => {
    const supabase = createClientComponentClient<Database>()
    const { data } = await supabase.from('album').select('*')
    return data
})

export default async function AlbumGrid() {
    const sections = await getAlbums()

    return (
        <div>
            {sections?.map((el) => (
                <Link href={`/album/${el.id}`} className="m-2" key={el.id}>
                    {el.album_title}
                </Link>
            ))}
        </div>
    )
}
