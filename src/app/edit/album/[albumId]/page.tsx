import EditAlbumPage from '@/components/pages/edit/EditAlbumPage'

type PageParam = {
    params: { albumId: string }
}
export default async function Page({ params }: PageParam) {
    return (
        <main>
            <EditAlbumPage albumId={params.albumId} />
        </main>
    )
}
