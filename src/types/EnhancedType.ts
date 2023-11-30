import { Album } from '@/database/dbTypeHelper'

export type AlbumWithCover = Album & { coverUrl: string }
