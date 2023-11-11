import AlbumPage from '@/components/pages/AlbumPage'

type PageParam = {
    params: { albumId: string }
}

export default function Page({ params }: PageParam) {
    return (
        <main>
            <AlbumPage albumId={params.albumId} />
        </main>
    )
}
