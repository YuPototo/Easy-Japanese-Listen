'use server'

import { getAlbumList } from '@/fetchData/server'
import AlbumListCard from './AlbumListCard'

export default async function AlbumGridServer() {
    const data = await getAlbumList()

    return (
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:flex-wrap">
            {data.map((album, i) => (
                <AlbumListCard album={album} key={album.id} index={i} />
            ))}
        </div>
    )
}
