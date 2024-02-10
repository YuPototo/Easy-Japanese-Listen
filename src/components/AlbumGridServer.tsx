'use server'

import { getAlbumList } from '@/fetchData/server'
import MaterialCard from './MaterialCard'

export default async function AlbumGridServer() {
    const data = await getAlbumList()

    return (
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:flex-wrap">
            {data.map((album) => (
                <MaterialCard
                    href={`/listen/album/${album.id}`}
                    coverUrl={album.coverUrl}
                    key={album.id}
                    title={album.title}
                    background="linear-gradient(180deg, #09310A 0%, rgba(9, 49, 10, 0.03) 66.15%)"
                />
            ))}
        </div>
    )
}
