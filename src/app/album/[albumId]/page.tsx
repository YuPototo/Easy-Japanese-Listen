import TrackList from '@/components/TrackList'

type PageParam = {
    params: { albumId: string }
}

export default async function Page({ params }: PageParam) {
    return (
        <main className="">
            <TrackList id={params.albumId} />
        </main>
    )
}
