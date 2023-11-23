import { EditTrackPage } from '@/components/pages/edit/EditTrackPage'

type PageParam = {
    params: { albumId: string; trackId: string }
}
export default async function Page({ params }: PageParam) {
    return (
        <main>
            <EditTrackPage albumId={params.albumId} trackId={params.trackId} />
        </main>
    )
}
