import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/database/database.types'
import { cache } from 'react'
import Link from 'next/link'

export const revalidate = 3600 // revalidate the data at most every hour

const getTracks = cache(async (id: string | number) => {
    const supabase = createClientComponentClient<Database>()
    const { data } = await supabase
        .from('track')
        .select('*')
        .eq('album_id', id)
        .order('id', { ascending: true })

    return data
})

export default async function TrackList({ id }: { id: string | number }) {
    const sections = await getTracks(id)

    return (
        <div className="flex flex-col gap-4 text-lg items-center">
            {sections?.map((el) => (
                <div className="m-2" key={el.id}>
                    <Link href={`/album/${id}/track/${el.id}`} className="p-2">
                        {el.track_title}
                    </Link>
                </div>
            ))}
        </div>
    )
}
