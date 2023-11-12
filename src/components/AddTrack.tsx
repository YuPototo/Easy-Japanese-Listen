'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import TranscriptionEditor from './TranscriptionEditor'
import supabase from '@/database/supabaseClient'
import { Transcription } from '@/types/Transcription'

type AddAudioStep = 'info' | 'transcription'

type Props = {
    albumId: string | number
    onAdded: () => void
}

export default function AddAudio({ albumId, onAdded }: Props) {
    const [step, setStep] = useState<AddAudioStep>('info')
    const [audioTitle, setAudioTitle] = useState('')
    const [fileName, setFileName] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (transcription: Transcription) => {
        const album_id =
            typeof albumId === 'string' ? parseInt(albumId) : albumId

        const { error } = await supabase.from('track').insert({
            album_id,
            track_title: audioTitle,
            storage_path: fileName,
            transcription,
        })

        if (error) {
            setMessage(error.message)
            return
        }

        onAdded()
    }

    return (
        <div className="m-4 ">
            <h2>Step: {step}</h2>

            <div>tmp test file name: 2020_12_n3_1_1.mp3</div>

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

            <div className="mt-12">
                {step === 'info' && (
                    <AddInfo
                        title={audioTitle}
                        fileName={fileName}
                        onChangeFileName={(fileName) => setFileName(fileName)}
                        onChangeTitle={(title) => setAudioTitle(title)}
                        onNext={() => setStep('transcription')}
                    />
                )}

                {step == 'transcription' && (
                    <TranscriptionEditor
                        fileName={fileName}
                        audioTitle={audioTitle}
                        initialTranscription={[]}
                        startWithNewSentence
                        onSubmit={handleSubmit}
                        onError={setMessage}
                    />
                )}
            </div>
        </div>
    )
}

function AddInfo({
    title,
    fileName,
    onChangeTitle,
    onChangeFileName,
    onNext,
}: {
    title: string
    fileName: string
    onChangeTitle: (title: string) => void
    onChangeFileName: (fileName: string) => void
    onNext: () => void
}) {
    return (
        <>
            <div className="my-8 w-[300px] flex flex-col gap-6">
                <Input
                    value={title}
                    placeholder="audio title"
                    onChange={(e) => onChangeTitle(e.target.value)}
                />
                <Input
                    value={fileName}
                    placeholder="file name"
                    onChange={(e) => onChangeFileName(e.target.value)}
                />
            </div>
            <Button onClick={onNext}>Next</Button>
        </>
    )
}
