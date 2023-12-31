import { AUDIO_BUCKET_NAME } from '@/constants'
import { Track } from '@/database/dbTypeHelper'
import supabase from '@/database/supabaseClient'
import { EnhancedTrack } from '@/types/EnhancedType'
import {
    AudioSection,
    AudioSectionListSchema,
} from '@/types/schema/audioSectionSchema'
import {
    Transcription,
    TranscriptionSchema,
} from '@/types/schema/transcriptionSchema'
import { useEffect, useState } from 'react'

// todo p3: refactor this hook
export function useTrack(trackId: string | number) {
    const [track, setTrack] = useState<EnhancedTrack | null>(null)
    const [audioUrl, setAudioUrl] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)
    const [loadingSuccess, setLoadingSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTracks = async () => {
            setIsLoading(true)

            const { data, error } = await supabase
                .from('track')
                .select('*')
                .eq('id', trackId)

            if (error) {
                setError(error.message)
                setIsLoading(false)
                setLoadingSuccess(false)
                return
            }

            const {
                result: validateResult,
                transcription,
                sections,
            } = validateTrack(data[0])

            if (!validateResult) {
                setError('数据格式错误')
                setIsLoading(false)
                setLoadingSuccess(false)
                return
            }

            setTrack({ ...data[0], transcription, sections })

            // get audio url: 一定会获取到一个链接
            const { data: audioData } = supabase.storage
                .from(AUDIO_BUCKET_NAME)
                .getPublicUrl(data[0].storage_path)

            setAudioUrl(audioData.publicUrl)

            setIsLoading(false)
            setLoadingSuccess(true)
        }

        fetchTracks()
    }, [trackId])

    return {
        track,
        audioUrl,
        isLoading,
        loadingSuccess,
        error,
    }
}

type ValidateTrackResult =
    | {
          result: false
          transcription: null
          sections: null
      }
    | { result: true; transcription: Transcription; sections: AudioSection[] }

function validateTrack(track: Track): ValidateTrackResult {
    // validate transcription schema
    const parseResult = TranscriptionSchema.safeParse(track.transcription)

    if (!parseResult.success) {
        console.error(parseResult.error)
        return { result: false, transcription: null, sections: null }
    }

    const transcription = parseResult.data

    // validate audio section schema
    const audioSectionParseResult = AudioSectionListSchema.safeParse(
        track.sections,
    )

    if (!audioSectionParseResult.success) {
        console.error(audioSectionParseResult.error)
        return { result: false, transcription: null, sections: null }
    }

    const sections = audioSectionParseResult.data

    return { result: true, transcription, sections }
}
