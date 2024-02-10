import { IMAGE_BUCKET_NAME, DEFAULT_ALUM_COVER } from '@/constants'
import { Album, ExerciseBook } from '@/database/dbTypeHelper'
import supabase from '@/database/supabaseClient'
import { AlbumWithCover, ExerciseBookWithCover } from '@/types/EnhancedType'

export async function getAlbumsWithCover(albums: Album[]) {
    // get album cover
    const albumsWithCover: AlbumWithCover[] = []

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i]

        let coverPath = album.cover_path ? album.cover_path : DEFAULT_ALUM_COVER

        const { data: coverUrl } = await supabase.storage
            .from(IMAGE_BUCKET_NAME)
            .getPublicUrl(coverPath)

        albumsWithCover.push({
            ...album,
            coverUrl: coverUrl.publicUrl,
        })
    }

    return albumsWithCover
}

export async function getExerciseBookWithCover(exerciseBooks: ExerciseBook[]) {
    // get album cover
    const booksWithCover: ExerciseBookWithCover[] = []

    for (let i = 0; i < exerciseBooks.length; i++) {
        const book = exerciseBooks[i]

        let coverPath = book.cover_path ? book.cover_path : DEFAULT_ALUM_COVER

        const { data: coverUrl } = await supabase.storage
            .from(IMAGE_BUCKET_NAME)
            .getPublicUrl(coverPath)

        booksWithCover.push({
            ...book,
            coverUrl: coverUrl.publicUrl,
        })
    }

    return booksWithCover
}
