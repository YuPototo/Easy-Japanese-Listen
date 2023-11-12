'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { TranscriptionPart } from '@/types/Transcription'
import Sentence from './Sentence'
import SentenceEditor from './SentenceEditor'
import supabase from '@/database/supabaseClient'

type AddAudioStep = 'info' | 'transcription' | 'preview'

type Props = {
    albumId: string | number
    onAdded: () => void
}

export default function NewAudio({ albumId, onAdded }: Props) {
    const [step, setStep] = useState<AddAudioStep>('info')
    const [audioTitle, setAudioTitle] = useState('')
    const [fileName, setFileName] = useState('')
    const [message, setMessage] = useState('')
    const [sentences, setSentences] = useState<TranscriptionPart[]>([])
    const [currentTime, setCurrentTime] = useState(0)
    const [updateIndex, setUpdateIndex] = useState<number | null>(null)

    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const audio = audioRef.current
        console.log('audio', audio)
        if (!audio) return

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
        }

        audio.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [step])

    const handleAddInfo = () => {
        if (!audioTitle || !fileName) {
            setMessage('Please fill in all the fields')
            return
        }
        setStep('transcription')
    }

    const handleAddTranscription = () => {
        setStep('preview')
    }

    const handleAdd = (transcriptionPart: TranscriptionPart) => {
        setSentences((prev) => [...prev, transcriptionPart])
    }

    const handleUpdate = (transcriptionPart: TranscriptionPart) => {
        if (updateIndex === null) return

        setSentences((prev) => {
            const newSentences = [...prev]
            newSentences[updateIndex] = transcriptionPart
            return newSentences
        })

        setUpdateIndex(null)
    }

    const handleSubmit = async () => {
        const album_id =
            typeof albumId === 'string' ? parseInt(albumId) : albumId

        const { error } = await supabase.from('track').insert({
            album_id,
            track_title: audioTitle,
            storage_path: fileName,
            transcription: sentences,
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
                        <Button size="sm" onClick={() => setMessage('')}>
                            知道了
                        </Button>
                    </div>
                </div>
            )}
            {step === 'info' && (
                <>
                    <div className="my-8 w-[300px] flex flex-col gap-6">
                        <Input
                            placeholder="audio title"
                            onChange={(e) => setAudioTitle(e.target.value)}
                        />
                        <Input
                            placeholder="file name"
                            onChange={(e) => setFileName(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleAddInfo}>Next</Button>
                </>
            )}

            {step === 'transcription' && (
                <>
                    <div className="m-6">
                        <div>title: {audioTitle}</div>
                        <div>file name: {fileName}</div>
                    </div>

                    <div>
                        {sentences.map((sentence, index) => (
                            <div className="my-4" key={index}>
                                {updateIndex === index ? (
                                    <SentenceEditor
                                        initialTranscriptionPart={sentence}
                                        currentTime={currentTime}
                                        saveSentence={handleUpdate}
                                    />
                                ) : (
                                    <Sentence
                                        transcriptionPart={sentence}
                                        onUpdate={() => setUpdateIndex(index)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="m-6">
                        <audio
                            ref={audioRef}
                            controls
                            src={`${process.env.NEXT_PUBLIC_AUDIO_BASE_URL}/${fileName}`}
                            onError={(e) =>
                                setMessage('Audio Error, maybe not found')
                            }
                        />
                    </div>

                    <div>
                        <SentenceEditor
                            currentTime={currentTime}
                            saveSentence={handleAdd}
                        />
                    </div>

                    <div className="mt-12">
                        <Button onClick={handleAddTranscription}>Next</Button>
                    </div>
                </>
            )}

            {step === 'preview' && (
                <div>
                    <div className="m-6">
                        <div>title: {audioTitle}</div>
                        <div>file name: {fileName}</div>
                    </div>

                    <div className="m-6">
                        <audio
                            ref={audioRef}
                            controls
                            src={`${process.env.NEXT_PUBLIC_AUDIO_BASE_URL}/${fileName}`}
                            onError={(e) =>
                                setMessage('Audio Error, maybe not found')
                            }
                        />
                    </div>

                    <div>
                        {sentences.map((sentence, index) => (
                            <div className="my-4" key={index}>
                                <Sentence
                                    transcriptionPart={sentence}
                                    onUpdate={() => console.log('todo')}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            )}
        </div>
    )
}
