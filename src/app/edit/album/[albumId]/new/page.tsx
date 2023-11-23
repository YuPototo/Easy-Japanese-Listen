import AddTrackPage from '@/components/pages/edit/AddTrackPage'

type PageParam = {
    params: { albumId: string }
}
export default async function Page({ params }: PageParam) {
    return (
        <main>
            <AddTrackPage albumId={params.albumId} />
        </main>
    )
}
