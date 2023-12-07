import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAudioContentEditorDispatch } from './StateProvider'

type Props = {
    title?: string
    sectionIndex: number
}

export default function SectionTitleEditor({ title, sectionIndex }: Props) {
    const [titleDraft, setTitleDraft] = useState(title ?? '')
    const dispatch = useAudioContentEditorDispatch()

    const handleSave = () => {
        dispatch({
            type: 'UPDATE_SECTION_TITLE',
            payload: {
                title: titleDraft,
                sectionIndex,
            },
        })
    }

    const handleClose = () => {
        dispatch({
            type: 'CANCEL_UPDATE_SECTION_TITLE',
        })
    }

    const handleDelete = () => {
        dispatch({
            type: 'DELETE_SECTION_TITLE',
            payload: sectionIndex,
        })
    }

    return (
        <div className="rounded bg-gray-900 p-8">
            <div className="mb-10 flex items-center gap-8">
                <div className="w-[80px]">title</div>
                <Input
                    value={titleDraft}
                    onChange={(e) => setTitleDraft(e.target.value)}
                />
            </div>

            <div className="flex gap-4">
                <Button fill="outline" onClick={handleSave}>
                    Confirm
                </Button>
                <Button fill="outline" onClick={handleClose}>
                    Close
                </Button>

                <Button
                    className="ml-auto"
                    btnColor="red"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}
