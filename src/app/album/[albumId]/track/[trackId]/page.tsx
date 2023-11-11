import TrackPage from '@/components/pages/TrackPage'

type PageParam = {
    params: { albumId: string; trackId: string }
}

export default function Page({ params }: PageParam) {
    return (
        <main>
            <TrackPage albumId={params.albumId} trackId={params.trackId} />
        </main>
    )
}