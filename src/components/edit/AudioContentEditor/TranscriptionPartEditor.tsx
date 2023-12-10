import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import RadioGroup from '@/components/ui/radioGroup'
import { TranscriptionPart } from '@/types/schema/transcriptionSchema'
import { useImmer } from 'use-immer'
import { useAudioContentEditorDispatch } from './StateProvider'

type Props = {
    isNew: boolean
    transcriptionPart?: TranscriptionPart
    currentTime: number
    speakerList: string[]
    globalIndex?: number
}

const initialDraft: TranscriptionPart = {
    type: 'content',
    endTime: 0,
    text: '',
}

export default function TranscriptionPartEditor({
    isNew,
    transcriptionPart,
    currentTime,
    speakerList,
    globalIndex,
}: Props) {
    const [transcriptionPartDraft, updateTranscriptionDraft] =
        useImmer<TranscriptionPart>(transcriptionPart ?? initialDraft)
    const dispatch = useAudioContentEditorDispatch()

    const sentenceType = transcriptionPartDraft.type
    const speaker = getSpeaker(transcriptionPartDraft)
    const text =
        transcriptionPartDraft.type === 'content'
            ? transcriptionPartDraft.text
            : ''
    const endTime = transcriptionPartDraft.endTime

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const num = Number(value)
        updateTranscriptionDraft((draft) => {
            draft.endTime = num
        })
    }

    const handleUpdateSpeaker = (speaker: string) => {
        updateTranscriptionDraft((draft) => {
            if (draft.type === 'filler') {
                console.error('Filler has no speaker')
                return
            }
            draft.speaker = speaker
        })
    }

    const updatePartText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        updateTranscriptionDraft((draft) => {
            if (draft.type === 'filler') {
                console.error('Filler has no text')
                return
            }
            draft.text = value
        })
    }

    const handleDeletePart = () => {
        if (globalIndex === undefined) {
            console.error('globalIndex is required for delete')
            return
        }

        dispatch({
            type: 'DELETE_TRANSCRIPTION_PART',
            payload: globalIndex,
        })
    }

    const validateEndTime = () => {
        if (!transcriptionPartDraft.endTime) {
            alert('end time is required')
            return false
        }

        if (transcriptionPartDraft.endTime < 0) {
            alert('end time must be greater than 0')
            return false
        }

        if (transcriptionPartDraft.endTime > 9999) {
            alert('end time must be less than 9999')
            return false
        }

        return true
    }

    const validateContent = () => {
        const { type: sentenceType } = transcriptionPartDraft

        if (sentenceType !== 'content') {
            console.error('Not a content')
            return false
        }

        const { text } = transcriptionPartDraft

        if (!text) {
            alert('text is required for `content` type')
            return false
        }

        return true
    }

    const handleConfirmNewPart = () => {
        if (sentenceType === 'content') {
            console.log(validateContent())
            if (!validateContent()) {
                return
            }

            const payload = speaker ? { speaker, text } : { text }

            dispatch({
                type: 'ADD_TRANSCRIPTION_PART',
                payload: {
                    type: 'content',
                    endTime,
                    ...payload,
                },
            })
        } else {
            dispatch({
                type: 'ADD_TRANSCRIPTION_PART',
                payload: {
                    type: 'filler',
                    endTime,
                },
            })
        }

        // need to have this to recreate a clean part editor
        setTimeout(() => {
            dispatch({ type: 'ADD_NEW_PART' })
        }, 150)
        return
    }

    const handleConfirmUpdatePart = () => {
        if (globalIndex === undefined) {
            console.error('globalIndex is required for update')
            return
        }

        if (sentenceType === 'content') {
            if (!validateContent()) {
                return
            }

            const payload = speaker ? { speaker, text } : { text }

            dispatch({
                type: 'UPDATE_TRANSCRIPTION_PART',
                payload: {
                    index: globalIndex,
                    transcriptionPart: {
                        type: sentenceType,
                        endTime,
                        ...payload,
                    },
                },
            })
        }

        if (sentenceType === 'filler') {
            dispatch({
                type: 'UPDATE_TRANSCRIPTION_PART',
                payload: {
                    index: globalIndex,
                    transcriptionPart: {
                        type: sentenceType,
                        endTime,
                    },
                },
            })
        }
    }

    // todo: refactor this event handler
    const handleConfirm = () => {
        if (!validateEndTime()) {
            return
        }

        if (isNew) {
            handleConfirmNewPart()
            return
        } else {
            handleConfirmUpdatePart()
            return
        }
    }

    const handleClose = () => {
        if (isNew) {
            dispatch({
                type: 'CANCEL_ADD_TRANSCRIPTION_PART',
            })
            return
        } else {
            dispatch({ type: 'CANCEL_UPDATE_TRANSCRIPTION_PART' })
        }
    }

    return (
        <div className="rounded bg-gray-900 p-8">
            <div className="mb-10 flex items-center gap-8">
                <div className="w-[80px]">type</div>
                <RadioGroup
                    items={[
                        { label: 'content', value: 'content' },
                        { label: 'filler', value: 'filler' },
                    ]}
                    selected={transcriptionPartDraft.type}
                    onChange={(value) => {
                        updateTranscriptionDraft((draft) => {
                            draft.type = value as 'content' | 'filler'
                        })
                    }}
                />
            </div>

            <div className="mb-10 flex items-center gap-8">
                <div className="w-[80px]">end time</div>
                <Input
                    value={endTime || ''}
                    className="w-[120px]"
                    type="number"
                    onChange={handleEndTimeChange}
                />
                <Button
                    fill="outline"
                    onClick={() => {
                        updateTranscriptionDraft((draft) => {
                            draft.endTime = currentTime
                        })
                    }}
                >
                    Use Now
                </Button>

                <Button
                    fill="outline"
                    onClick={() => {
                        updateTranscriptionDraft((draft) => {
                            draft.endTime = 9999
                        })
                    }}
                >
                    Use 9999
                </Button>
            </div>

            {sentenceType === 'content' && (
                <div className="mb-10 flex items-center gap-8">
                    <div className="w-[80px]">speaker</div>
                    <Input
                        className="w-[120px]"
                        value={speaker || ''}
                        onChange={(e) => handleUpdateSpeaker(e.target.value)}
                    />
                    <RadioGroup
                        items={speakerList.map((s) => ({
                            label: s,
                            value: s,
                        }))}
                        selected={speakerList.includes(speaker) ? speaker : ''}
                        onChange={handleUpdateSpeaker}
                    />
                </div>
            )}

            {sentenceType === 'content' && (
                <div className="mb-10 flex items-center gap-8">
                    <div className="w-[80px]">text</div>
                    <Input value={text} onChange={updatePartText} />
                </div>
            )}

            <div className="flex gap-4">
                <Button fill="outline" onClick={handleConfirm}>
                    Confirm
                </Button>
                <Button fill="outline" onClick={handleClose}>
                    Close
                </Button>

                {isNew || (
                    <Button
                        className="ml-auto"
                        btnColor="red"
                        onClick={handleDeletePart}
                    >
                        Delete
                    </Button>
                )}
            </div>
        </div>
    )
}

function getSpeaker(part: TranscriptionPart): string {
    if (part.type === 'content') {
        return part.speaker ?? ''
    }
    return ''
}
