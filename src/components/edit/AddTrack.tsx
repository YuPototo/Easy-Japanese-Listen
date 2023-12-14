'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import supabase from '@/database/supabaseClient'
import { TranscriptionPart } from '@/types/schema/transcriptionSchema'
import { AudioSection } from '@/types/schema/audioSectionSchema'
import AudioContentEditor from './AudioContentEditor'

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

    const handleSubmit = async (
        sections: AudioSection[],
        transcription: TranscriptionPart[],
    ) => {
        const album_id =
            typeof albumId === 'string' ? parseInt(albumId) : albumId

        const { error } = await supabase.from('track').insert({
            album_id,
            title: audioTitle,
            storage_path: fileName,
            transcription,
            sections,
        })

        if (error) {
            setMessage(error.message)
            return
        }

        onAdded()
    }

    return (
        <div className="m-4 ">
            <StepInfo step={step} />

            {message && (
                <ErrorMessage
                    message={message}
                    onClose={() => setMessage('')}
                />
            )}

            <div className="mt-8">
                {step === 'info' && (
                    <AddAudioInfo
                        title={audioTitle}
                        fileName={fileName}
                        onChangeFileName={(fileName) => setFileName(fileName)}
                        onChangeTitle={(title) => setAudioTitle(title)}
                        onNext={() => setStep('transcription')}
                    />
                )}

                {step == 'transcription' && (
                    <AudioContentEditor
                        audio={{
                            fileName,
                            audioTitle,
                            transcription: [],
                            sections: [],
                        }}
                        isNew
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    )
}

function AddAudioInfo({
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
            <div className="my-8 flex w-[300px] flex-col gap-6">
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

function StepInfo({ step }: { step: AddAudioStep }) {
    const stepTitle = step === 'info' ? 'Add Audio' : 'Add Transcription'

    return (
        <>
            <h2>{stepTitle}</h2>

            {step === 'info' && (
                <div>tmp test file name: 2020_12_n3_1_1.mp3</div>
            )}
        </>
    )
}

function ErrorMessage({
    message,
    onClose,
}: {
    message: string
    onClose: () => void
}) {
    return (
        <>
            <div className=" flex items-center gap-4 rounded bg-gray-100 p-2">
                <p className="text-red-500"> {message}</p>
                <div>
                    <Button size="sm" fill="outline" onClick={onClose}>
                        知道了
                    </Button>
                </div>
            </div>
        </>
    )
}
