import AlbumInfo from '@/components/AlbumInfo'
import TrackList from '@/components/TrackList'

type PageParam = {
    params: { albumId: string }
}

export default function Page({ params }: PageParam) {
    return (
        <main>
            <AlbumInfo id={params.albumId} />
            <div className="mt-12">
                <TrackList id={params.albumId} />
            </div>
        </main>
    )
}
