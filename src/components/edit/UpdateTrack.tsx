'use client'

import { useTrack } from '@/fetchData'
import TranscriptionEditor from './TranscriptionEditor'
import { TranscriptionPart } from '@/types/schema/transcriptionSchema'
import { Button } from '../ui/button'
import { useState } from 'react'
import supabase from '@/database/supabaseClient'
import { AudioSection } from '@/types/schema/audioSectionSchema'

type Props = {
    trackId: string | number
    onUpdated: () => void
}

export default function UpdateTrack({ trackId, onUpdated }: Props) {
    const { track, audioUrl } = useTrack(trackId)
    const [message, setMessage] = useState('')

    const handleUpdateTranscription = async (
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

            {track && (
                <TranscriptionEditor
                    // use key to force re-render
                    key={track.id}
                    audioUrl={audioUrl}
                    audioTitle={track.title}
                    fileName={track.storage_path}
                    initialSections={track.sections as AudioSection[]}
                    initialTranscription={
                        track.transcription as TranscriptionPart[]
                    }
                    onSubmit={handleUpdateTranscription}
                />
            )}
        </div>
    )
}
