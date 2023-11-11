import TrackPage from '@/components/TrackPage'

type PageParam = {
    params: { albumId: string; trackId: string }
}

export default function Page({ params }: PageParam) {
    return (
        <main className="">
            <TrackPage albumId={params.albumId} trackId={params.trackId} />
        </main>
    )
}
