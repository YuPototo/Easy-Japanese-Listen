'use client'

import { useTrack } from '@/fetchData'
import { TranscriptionPart } from '@/types/schema/transcriptionSchema'
import { Button } from '../ui/button'
import { useState } from 'react'
import supabase from '@/database/supabaseClient'
import { AudioSection } from '@/types/schema/audioSectionSchema'
import AudioContentEditor from './AudioContentEditor'

type Props = {
    trackId: string | number
    onUpdated: () => void
}

export default function UpdateTrackNew({ trackId, onUpdated }: Props) {
    const { track, audioUrl, loadingSuccess } = useTrack(trackId)
    const [message, setMessage] = useState('')

    const handleUpdateAudio = async (
        sections: AudioSection[],
        transcription: TranscriptionPart[],
    ) => {
        const { error } = await supabase
            .from('track')
            .update({ transcription, sections })
            // @ts-expect-error
            .eq('id', track.id)

        if (error) {
            setMessage(error.message)
            return
        }

        onUpdated()
    }

    return (
        <div>
            {message && (
                <div className=" flex items-center gap-4 rounded bg-gray-100 p-2">
                    <p className="text-red-500"> {message}</p>
                    <div>
                        <Button
                            size="sm"
                            fill="outline"
                            onClick={() => setMessage('')}
                        >
                            知道了
                        </Button>
                    </div>
                </div>
            )}

            {loadingSuccess && track && (
                <AudioContentEditor
                    audio={{
                        fileName: track.storage_path,
                        audioTitle: track.title,
                        // @ts-expect-error
                        transcription: track.transcription,
                        // @ts-expect-error
                        sections: track.sections,
                        audioUrl,
                    }}
                    onSubmit={handleUpdateAudio}
                />
            )}
        </div>
    )
}
