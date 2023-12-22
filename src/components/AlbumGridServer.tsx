import { getAlbumList } from '@/fetchData/server'
import AlbumListCard from './AlbumListCard'

export default async function AlbumGridServer() {
    const data = await getAlbumList()
    return (
        <div className="flex flex-col items-center gap-12">
            {data.map((album, i) => (
                <AlbumListCard album={album} key={album.id} index={i} />
            ))}
        </div>
    )
}
