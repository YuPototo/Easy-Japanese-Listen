import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type Props = {
    title?: string
    onClose: () => void
    onDelete: () => void
    onSave: (title: string) => void
}

export default function SectionTitleEditor({
    title,
    onClose,
    onDelete,
    onSave,
}: Props) {
    const [titleDraft, setTitleDraft] = useState(title ?? '')

    const handleSave = () => {
        onSave(titleDraft)
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
                <Button fill="outline" onClick={onClose}>
                    Close
                </Button>

                <Button className="ml-auto" btnColor="red" onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </div>
    )
}
