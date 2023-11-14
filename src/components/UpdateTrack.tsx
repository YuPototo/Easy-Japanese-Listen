'use client'

import { useTrack } from '@/fetchData'
import TranscriptionEditor from './TranscriptionEditor'
import { TranscriptionPart } from '@/types/Transcription'
import { Button } from './ui/button'
import { useState } from 'react'
import supabase from '@/database/supabaseClient'

type Props = {
    trackId: string | number
    onUpdated: () => void
}

export default function UpdateTrack({ trackId, onUpdated }: Props) {
    const track = useTrack(trackId)
    const [message, setMessage] = useState('')

    const handleUpdateTranscription = async (
        transcription: TranscriptionPart[],
    ) => {
        const { error } = await supabase
            .from('track')
            .update({ transcription })
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
                <div className=" bg-gray-100 p-2 rounded flex gap-4 items-center">
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
                    audioTitle={track.track_title}
                    fileName={track.storage_path}
                    initialTranscription={
                        track.transcription as TranscriptionPart[]
                    }
                    onSubmit={handleUpdateTranscription}
                    onError={setMessage}
                />
            )}
        </div>
    )
}
