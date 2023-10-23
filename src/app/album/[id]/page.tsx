import TrackList from '@/components/TrackList'

type PageParam = {
    params: { id: string }
}

export default async function Page({ params }: PageParam) {
    return (
        <main className="">
            <TrackList id={params.id} />
        </main>
    )
}
