import { Database } from './database.types'

export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row']

export type Enums<T extends keyof Database['public']['Enums']> =
    Database['public']['Enums'][T]

export type Procedure<T extends keyof Database['public']['Functions']> =
    Database['public']['Functions'][T]

// Tables

export type Album = Tables<'album'>
export type Track = Tables<'track'>
