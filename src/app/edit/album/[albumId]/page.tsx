import EditAlbumPage from '@/components/pages/edit/EditAlbumPage2'

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
